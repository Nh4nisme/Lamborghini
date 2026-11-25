package com.lamborghini.repository;

import com.lamborghini.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    NhanVien findByTaiKhoan_MaTaiKhoan(Integer maTK);
}
