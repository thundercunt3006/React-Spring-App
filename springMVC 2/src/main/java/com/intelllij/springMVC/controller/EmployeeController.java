package com.intelllij.springMVC.controller;

import com.intelllij.springMVC.exception.ResourceNotFound;
import com.intelllij.springMVC.model.Employee;
import com.intelllij.springMVC.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
    @Autowired
    private EmployeeRepo employeeRepo;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    //create employee REST API and this method will handle http POST request
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepo.save(employee);
    }

    // get employee by ID REST API
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeByID(@PathVariable Long id) { // the path variable is used to retrieve the id the URL and store it into the Long id variable
       Employee employee = employeeRepo.findById(id)
               .orElseThrow(() -> new ResourceNotFound("Employee does not exist with ID" + id)); // the orElse is used incase there is no record of the specific ID then it throws an exception
        return ResponseEntity.ok(employee);
    }

    //updating employee details REST API
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee details) {
        //Retrieved the employee details from the DB
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee does not exist with ID" + id));
        // we have set the updated employee detail to the employee object
        employee.setfName(details.getfName());
        employee.setlName(details.getlName());
        employee.setEmail(details.getEmail());
        //saving updated employee details to the database
        Employee newEmployeeDetails = employeeRepo.save(employee);
        return ResponseEntity.ok(newEmployeeDetails);
    }
    //DELETE EMPLOYEE REST API
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployeeByID(@PathVariable Long id) {
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee does not exist with ID" + id));
        employeeRepo.delete(employee);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
