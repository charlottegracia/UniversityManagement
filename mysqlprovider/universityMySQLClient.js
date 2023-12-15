var mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const MySQLTables = require("./mySQLCollections");
const Course = require('../models/course');
const Department = require('../models/department');
const Faculty = require('../models/faculty');
const Major = require('../models/major');
const Student = require('../models/student');
const Enrollment = require('../models/enrollment');

class UniversityMySQLClient {
  constructor() {
    const configFile = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    this.connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
  }

  /**
 * Connect to the database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
  async connectToDb() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error("Could not connect to MySQL database: " + err.stack);
          reject(err);
          return;
        }
        console.log("Connection to MySQL database made. Yay!");
        resolve();
      })
    })
  }

  async getCourseById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.COURSES} WHERE CourseID = ${id}`, async (err, result) => {
        if (err) {
          console.error(`No course was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        const queryData = result[0];
        const department = await this.getDepartmentById(queryData.DepartmentID);
        const course = new Course(queryData.CourseID, queryData.CourseName, department);
        resolve(course);
      });
    });
  }

  async getCourses() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.COURSES}`, async (err, result) => {
        if (err) {
          console.error("No courses were found.");
          reject(err);
          return;
        }

        let courses = [];
        for (const queryData of result) {
          const department = await this.getDepartmentById(queryData.DepartmentID);
          const course = new Course(queryData.CourseID, queryData.CourseName, department);
          courses.push(course);
        }
        resolve(courses);
      });
    });
  }

  async getDepartmentById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.DEPARTMENTS} WHERE DepartmentID = ${id}`, async (err, result) => {
        if (err) {
          console.error(`No department was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        const queryData = result[0];
        const faculty = await this.getFacultyById(queryData.FacultyID);
        const department = new Department(queryData.DepartmentID, queryData.DepartmentName, faculty);
        resolve(department);
      });
    });
  }

  async getDepartments() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.DEPARTMENTS}`, async (err, result) => {
        if (err) {
          console.error("No departments were found.");
          reject(err);
          return;
        }

        let departments = [];
        for (const queryData of result) {
          const faculty = await this.getFacultyById(queryData.FacultyID);
          const department = new Department(queryData.DepartmentID, queryData.DepartmentName, faculty);
          departments.push(department);
        }

        resolve(departments);
      });
    });
  }

  async getEnrollmentById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.ENROLLMENTS} WHERE EnrollmentID = ${id}`, async (err, result) => {
        if (err) {
          console.error(`No enrollment was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        const queryData = result[0];
        const course = await this.getCourseById(queryData.CourseID);

        const enrollment = new Enrollment(
          queryData.EnrollmentID,
          course,
          queryData.EnrollmentDate,
          queryData.Grade
        );

        resolve(enrollment);
      });
    });
  }

  async getEnrollmentByStudentId(studentId) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.ENROLLMENTS} WHERE StudentID = ${studentId}`, async (err, result) => {
        if (err) {
          console.error(`No enrollment was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        let enrollments = [];
        for (const queryData of result) {
          const course = await this.getCourseById(queryData.CourseID);

          const enrollment = new Enrollment(
            queryData.EnrollmentID,
            course,
            queryData.EnrollmentDate,
            queryData.Grade
          );

          enrollments.push(enrollment);
        }

        resolve(enrollments);
      });
    });
  }

  async getEnrollments() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.ENROLLMENTS}`, async (err, result) => {
        if (err) {
          console.error("No enrollments were found.");
          reject(err);
          return;
        }

        let enrollments = [];
        for (const queryData of result) {
          const course = await this.getCourseById(queryData.CourseID);

          const enrollment = new Enrollment(
            queryData.EnrollmentID,
            course,
            queryData.EnrollmentDate,
            queryData.Grade
          );

          enrollments.push(enrollment);
        }

        resolve(enrollments);
      });
    });
  }

  async getFacultyById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.FACULTIES} WHERE FacultyID = ${id}`, (err, result) => {
        if (err) {
          console.error(`No faculty was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        const queryData = result[0];
        const faculty = new Faculty(queryData.FacultyID, queryData.FacultyName, queryData.Dean);

        resolve(faculty);
      });
    });
  }

  async getFaculties() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.FACULTIES}`, (err, result) => {
        if (err) {
          console.error("No faculties were found.");
          reject(err);
          return;
        }

        let faculties = [];
        for (const queryData of result) {
          const faculty = new Faculty(queryData.FacultyID, queryData.FacultyName, queryData.Dean);
          faculties.push(faculty);
        }

        resolve(faculties);
      });
    });
  }

  async getMajorById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.MAJORS} WHERE MajorID = ${id}`, async (err, result) => {
        if (err) {
          console.error(`No major was found with the ID: ${id}.`);
          reject(err);
          return;
        }

        const queryData = result[0];
        const department = await this.getDepartmentById(queryData.DepartmentID);
        const major = new Major(queryData.MajorID, queryData.MajorName, department);

        resolve(major);
      });
    });
  }

  async getMajors() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.MAJORS}`, async (err, result) => {
        if (err) {
          console.error("No majors were found.");
          reject(err);
          return;
        }

        let majors = [];
        for (const queryData of result) {
          const department = await this.getDepartmentById(queryData.DepartmentID);
          const major = new Major(queryData.MajorID, queryData.MajorName, department);
          majors.push(major);
        }

        resolve(majors);
      });
    });
  }

  async getStudentById(id) {
    return new Promise((resolve, reject) => {
      const queryResult = this.connection.query(`SELECT * FROM ${MySQLTables.STUDENTS} WHERE StudentID = ${id}`, async (err, result) => {
        if (err) {
          console.error(`No student was found with the ID: ${id}.`)
          reject(err);
          return;
        }
        const queryData = queryResult[0];
        const major = await this.getMajorById(queryData.MajorID);
        const enrollments = this.getEnrollmentByStudentId(queryData.StudentID);
        const student = new Student(queryData.StudentID, queryData.Name, queryData.DateOfBirth, major, enrollments);
        resolve(student);
      });
    });
  }

  async getStudents() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM ${MySQLTables.STUDENTS}`, async (err, result) => {
        if (err) {
          console.error("No students were found.");
          reject(err);
          return;
        }
        let students = [];
        for (const queryData of result) {
          const major = await this.getMajorById(queryData.MajorID);
          const enrollments = this.getEnrollmentByStudentId(queryData.StudentID);
          const student = new Student(queryData.StudentID, queryData.Name, queryData.DateOfBirth, major, enrollments);
          students.push(student);
        };
        resolve(students);
      });
    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          console.error("Error closing MySQL connection: " + err.stack);
          reject(err);
          return;
        }
        console.log("MySQL connection closed");
        resolve();
      });
    });
  }
}

module.exports = { UniversityMySQLClient };