package com.lamborghini.repository;

import com.lamborghini.entity.Xe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface XeRepository extends JpaRepository<Xe, Integer> {
}
