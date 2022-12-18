const db = require('./db_helper');

// helper function for creating department in db
var createDepartment = function(dep, cb) {
    var insertSql = `INSERT INTO departments(name) VALUES("${dep.getName()}")`;
    db.query(insertSql, (err, results) => {
        if(err) {
            console.error(err);
        } else {
            if(results.affectedRows) {
                console.log("Create Department success: ", dep);
            } else {
                console.log("Create Department failed: ", dep);    
            }
            cb();
        }
    });
}

// helper function for selecting all department from db
var listDepartments = function(cb) {
    db.query("SELECT * FROM departments", (err, results) => {
        if(err) {
            console.error(err);
        } else {
            console.table(results);
            cb();
        }
    });
}

var listDepartmentsIdAndName = function(cb) {
    db.query("SELECT * FROM departments", (err, results) => {
        if(err) {
            console.error(err);
        } else {
            cb(results);
        }
    });
}

module.exports = {
    createDepartment,
    listDepartments,
    listDepartmentsIdAndName
};