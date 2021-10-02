package com.ucareer.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ComputerController {
    final ComputerRepository computerRepository;
    @Autowired
    public ComputerController(ComputerRepository computerRepository){
        this.computerRepository = computerRepository;
    }
    @GetMapping("api/v1/computers")
    public List<Computer> getComputers(){
        List<Computer> foundList = computerRepository.findAll();
        return foundList;
    }
    @GetMapping("api/v1/computers/{id}")
    public Computer getComputer(@PathVariable Long id){
        Computer foundOne = computerRepository.findById(id).orElse(null);
        return foundOne;
    }
    @PostMapping("api/v1/computers")
    public Computer createComputer(@RequestBody Computer computer){
        Computer saveOne = computerRepository.save(computer);
        return saveOne;
    }
    @PutMapping("api/v1/computers/{id}")
    public Computer updateComputer(@PathVariable Long id, @RequestBody Computer computer){
        Computer foundOne = computerRepository.findById(id).orElse(null);
        if (foundOne == null){
            return null;
        }
        if (computer.getPrice() != 0){
            foundOne.setPrice(computer.getPrice());
        }

        if (computer.getLabel() != null){
            foundOne.setLabel(computer.getLabel());
        }

        if (computer.getType() != null){
            foundOne.setType(computer.getType());
        }

        Computer savedOne = computerRepository.save(foundOne);

        return savedOne;
    }
    @DeleteMapping("api/v1/computers/{id}")
    public Boolean  deleteComputer(@PathVariable Long id){
        try{
            computerRepository.deleteById(id);
            return true;
        }catch(Exception e){
            return false;
        }
    }
}