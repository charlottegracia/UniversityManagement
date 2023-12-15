const { Module } = require("module")

const MongoCollections = Object.freeze({
    COURSES: 'Courses',
    DEPARTMENTS: 'Departments',
    FACULTIES: 'Faculties',
    MAJORS: 'Majors',
    STUDENTS: 'Students'
});

module.exports = MongoCollections;