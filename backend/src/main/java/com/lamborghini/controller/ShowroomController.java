package com.lamborghini.controller;

import com.lamborghini.entity.Showroom;
import com.lamborghini.service.ShowroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/showroom")
@RequiredArgsConstructor

public class ShowroomController {

    private final ShowroomService showroomService;


    //UC005: getAllShowroom: lấy toàn bộ showroom có trạng thái hoạt động
    @GetMapping
    public List<Showroom> getAllShowroom() {
        return showroomService.getAllShowroom();
    }

}
