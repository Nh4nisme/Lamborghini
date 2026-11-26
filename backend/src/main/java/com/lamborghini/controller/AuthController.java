package com.lamborghini.controller;

import com.lamborghini.dto.profile.request.ChangePasswordRequest;
import com.lamborghini.dto.profile.response.ChangePasswordResponse;
import com.lamborghini.dto.dangky.request.ConfirmCodeRequest;
import com.lamborghini.dto.dangky.request.RegisterRequest;
import com.lamborghini.dto.dangky.request.SendCodeRequest;
import com.lamborghini.dto.global.MessageResponse;
import com.lamborghini.dto.dangky.reponse.RegisterResponse;
import com.lamborghini.dto.dangky.reponse.VerifyEmailResponse;
import com.lamborghini.dto.login.request.GoogleLoginRequest;
import com.lamborghini.dto.login.request.LoginRequest;
import com.lamborghini.dto.login.response.LoginResponse;
import com.lamborghini.service.authentication.AuthService;
import com.lamborghini.service.authentication.EmailVerificationService;
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
    @PostMapping("/google")
    public LoginResponse loginWithGoogle(@RequestBody GoogleLoginRequest req) {
        return authService.loginWithGoogle(req);
    }
    @PutMapping("/profile/password")
    public ChangePasswordResponse doiatKhauChoDealer(@RequestBody ChangePasswordRequest req, @AuthenticationPrincipal Jwt jwt) {
        Integer maTK = Integer.valueOf(jwt.getSubject());
        return authService.doiatKhauChoDealer(req, maTK);
    }
}
