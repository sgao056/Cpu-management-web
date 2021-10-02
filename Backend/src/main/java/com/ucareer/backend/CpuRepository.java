package com.ucareer.backend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CpuRepository extends JpaRepository<Cpu,Long>{
    Cpu findDistinctById(Long id);
}