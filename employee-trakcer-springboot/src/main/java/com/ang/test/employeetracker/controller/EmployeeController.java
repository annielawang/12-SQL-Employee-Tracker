package com.ang.test.employeetracker.controller;

import com.ang.test.employeetracker.model.Employee;
import com.ang.test.employeetracker.repo.EmployeeRepository;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Api(tags="Employee API", description="manage Employee information")
@Controller // This means that this class is a Controller
@RequestMapping(path="/employee") // This means URL's start with /demo (after Application path)
public class EmployeeController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private EmployeeRepository employeeRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser (@RequestParam String name
            , @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Employee n = new Employee();
        n.setFirstName(name);
        n.setEmail(email);
        employeeRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllUsers() {
        // This returns a JSON or XML with the users
        return employeeRepository.findAll();
    }
}
