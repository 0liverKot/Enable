package com.enable.task;

import org.springframework.stereotype.Service;

import com.enable.task.TaskRepository;

@Service
public class TaskService {
    
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
}
