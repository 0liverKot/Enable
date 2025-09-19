package com.enable.task;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Embedded;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks", schema = "public")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    public Integer uid; // id of user the task belongs to
    public String taskName;
    public String taskDescription;
    public Integer durationMinutes;
    
    @Embedded
    public Frequency frequency = new Frequency();
    public LocalDate dateAdded;

    public Task() {}

    public Task(Integer id, Integer uid, String taskName, String taskDescription, Integer durationMinutes, String frequenyOption, String custom) {
        this.id = id;
        this.uid = uid;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.durationMinutes = durationMinutes;
        this.frequency = new Frequency(frequenyOption, custom);
        this.dateAdded = LocalDate.now();
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUid() {
        return this.uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getTaskName() {
        return this.taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return this.taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
    
    public Integer getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Frequency getFrequency() {
        return this.frequency;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }

    public LocalDate getDateAdded() {
        return this.dateAdded;
    }
}
