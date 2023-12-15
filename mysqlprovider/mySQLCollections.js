const { Module } = require("module")

const MySQLTables = Object.freeze({
    COURSES: 'courses',
    DEPARTMENTS: 'departments',
    ENROLLMENTS: 'enrollments',
    FACULTIES: 'faculties',
    MAJORS: 'majors',
    STUDENTS: 'students'
});

module.exports = MySQLTables;