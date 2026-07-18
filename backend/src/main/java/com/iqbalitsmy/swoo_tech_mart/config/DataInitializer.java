package com.iqbalitsmy.swoo_tech_mart.config;

import com.iqbalitsmy.swoo_tech_mart.entity.Role;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.AuthProvider;
import com.iqbalitsmy.swoo_tech_mart.repository.RoleRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

/**
 * ================================================================
 * DATA INITIALIZER — Seed Data on Startup
 * ================================================================
 *
 * WHY CommandLineRunner?
 * Spring calls run() after the full ApplicationContext is up: all beans
 * built, DB connected, Hibernate has already created the schema
 * (ddl-auto). That's the earliest safe point to INSERT seed rows.
 *
 * WHY seed Roles here too, not just Users?
 * User.roles is a @ManyToMany to Role through the `user_roles` join
 * table. There is no cascade configured on that association (and
 * shouldn't be — Roles are reference data, not owned by a User), so a
 * transient Role passed straight into User.builder().roles(...) would
 * either fail to persist or create duplicate Role rows on every
 * restart. Roles must exist as managed entities first.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        log.info("=== seeding initial data ===");

        Role adminRole = getOrCreateRole("ROLE_ADMIN");
        Role userRole = getOrCreateRole("ROLE_USER");

        seedUser("Admin User", "admin@example.com", "admin123", Set.of(adminRole, userRole));
        seedUser("Regular User", "user@example.com", "user123", Set.of(userRole));

        log.info("===== Seeding complete. Total users: {}", userRepository.count());
    }

    /**
     * WHAT: returns the Role matching `name`, creating and persisting it first
     * if it doesn't exist yet.
     * WHY: roles are looked up by name rather than assumed-present because this
     * runner fires on every startup — on H2 (create-drop) the table is empty
     * each time, but on a persistent DB (Postgres/MySQL) the roles from a
     * previous run are still there, so we must resolve, not blindly insert.
     * USE: called once per role name at startup; guarantees ROLE_ADMIN and
     * ROLE_USER exist exactly once no matter how many times the app restarts.
     */
    private Role getOrCreateRole(String name) {
        return roleRepository.findByName(name)
                .orElseGet(() -> {
                    Role saved = roleRepository.save(Role.builder().name(name).build());
                    log.info("Seeding -> role {}", name);
                    return saved;
                });
    }

    /**
     * WHAT: creates one seed User with the given roles, unless a user with
     * that email already exists.
     * WHY: existsByEmail is an EXISTS/COUNT query, not a full SELECT — it
     * avoids loading a User (and its EAGER-fetched roles) just to check
     * presence, and it's what makes this method idempotent across restarts
     * on a persistent DB.
     * USE: called once per seed account; roles are copied into a new HashSet
     * because Set.of(...) returns an immutable set, and User.roles needs to
     * remain a mutable collection for Hibernate to manage it as a persistent
     * collection later (e.g. if roles are ever added/removed post-load).
     */
    private void seedUser(String fullName, String email, String rawPassword, Set<Role> roles) {
        if (userRepository.existsByEmail(email)) {
            return;
        }
        User user = User.builder()
                .fullName(fullName)
                .email(email)
                .password(encoder.encode(rawPassword))
                .provider(AuthProvider.local)
                .providerId(null)
                .enabled(true)
                .roles(new HashSet<>(roles))
                .build();

        userRepository.save(user);
        log.info("Seeding -> {} / {} ({})", email, rawPassword,
                roles.stream().map(Role::getName).toList());
    }
}