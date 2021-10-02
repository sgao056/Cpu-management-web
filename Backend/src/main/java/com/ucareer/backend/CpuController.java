package com.ucareer.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin("*")

public class CpuController {
    final CpuService cpuService;

    @Autowired
    public CpuController(CpuService cpuService){
        this.cpuService = cpuService;
    }

    @CrossOrigin("*")
    @GetMapping("api/v1/cpus")
    public ResponseEntity<ResponseBody> getCpus(){
        try{
            List<Cpu> foundList = new ArrayList<>();
            foundList = cpuService.listCpus();
            ResponseBody<List> responseBody = new ResponseBody();
            responseBody.setResult(foundList);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }

    @CrossOrigin("*")
    @GetMapping("api/v1/cpus/{id}")
    public ResponseEntity<ResponseBody> getCpu(@PathVariable Long id){
        try{
            Cpu foundOne = cpuService.getCpu(id);
            ResponseBody<Cpu> responseBody = new ResponseBody();
            if(foundOne == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            responseBody.setResult(foundOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }

    @CrossOrigin("*")
    @PostMapping("api/v1/cpus")
    public ResponseEntity<ResponseBody> createCpu(@RequestBody Cpu cpu){
        try{
            Cpu newOne = cpuService.createCpu(cpu);
            newOne.setStatus("Active");
            ResponseBody<Cpu> responseBody = new ResponseBody<>();
            responseBody.setResult(newOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    };

    @CrossOrigin("*")
    @PutMapping("api/v1/cpus/{id}")
    public ResponseEntity<ResponseBody> updateCpu(@PathVariable Long id, @RequestBody Cpu cpu){
        try{
            Cpu foundOne = cpuService.getCpu(id);
            ResponseBody<Cpu> responseBody = new ResponseBody<>();
            if(foundOne == null){
                responseBody.setError(new Exception("404 NOT FOUND"));
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
            Cpu newOne = cpuService.updateCpu(foundOne, cpu);
            responseBody.setResult(newOne);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }

    };

    @CrossOrigin(origins = "localhost:8002")
    @DeleteMapping("api/v1/cpus/{id}")
    public ResponseEntity<ResponseBody> deleteCpu(@PathVariable Long id){
        ResponseBody<Boolean> responseBody = new ResponseBody<>();
        try{
            boolean deleted = cpuService.deleteCpu(id);
            responseBody.setResult(deleted);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch(EmptyResultDataAccessException emptyRs){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception ex){
            return ResponseEntity.internalServerError().build();
        }
    }
}