package com.lamborghini.controller;

import com.lamborghini.dto.lichhen.KhachHangLichHen;
import com.lamborghini.dto.request.RejectAppointmentRequest;
import com.lamborghini.dto.response.*;
import com.lamborghini.service.AppointmentService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    public AppointmentResponse datLich(@RequestBody AppointmentRequest request) {
        return appointmentService.datLich(request);
    }

    @GetMapping("/my")
    public List<AppointmentListDTO> getMyAppointments() {
        return appointmentService.getMyAppointments();
    }

    @GetMapping("/dealer")
    public List<DealerAppointmentListDTO> getDealerAppointments() {
        return appointmentService.getDealerAppointments();
    }

    @GetMapping("/dealer/{id}")
    public AppointmentDetailDTO getDealerAppointmentDetail(@PathVariable Integer id) {
        return appointmentService.getDealerAppointmentDetail(id);
    }

    @PutMapping("/{id}/cancel")
    public AppointmentDetailDTO cancelAppointment(@PathVariable Integer id) {
        return appointmentService.cancelAppointment(id);
    }

    @PutMapping("/dealer/{id}/confirm")
    public AppointmentDetailDTO confirmAppointment(@PathVariable Integer id) {
        return appointmentService.confirmAppointment(id);
    }

    @PutMapping("/dealer/{id}/reject")
    public AppointmentDetailDTO rejectAppointment(@PathVariable Integer id, @RequestBody RejectAppointmentRequest request) {
        return appointmentService.rejectAppointment(id, request);
    }

    //UC020: trar ve danh sach khach hang cua dealer cu the
    @GetMapping("/dealer/{id}/customers")
    public List<KhachHangLichHen> getDanhSachKhachHangCuaDealer(@PathVariable Integer id) {
        return appointmentService.getDanhSachKhachHangCuaDealer(id);
    }
}
