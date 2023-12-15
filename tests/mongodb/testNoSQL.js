const Benchmark = require('benchmark');
const { UniversityMongoDBClient } = require("../../mongodbprovider/universityMongoDBClient")

const suite = new Benchmark.Suite();

const client = new UniversityMongoDBClient();
client.connectToDb();

  suite.add('MongoDB Read single course Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getCourseById(501);
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read Courses Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getCourses();
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read single department Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getDepartmentById(201);
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read Departments Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getDepartments();
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read single faculty Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getFacultyById(301);
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read faculties Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getFaculties();
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read single major Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getMajorById(101);
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read majors Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getMajors();
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read single student Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getStudentById(1);
      deferred.resolve();
    },
  });

  suite.add('MongoDB Read students Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getStudents();
      deferred.resolve();
    },
  });

  suite
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', () => console.log('Benchmark complete.'))
  .run({ async: true });