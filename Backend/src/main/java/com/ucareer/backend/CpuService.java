package com.ucareer.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BookService")
public class CpuService {

    @Autowired
    CpuRepository cpuRepository;

    public List<Cpu> listCpus(){
        List<Cpu> list = cpuRepository.findAll();
        return list;
    }

    public Cpu getCpu(Long id){
        Cpu foundOne = new Cpu();
        foundOne = cpuRepository.findById(id).orElse(null);
        return foundOne;
    }

    public Cpu createCpu(Cpu cpu){
        cpu.setStatus("Inactive");
        Cpu newOne = cpuRepository.save(cpu);
        return newOne;
    }

    public Cpu updateCpu(Cpu foundOne, Cpu cpu){
        foundOne.setStatus("Active");
        if(cpu.getSpeed()!=null){
            foundOne.setSpeed(cpu.getSpeed());
        }
        if(cpu.getDescription()!=null){
            foundOne.setDescription(cpu.getDescription());
        }
        if(cpu.getLabel()!=null){
            foundOne.setLabel(cpu.getLabel());
        }
        if(cpu.getPrice()!=null){
            foundOne.setPrice(cpu.getPrice());
        }
        Cpu savedOne = new Cpu();
        savedOne = cpuRepository.save(foundOne);
        return savedOne;
    }

    public boolean deleteCpu(Long id) {
        cpuRepository.deleteById(id);
        return true;
    }
}
