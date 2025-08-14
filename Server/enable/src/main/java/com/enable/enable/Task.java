package com.enable.enable;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.enable.enable.FrequencyOptions;

@Entity
@Table(name = "tasks", schema = "public")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId; // id of user the task belongs to
    private String note;
    private Float durationMinutes;
    private Days nextOccurance;
    private FrequencyOptions frequency;

    public enum Days{MON, TUE, WED, THUR, FRI, SAT, SUN}

    public Task() {}

    public Task(Integer id, Integer userId, String note, Float durationMinutes, Days nextOccurance, FrequencyOptions frequeny) {
        this.id = id;
        this.userId = userId;
        this.note = note;
        this.durationMinutes = durationMinutes;
        this.nextOccurance = nextOccurance;
        this.frequency = frequeny;
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

    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Float getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Float durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Days getNextOccurance() {
        return this.nextOccurance;
    }

    public void setNextOccurance(Days nextOccurance) {
        this.nextOccurance = nextOccurance;
    }

    public FrequencyOptions getFrequency() {
        return this.frequency;
    }

    public void setFrequency(FrequencyOptions frequency) {
        this.frequency = frequency;
    }

}
