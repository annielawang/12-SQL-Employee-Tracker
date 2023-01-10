package com.ang.test.employeetracker.model;

import javax.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
