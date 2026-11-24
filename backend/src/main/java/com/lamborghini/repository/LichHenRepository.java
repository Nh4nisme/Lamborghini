package com.lamborghini.repository;

import com.lamborghini.entity.LichHen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LichHenRepository extends JpaRepository<LichHen, Integer> {
    
    @Query("SELECT lh FROM LichHen lh WHERE lh.emailLienHe = :email ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findByEmailLienHe(@Param("email") String email);
    
    @Query("SELECT lh FROM LichHen lh JOIN FETCH lh.showroom JOIN FETCH lh.xe WHERE lh.showroom.maShowroom = :maShowroom ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findByShowroom(@Param("maShowroom") Integer maShowroom);
    
    @Query("SELECT lh FROM LichHen lh JOIN FETCH lh.showroom JOIN FETCH lh.xe WHERE lh.maLichHen = :id")
    LichHen findByIdWithDetails(@Param("id") Integer id);
    
    @Query("SELECT DISTINCT lh FROM LichHen lh LEFT JOIN FETCH lh.khachHang kh LEFT JOIN FETCH kh.taiKhoan LEFT JOIN FETCH lh.xe x LEFT JOIN FETCH x.dongXe WHERE lh.showroom.maShowroom = :maShowroom ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findCustomersByShowroom(@Param("maShowroom") Integer maShowroom);
}
