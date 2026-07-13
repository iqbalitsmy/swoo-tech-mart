package com.iqbalitsmy.swoo_tech_mart.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;


@Slf4j
@Component
public class JwtTokenProvider {
    private final SecretKey signingKey;
    private final long accessTokenExpireMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs) {
        byte[] keyBytes  = Base64.getDecoder().decode(secret);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpireMs = accessTokenExpirationMs;
    }

    public String generateAccessToken(Long userId, String email){
        Date now = new Date();
        Date expiry = new Date(now.getTime() + accessTokenExpireMs);

        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("email", email)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    public String generateAccessToken(Authentication authentication){
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        return generateAccessToken(principal.getId(), principal.getEmail());
    }

    public long getAccessTokenExpirationMs(){
        return accessTokenExpireMs;
    }

    public Long getUserIdFromToken(String token){
        Claims claims = parseClaims(token);
        return Long.valueOf(claims.getSubject());
    }

    public boolean validateToken(String token){
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException ex){
            log.debug("JWT Expired: {} ", ex.getMessage());
        } catch (UnsupportedJwtException ex){
            log.debug("Unsupported JWT: {} ", ex.getMessage());
        } catch (MalformedJwtException ex){
            log.debug("Malformed JWT: {} ", ex.getMessage());
        } catch (SecurityException | IllegalArgumentException ex){
            log.debug("Invalid JWT: {} ", ex.getMessage());
        }
        return false;
    }

    private Claims parseClaims(String token){
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
