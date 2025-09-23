package com.enable.task;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tasks")
public class TaskController {
    
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Post mappings
    
    @PostMapping
    public void addNewTask(@RequestBody Task task) {
        
        task.setFrequency(task.getFrequencyOption(), task.getCustom());
        
        taskService.insertTask(task);
    }

    // Put mappings
    @PutMapping("update/{id}")
    public void updateTask(
        @PathVariable Integer id,
        @RequestParam(required = false) Integer uid,
        @RequestParam(required = false) String taskName,
        @RequestParam(required = false) String taskDescription,
        @RequestParam(required = false) Integer durationMinutes,
        @RequestParam(required = false) String frequencyOption,
        @RequestParam(required = false) String custom
    ) {
        taskService.updateTask(id, uid, taskName, taskDescription, durationMinutes, frequencyOption, custom);
    }

    // Get mappings
    
    @GetMapping("getAll")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("getAll/{uid}")
    public List<Task> getAllTasksByUser(@PathVariable Integer uid) {
        return taskService.getAllTasksByUser(uid);
    }

    @GetMapping("getAll/{uid}/{day}")
    public List<Task> getAllTasksByDay(@PathVariable Integer uid, @PathVariable LocalDate date) {
        return taskService.getAllTasksByDay(uid, date);
    }

    // Delete mappings 

    @DeleteMapping("{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }

    @DeleteMapping("/deleteAll/{uid}")
    public void deleteAllUsersTasks(@PathVariable Integer uid) {

        List<Task> tasks = this.getAllTasksByUser(uid);
        for(Task task : tasks) {
            taskService.deleteTask(task.getId());
        }
    }

}
