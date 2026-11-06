package com.lamborghini.repository;

import com.lamborghini.entity.Showroom;
import com.lamborghini.enums.TrangThaiShowroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowroomRepository extends JpaRepository<Showroom, Integer> {

    List<Showroom> findAllByTrangThaiOrderByKhuVucAsc(TrangThaiShowroom trangThai);

}
