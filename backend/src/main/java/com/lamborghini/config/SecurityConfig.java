package com.lamborghini.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// [UC011 - THÊM] (1/4) hai import dùng để đọc quyền từ token JWT
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.csrf(crsf -> crsf.disable()) // API stateless, không dùng cookie phiên
                .cors(Customizer.withDefaults()) // dùng bean corsConfig bên dưới - kiểm soát website nào được phép gọi API từ trình duyệt.
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //STATELESS nghĩa là backend không lưu trạng thái đăng nhập của người dùng trong HTTP Session.
                .formLogin(f -> f.disable())
                .httpBasic(h -> h.disable())
                .logout(l -> l.disable())
                .exceptionHandling(ex -> ex // xử lý các lỗi xác thực
                        .authenticationEntryPoint(
                                (request, response, authException) ->  ghiLoi(response, 401, "Bạn chưa đăng nhập")
                        ) // lỗi đối với những người chưa đăng nhập
                        .accessDeniedHandler(
                                (request, response, accessDeniedException) -> ghiLoi(response, 403, "Bạn không có quyền truy cập")
                        ) // lỗi đối với không đủ phân quyền truy cập
                )
                ////////////
                .oauth2ResourceServer(oauth -> oauth
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                        .authenticationEntryPoint(
                                (request, response, authException) -> ghiLoi(response, 401, "Bạn chưa đăng nhập hoặc phiên đã hết hạn")
                        )
                        .accessDeniedHandler(
                                (request, response, accessDeniedException) -> ghiLoi(response, 403, "Bạn không có quyền truy cập")
                        )
                )
                .authorizeHttpRequests(auth -> auth   // quy định ai được truy cập vào API nào
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() //OPTIONS thường được trình duyệt gửi trước một request thực tế để kiểm tra CORS. Request này gọi là preflight request.
                        .requestMatchers("/error").permitAll()
                        .requestMatchers( // đăng ký và xác thực email
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth/email-verification/**"
                        ).permitAll()
                        .requestMatchers( // Công khai tạm thời cho taiKhoan (tất cả methods: GET, POST, PUT, DELETE,...)
                                "/api/taikhoan/**"
                        ).permitAll()
                        .requestMatchers( // API công khai cho guest
                                HttpMethod.GET,
                                "/api/home/**",
                                "/api/model/**",
                                "/api/showroom/**",
                                "/api/configurator/**",
                                "/api/brand/**",
                                "/api/appointment/**",
                                "/api/customer/**"
                        ).permitAll()
                        .requestMatchers( // Công khai cho guest
                                HttpMethod.POST,
                                "/api/appointment"
                        ).permitAll()
                        .requestMatchers( // Công khai tạm thời cho appointment update
                                HttpMethod.PUT,
                                "/api/appointment/**"
                        ).permitAll()
                        // theo vai trò
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/dealer/**").hasRole("DEALER")
                        // còn lại phải đăng nhập
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    ////////////////////
    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter g = new JwtGrantedAuthoritiesConverter();
        g.setAuthoritiesClaimName("role");  // tên claim mà JwtService ghi vào token
        g.setAuthorityPrefix("ROLE_");      // hasRole("ADMIN") thật ra kiểm tra quyền "ROLE_ADMIN"
        JwtAuthenticationConverter c = new JwtAuthenticationConverter();
        c.setJwtGrantedAuthoritiesConverter(g);
        return c;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource( // cấu hình cho security | cần xem lại
                                                            @Value("${app.cors.allowed-origins}") List<String> allowedOrigins) { // @Value đọc từ properties
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(allowedOrigins);
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // cho phép các method liệt kê sử dụng khi gọi API
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setExposedHeaders(List.of("Retry-After")); // cho Frontend đọc được số giây chờ khi bị khóa 60 giây (HTTP 429)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", cfg);
        return source;
    }


    // dùng để trả lỗi cũng như test postman
    private static void ghiLoi(HttpServletResponse res, int status, String message) throws IOException {
        res.setStatus(status);
        res.setContentType("application/json;charset=UTF-8");
        res.getWriter().write("{\"status\":" + status + ",\"message\":\"" + message + "\"}");
    }

}