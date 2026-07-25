package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "cart")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "user_id", unique = true)
   private User user;

   @Column(name = "session_id", unique = true, length = 100)
   private String sessionId;

   @Column(nullable = false, updatable = false)
   private Instant createdAt;

   @PrePersist
    protected void onCreate(){
       if (createdAt == null) {
           createdAt = Instant.now();
       }
   }
}
