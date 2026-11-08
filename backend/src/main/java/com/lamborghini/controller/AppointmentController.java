package com.lamborghini.controller;


import com.lamborghini.dto.response.AppointmentRequest;
import com.lamborghini.dto.response.AppointmentResponse;
import com.lamborghini.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    public AppointmentResponse datLich(@RequestBody AppointmentRequest request) {
        return appointmentService.datLich(request);
    }
}
