package com.ang.test.employeetracker.repo;

import com.ang.test.employeetracker.model.Department;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepository extends CrudRepository<Department, Integer> {
}
