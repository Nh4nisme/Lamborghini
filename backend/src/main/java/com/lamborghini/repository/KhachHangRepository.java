package com.lamborghini.repository;

import com.lamborghini.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    KhachHang findByTaiKhoan_MaTaiKhoan(Integer maTK);
}
