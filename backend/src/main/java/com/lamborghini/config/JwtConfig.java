package com.lamborghini.config;

import com.lamborghini.repository.TokenBiThuHoiRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Configuration
public class JwtConfig {
    private final SecretKey key;

    public JwtConfig(@Value("${app.jwt.secret}") String secret) {
        byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) {                       // HS256 cần khóa tối thiểu 256 bit; sai thì báo ngay lúc khởi động
            throw new IllegalStateException("JWT_SECRET phải dài ít nhất 32 ký tự");
        }
        this.key = new SecretKeySpec(bytes, "HmacSHA256");
    }

    @Bean
    public JwtEncoder jwtEncoder() {                    // dùng để KÝ token lúc đăng nhập
        return new NimbusJwtEncoder(new ImmutableSecret<>(key));
    }

    @Bean
    public JwtDecoder jwtDecoder(
            TokenBiThuHoiRepository tokenBiThuHoiRepository) {

        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withSecretKey(key)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();

        // kiểm tra chữ ký, thời hạn và issuer
        OAuth2TokenValidator<Jwt> validatorMacDinh =
                JwtValidators.createDefaultWithIssuer(
                        "lamborghini-web"
                );

        // kiểm tra JWT có nằm trong danh sách thu hồi không
        OAuth2TokenValidator<Jwt> validatorThuHoi = jwt -> {

            String jti = jwt.getId();

            if (jti == null ||
                    tokenBiThuHoiRepository.existsByMaDinhDanhToken(jti)) {

                return OAuth2TokenValidatorResult.failure(
                        new OAuth2Error(
                                "invalid_token",
                                "Token đã bị thu hồi hoặc không hợp lệ",
                                null
                        )
                );
            }

            return OAuth2TokenValidatorResult.success();
        };

        // kết hợp hai bộ kiểm tra
        decoder.setJwtValidator(
                new DelegatingOAuth2TokenValidator<>(
                        validatorMacDinh,
                        validatorThuHoi
                )
        );

        return decoder;
    }

}
