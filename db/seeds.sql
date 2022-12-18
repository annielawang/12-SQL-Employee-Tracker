INSERT INTO departments(name) 
VALUES 
    ("IT"),
    ("Security"),
    ("R&D");
       
INSERT INTO roles (title, salary, department_id) 
VALUES 
    ("IT expert", "150000", 1),
    ("IT manager", "160000", 1),
    ("Security manager", "110000", 2),
    ("Security lead", "100000", 2),
    ("Software Engineer", "120000", 3),
    ("Lead Software Engineer", "160000", 3);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Doe", 1, 2),
    ("Mike", "Chan", 2, NULL),
    ("Daphne", "Doty", 3, NULL),
    ("Charlie", "Brown", 4, 3),
    ("Tom", "Allen", 5, 6),
    ("Kevin", "Tupik", 6, NULL);

       
       
