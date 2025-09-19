package com.enable.task;

import java.lang.reflect.Field;
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

        // check for any empty fields 

        Field[] fields = task.getClass().getDeclaredFields(); 
        List<String> unfilledFields = new ArrayList<>();  
        for(Field field : fields) {
            try {
                // id is always empty since it is auto generated
                if(field.getName() == "id") {
                    continue;
                }
                if(field.get(task) == null || field.get(task).toString().isEmpty()) {
                    unfilledFields.add(field.getName());
                }
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            
        }

        if(!unfilledFields.isEmpty()) {
        
            // build string for error message 

            StringBuilder builder = new StringBuilder();
            builder.append("The following fields are empty: ");
            builder.append(System.lineSeparator());

            for(String field : unfilledFields) {
                builder.append(field);
                builder.append(System.lineSeparator());
            }

            throw new IllegalStateException(builder.toString());
        }

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
    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getAllTasksByUser(Integer uid) {
        return taskRepository.getAllTasksByUser(uid);
    }

    public List<Task> getAllTasksByDay(Integer uid, LocalDate date) {
        

        List<Task> allTasks = taskRepository.getAllTasksByUser(uid);
        List<Task> tasks = new ArrayList<>();
        for (Task task : allTasks) {
            
            // dateCounter will be incremented according to the task's frequency to see if it will appear on specified date
            LocalDate dateCounter = task.getDateAdded();
            String frequency = task.getFrequency().getFrequencyDays();

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
