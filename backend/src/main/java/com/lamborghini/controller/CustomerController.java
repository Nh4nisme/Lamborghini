package com.lamborghini.controller;

import com.lamborghini.dto.response.DealerCustomerDTO;
import com.lamborghini.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final AppointmentService appointmentService;

    @GetMapping("/dealer")
    public List<DealerCustomerDTO> getDealerCustomers() {
        return appointmentService.getDealerCustomers();
    }
}
