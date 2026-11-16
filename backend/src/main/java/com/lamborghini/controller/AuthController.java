package com.lamborghini.controller;

import com.lamborghini.dto.request.ConfirmCodeRequest;
import com.lamborghini.dto.request.RegisterRequest;
import com.lamborghini.dto.request.SendCodeRequest;
import com.lamborghini.dto.response.MessageResponse;
import com.lamborghini.dto.response.RegisterResponse;
import com.lamborghini.dto.response.VerifyEmailResponse;
import com.lamborghini.service.AuthService;
import com.lamborghini.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
