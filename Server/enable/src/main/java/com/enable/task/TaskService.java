package com.enable.task;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
    
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Post mappings

    public void insertTask(Task task) {
        taskRepository.save(task);
    }

    // Put mappings

    @Transactional
    public void updateTask(Integer id, Integer uid, String taskName, String taskDescription, Integer duration, Frequency frequency) {
        
        // check valid name
        for(Task task : getAllTasksByUser(uid)) {
            if(task.getTaskName().equals(taskName)) {
                throw new IllegalStateException(
                    "Task with name: " + taskName + " is taken"
                );
            }
        }

        Task task = null; 
        try {
            task = taskRepository.findById(id).get();
        } catch (Exception e) {
            throw new IllegalStateException("Task with id: " + id + " not found");
        }

        task.setTaskName(taskName);
        task.setTaskDescription(taskDescription);
        task.setDurationMinutes(duration);
        task.setFrequency(frequency);
    }

    // Get mappings
    
    public List<Task> getAllTasksByUser(Integer uid) {
        return taskRepository.getAllTasksByUser(uid);
    }

    public List<Task> getAllTasksByDay(Integer uid, LocalDate date) {
        

        List<Task> allTasks = taskRepository.getAllTasksByUser(uid);
        List<Task> tasks = new ArrayList<>();
        for (Task task : allTasks) {
            
            // dateCounter will be incremented according to the task's frequency to see if it will appear on specified date
            LocalDate dateCounter = task.getDateAdded();
            String frequency = task.getFrequency();

            boolean custom = false; 
            String[] customFrequency = null;
            List<Long> customFrequencyList = new ArrayList<>();

            if (frequency.contains("/")) {
                custom = true;
                customFrequency = frequency.split("/");

                for(String i : customFrequency) {
                    customFrequencyList.add(Long.parseLong(i));
                }
            }

            while(dateCounter.isBefore(date)) {
                if(dateCounter.equals(date)) {
                    tasks.add(task);
                    break;
                }
                
                if(!custom) {
                    dateCounter = dateCounter.plusDays(Long.parseLong(frequency));
                } else {
                    // for a custom frequency, cycle through the array to get the next date occurance
                    Long days = customFrequencyList.remove(0);
                    customFrequencyList.add(days);

                    dateCounter = dateCounter.plusDays(days);
                }
            }

        }    
        
        return tasks;
    }

    // Delete mappings

    public void deleteTask(Integer id) {
        
        boolean exists = taskRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException(
                "Task with id " + id + " not found" 
            );
        } else {
            taskRepository.deleteById(id);
        }
    }
}
