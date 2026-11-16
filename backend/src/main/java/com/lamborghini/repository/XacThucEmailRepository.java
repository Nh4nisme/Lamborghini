package com.lamborghini.repository;

import com.lamborghini.entity.XacThucEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface XacThucEmailRepository extends JpaRepository<XacThucEmail, Integer> {

    // trả về email đầu tiên với mã OTP được sắp xếp giảm dần
    XacThucEmail findTopByEmailOrderByMaOTPHashDesc(String email);

    // dùng để đếm số bản ghi có email tương ứng và thời gian tạo lớn hơn thời điểm tu truyền vào: giới hạn số lần gửi OTP
    long countByEmailAndNgayTaoAfter(String email, LocalDateTime tu);

    // tìm thông qua token hash
    XacThucEmail findByTokenHash(String tokenHash);





}
