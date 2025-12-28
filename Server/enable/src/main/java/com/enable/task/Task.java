package com.enable.task;

import java.time.LocalDate;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.cglib.core.Local;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

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
    public Integer minutesDone;
    public String frequency;
    public LocalDate dateAdded;
    public LocalDate nextAppearance; 
    
    // not stored in db 
    @Transient
    private String frequencyOption;
    @Transient
    private String custom;

    public Task() {}

    public Task(Integer id, Integer uid, String taskName, String taskDescription, Integer durationMinutes, String frequencyOption, String custom) {
        this.id = id;
        this.uid = uid;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.durationMinutes = durationMinutes;
        this.frequencyOption = frequencyOption;
        this.custom = custom;
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

    public Integer getMinutesDone() {
        return this.minutesDone;
    }

    public void initialiseMinutesDone() {
        this.minutesDone = 0;
    }

    public void setMinutesDone(Integer minutesDone) {
        this.minutesDone = minutesDone;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public void setFrequency(String frequencyOption, String custom) {
        
        Frequency frequency = new Frequency(frequencyOption, custom);
        this.frequency = frequency.getFrequencyDays();
    }

    public void setDateAdded() {
        this.dateAdded = LocalDate.now();
    }

    public LocalDate getDateAdded() {
        return this.dateAdded;
    }

    public void setFrequencyOption(String frequencyOption) {
        this.frequencyOption = frequencyOption;
    }

    public String getFrequencyOption() {
        return this.frequencyOption;
    }

    public void setCustom(String custom) {
        this.custom = custom;
    }

    public String getCustom() {
        return this.custom;
    }

    public void initialiseNextAppearance() {
        LocalDate currentDate = LocalDate.now();
        
        String frequency;
        if(this.frequency.contains("/")) {
            frequency = this.frequency.split("/")[0];
        } else {
            frequency = this.frequency;
        }

        this.nextAppearance = currentDate.plusDays(Integer.parseInt(frequency));
    }

    public void setNextAppearance(LocalDate nextAppearance) {
        this.nextAppearance = nextAppearance;
    }

    public LocalDate getNextAppearance() {
        return this.nextAppearance;
    }
}
