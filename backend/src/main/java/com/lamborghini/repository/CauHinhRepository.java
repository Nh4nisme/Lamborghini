package com.lamborghini.repository;

import com.lamborghini.entity.CauHinh;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CauHinhRepository extends JpaRepository<CauHinh, Integer> {

    boolean existsByTaiKhoan_MaTaiKhoanAndTenCauHinh(Integer maTK, String tenCauHinh);

    boolean existsByMaChiaSe(String maChiaSe);

    List<CauHinh> getAllByTaiKhoan_MaTaiKhoan(Integer maTK);

    Optional<CauHinh> findByMaChiaSe(String maChiaSe);

}
