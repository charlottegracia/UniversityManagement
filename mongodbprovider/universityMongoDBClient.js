const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs');
const path = require('path');
const MongoCollections = require("./mongoCollections");
const Course = require("../models/course");

class UniversityMongoDBClient {
  constructor() {
    const configFile = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    const connectionString = config.database.connectionString;
    this.client = new MongoClient(connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async connectToDb() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) {
          console.error("Failed to connect to MongoDB.");
          reject(err);
        } else {
          this.client.db();
          console.log("Hooray, we accessed the MongoDB!")
          resolve();
        }
      });
    });
  }

  async getCourseById(id) {
    const course = this.client.db().collection(MongoCollections.COURSES).findOne({courseID: id})
    return course;
  }

  async getCourses() {
    const allCourses = await this.client.db().collection(MongoCollections.COURSES).find({}).toArray();
    return allCourses;
  }

  async getDepartmentById(id) {
    const department = this.client.db().collection(MongoCollections.DEPARTMENTS).find({departmentID: id});
    return department;
  }

  async getDepartments() {
    const allDepartments = await this.client.db().collection(MongoCollections.DEPARTMENTS).find({}).toArray();
    return allDepartments;
  }

  async getFacultyById(id) {
    const faculty = this.client.db().collection(MongoCollections.FACULTIES).find({facultyID: id});
    return faculty;
  }

  async getFaculties() {
    const allFaculties = await this.client.db().collection(MongoCollections.FACULTIES).find({}).toArray();
    return allFaculties;
  }

  async getMajorById(id) {
    const major = this.client.db().collection(MongoCollections.MAJORS).find({majorID: id});
    return major;
  }

  async getMajors() {
    const allMajors = await this.client.db().collection(MongoCollections.MAJORS).find({}).toArray();
    return allMajors;
  }

  async getStudentById(id) {
    const student = this.client.db().collection(MongoCollections.STUDENTS).find({studentID: id});
    return student;
  }

  async getStudents() {
    const allStudents = await this.client.db().collection(MongoCollections.STUDENTS).find({}).toArray();
    return allStudents;
  }

  async insertCourse(course) {
    await this.client.db().collection(MongoCollections.COURSES).insertOne(course);
  }

  async insertCourses(courses) {
    await this.client.db().collection(MongoCollections.COURSES).insertMany(courses);
  }

  async insertDepartment(department) {
    await this.client.db().collection(MongoCollections.COURSES).insertOne(department);
  }

  async insertDepartments(departments) {
    await this.client.db().collection(MongoCollections.COURSES).insertMany(departments);
  }

  async insertFaculty(faculty) {
    await this.client.db().collection(MongoCollections.COURSES).insertOne(faculty);
  }

  async insertFaculties(faculties) {
    await this.client.db().collection(MongoCollections.COURSES).insertMany(faculties);
  }

  async insertMajor(major) {
    await this.client.db().collection(MongoCollections.COURSES).insertOne(major);
  }

  async insertMajors(majors) {
    await this.client.db().collection(MongoCollections.COURSES).insertMany(majors);
  }

  async insertStudent(student) {
    await this.client.db().collection(MongoCollections.COURSES).insertOne(student);
  }

  async insertStudents(students) {
    await this.client.db().collection(MongoCollections.COURSES).insertMany(students);
  }

  async close() {
    await this.client.close();
  }
}

module.exports = {UniversityMongoDBClient};