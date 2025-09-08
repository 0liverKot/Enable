package com.enable.task;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import com.enable.task.Frequency.FrequencyOptions;

@Entity
@Table(name = "tasks", schema = "public")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId; // id of user the task belongs to
    private String taskName;
    private String taskDescription;
    private Float durationMinutes;
    private Frequency frequency;
    private LocalDate dateAdded;

    public Task() {}

    public Task(Integer id, Integer userId, String taskName, String taskDescription, Float durationMinutes, FrequencyOptions frequeny) {
        this.id = id;
        this.userId = userId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.durationMinutes = durationMinutes;
        this.frequency = new Frequency(frequeny, null);
        this.dateAdded = LocalDate.now();
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
    
    public Float getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Float durationMinutes) {
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
