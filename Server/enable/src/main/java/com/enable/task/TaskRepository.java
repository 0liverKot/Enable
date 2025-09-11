package com.enable.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Integer>{
    
    @Query("SELECT t FROM Task t WHERE t.uid = ?1")
    List<Task> getAllTasksByUser(Integer uid);
}