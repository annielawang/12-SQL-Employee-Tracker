package com.ang.test.employeetracker.repo;

import com.ang.test.employeetracker.model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
}
