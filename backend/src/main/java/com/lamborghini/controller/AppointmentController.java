package com.lamborghini.controller;

import com.lamborghini.dto.lichhen.request.AppointmentRequest;
import com.lamborghini.dto.lichhen.response.*;
import com.lamborghini.dto.lichhen.request.RejectAppointmentRequest;
import com.lamborghini.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/appointment")
    public AppointmentResponse datLich(@RequestBody AppointmentRequest request, @AuthenticationPrincipal Jwt jwt) {
        Integer maTK = null;

        if(jwt != null) {
            maTK = Integer.valueOf(jwt.getSubject());
        }

        return appointmentService.datLich(request, maTK);
    }

    @GetMapping("/appointments/my")
    public List<AppointmentListDTO> getMyAppointments(@RequestParam(required = false) String email) {
        return appointmentService.getMyAppointments(email);
    }

    @GetMapping("/appointments/{id}")
    public AppointmentDetailDTO getMyAppointmentDetail(@PathVariable Integer id) {
        return appointmentService.getDealerAppointmentDetail(id);
    }

    @GetMapping("/dealer/appointments")
    public List<DealerAppointmentListDTO> getDealerAppointments() {
        return appointmentService.getDealerAppointments();
    }

    @GetMapping("/dealer/appointments/{id}")
    public AppointmentDetailDTO getDealerAppointmentDetail(@PathVariable Integer id) {
        return appointmentService.getDealerAppointmentDetail(id);
    }

    @PutMapping("/appointments/{id}/cancel")
    public AppointmentDetailDTO cancelAppointment(@PathVariable Integer id) {
        return appointmentService.cancelAppointment(id);
    }

    @PutMapping("/appointment/dealer/{id}/confirm")
    public AppointmentDetailDTO confirmAppointment(@PathVariable Integer id) {
        return appointmentService.confirmAppointment(id);
    }

    @PutMapping("/appointment/dealer/{id}/reject")
    public AppointmentDetailDTO rejectAppointment(@PathVariable Integer id, @RequestBody RejectAppointmentRequest request) {
        return appointmentService.rejectAppointment(id, request);
    }

    //UC020: trar ve danh sach khach hang cua dealer cu the
    @GetMapping("/appointment/dealer/{id}/customers")
    public List<KhachHangLichHen> getDanhSachKhachHangCuaDealer(@PathVariable Integer id) {
        return appointmentService.getDanhSachKhachHangCuaDealer(id);
    }
}
