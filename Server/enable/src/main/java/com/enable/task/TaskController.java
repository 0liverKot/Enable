package com.enable.task;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
        task.setDateAdded();
        task.initialiseNextAppearance();

        taskService.insertTask(task);
    }

    // Put mappings
    @PutMapping("update/{id}/{uid}")
    public void updateTask(
        @PathVariable Integer id,
        @PathVariable Integer uid,
        @RequestBody(required = false) Map<String, Object> body
    ) {
        taskService.updateTask(id, uid, body);
    }

    // this update increments the current nextAppearences so should only be called once that date has been passed 
    // TODO: handles update for a change in the frequency instead of incrementing for next appearence
    @PutMapping("updateNextAppearance/{id}")
    public void updateNextAppearances(@PathVariable Integer id) {
        taskService.updateNextAppearances(id);
    }

    // Get mappings
    
    @GetMapping("get/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("getAll")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("getAll/{uid}")
    public List<Task> getAllTasksByUser(@PathVariable Integer uid) {
        return taskService.getAllTasksByUser(uid);
    }

    @GetMapping("getAll/day/{uid}")
    public List<Task> getAllTasksByDay(@PathVariable Integer uid, @RequestBody Map<String, Object> body) {
        
        String dateString = (String) body.get("date");
        LocalDate date = LocalDate.parse(dateString);
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
