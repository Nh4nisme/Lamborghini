package com.lamborghini.controller;

import com.lamborghini.dto.request.ConfirmCodeRequest;
import com.lamborghini.dto.request.RegisterRequest;
import com.lamborghini.dto.request.SendCodeRequest;
import com.lamborghini.dto.response.MessageResponse;
import com.lamborghini.dto.response.RegisterResponse;
import com.lamborghini.dto.response.VerifyEmailResponse;
import com.lamborghini.dto.response.login.request.LoginRequest;
import com.lamborghini.dto.response.login.response.LoginResponse;
import com.lamborghini.service.AuthService;
import com.lamborghini.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private  final EmailVerificationService emailVerificationService;

    @PostMapping("/email-verification/send")
    public MessageResponse guiMa(@RequestBody SendCodeRequest req) {
        return emailVerificationService.guiMaXacThuc(req.email());
    }

    @PostMapping("/email-verification/confirm")
    public VerifyEmailResponse xacNhan(@RequestBody ConfirmCodeRequest req) {
        return emailVerificationService.xacNhanMa(req.email(), req.code());
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
        return Map.of("maTK", jwt.getSubject(),
                "email", jwt.getClaimAsString("email"),
                "vaiTro", jwt.getClaimAsString("role"));
    }
}
