package com.enable.enable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.enable.enable.Task;

@Entity
@Table(name = "users", schema = "public")
public class User {
    
    // makes these attributes columns in db
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto generates id values
    private Integer id;
    private String name;

    public User() {}

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
