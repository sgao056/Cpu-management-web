package com.ucareer.backend;

import javax.persistence.*;



@Entity
@Table(name = "computer")

public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String label;

    private int price;

    private String type;

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setLabel(String label){
        this.label = label;
    }

    public String getLabel(){
        return label;
    }


    public void setPrice(int price){
        this.price = price;
    }

    public int getPrice(){
        return price;
    }


    public void setType(String type){
        this.type = type;
    }

    public String getType(){
        return type;
    }

}
