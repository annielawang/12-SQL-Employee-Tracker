const db = require('./db_helper');

// helper function for creating role in db
var createRole = function(role, depId, cb) {
    var insertSql = `INSERT INTO roles(title, salary, department_id) VALUES("${role.getTitle()}", "${role.getSalary()}", ${depId})`;
    db.query(insertSql, (err, results) => {
        if(err) {
            console.error(err);
        } else {
            if(results.affectedRows) {
                console.log("Create Role success: ", role);
            } else {
                console.log("Create Role failed: ", role);    
            }
            cb();
        }
    });
}

// helper function for selecting all department from db
var listRoles = function(cb) {
    db.query("SELECT * FROM roles", (err, results) => {
        if(err) {
            console.error(err);
        } else {
            console.table(results);
            cb();
        }
    });
}

var listRolesIdAndTitle = function(cb) {
    db.query("SELECT id, title FROM roles", (err, results) => {
        if(err) {
            console.error(err);
        } else {
            cb(results);
        }
    });
}

module.exports = {
    createRole,
    listRoles,
    listRolesIdAndTitle
};