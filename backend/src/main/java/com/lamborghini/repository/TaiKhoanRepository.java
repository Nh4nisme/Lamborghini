package com.lamborghini.repository;

import com.lamborghini.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    // dùng để kiểm tra xem db đã có email này chưa (check tồn tại)
    boolean existsByEmailIgnoreCase(String email);
}
