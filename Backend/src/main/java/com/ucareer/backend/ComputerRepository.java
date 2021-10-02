package com.ucareer.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ComputerRepository extends  JpaRepository<Computer, Long> {
    Computer findDistinctById(Long id);
}

