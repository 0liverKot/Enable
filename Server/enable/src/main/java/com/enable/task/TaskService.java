package com.enable.task;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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

        // check if task is duplicate
        if(taskRepository.getTaskByNameForUser(task.taskName, task.uid).size() != 0) {
            throw new IllegalStateException("Task with name: " + task.taskName + " already exists");
        }

        // check for any empty fields 
        Field[] fields = task.getClass().getDeclaredFields(); 
        List<String> unfilledFields = new ArrayList<>();  
        for(Field field : fields) {
            try {
                // these fields will be auto generated so are passed as empty
                if(field.getName() == "id" || field.getName() == "dateAdded" || field.getName() == "nextAppearance") {
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
    public void updateTask(Integer id, Integer uid, Map<String, Object> body) {

        Task task = taskRepository.findById(id).orElseThrow(() 
        -> new IllegalStateException("Task with Id: " + id + "does not exist")
        );
        
        body.forEach((field, value) -> {
            if(field.equals("frequencyOption")) {
                String frequencyOption = (String) body.get("frequencyOption");
                String custom = (String) body.get("custom");
                updateField(task, frequencyOption, custom);
            }
            // skip over custom since frequencyOption will change the frequency
            // custom variable is passed when updating it 
            else if(!field.equals("custom")) {
                updateField(task, id, uid, field, value);
            }
        }
    );  

    }

    // used to update fields in the update task method
    private void updateField(Task task, Integer id, Integer uid, String field, Object value) {
        switch(field) {

            case "taskName" -> {
                List<Task> tasks = getAllTasksByUser(uid);
                for (Task t : tasks) {
                    if(t.getTaskName().equals(value)) {
                        throw new IllegalStateException("Task with name: " + value + " already exists");
                    }
                }
                String taskName = (String) value;
                task.setTaskName(taskName);    
            }

            case "taskDescription" -> {
                String taskDescription = (String) value;
                task.setTaskDescription(taskDescription);
            }

            case "durationMinutes" -> {
                Integer durationMinutes = (Integer) value;
                task.setDurationMinutes(durationMinutes);
            }
        }
    }

    // special case for updating frequency since it requires two variables
    private void updateField(Task task, String frequencyOption, String custom) {
        task.setFrequencyOption(frequencyOption);
        task.setCustom(custom);
        task.setFrequency(task.getFrequencyOption(), task.getCustom());
    }

    @Transactional
    public void updateNextAppearances(Integer id) {
        Task task = getTaskById(id);
        String frequency = task.getFrequency();

        if(frequency.contains("/")) {
            frequency = frequency.split("/")[0];
        }
        task.setNextAppearance(task.getNextAppearance().plusDays(Integer.parseInt(frequency)));
    }
    
    // Get mappings
    
    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).orElseThrow(
            () -> new IllegalStateException("Task with id: " + id + " not found")
        );
    }

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
            String frequency = task.getFrequency();

            List<Long> customFrequencyLongArray = new ArrayList<>();
            
            // set custom variable 
            boolean custom = false;
            if(task.getFrequencyOption() == "CUSTOM") {
                custom = true;
            }

            if (custom) {
                
                List<String> customFrequencyStringArray = new ArrayList<>(Arrays.asList(frequency.split("/")));
                for(String i : customFrequencyStringArray) {
                    customFrequencyLongArray.add(Long.parseLong(i));
                }
            }

            while(!dateCounter.isAfter(date)) {
                if(dateCounter.equals(date)) {
                    tasks.add(task);
                    break;
                }
                
                if(!custom) {
                    dateCounter = dateCounter.plusDays(Long.parseLong(frequency));
                } else {
                    // for a custom frequency, cycle through the array to get the next date occurance
                    Long days = customFrequencyLongArray.remove(0);
                    customFrequencyLongArray.add(days);

                    dateCounter = dateCounter.plusDays(days);
                }
            }

        }    
        
        if(tasks.isEmpty()) {
            throw new IllegalStateException("No tasks on the date: " + date);
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
