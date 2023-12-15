const Benchmark = require('benchmark');
const { UniversityMySQLClient } = require("../../mysqlprovider/universityMySQLClient")

const suite = new Benchmark.Suite();

const client = new UniversityMySQLClient();
client.connectToDb();

  suite.add('MySQL Read single course Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getCourseById(501);
      deferred.resolve();
    },
  });

  suite.add('MySQL Read Courses Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getCourses();
      deferred.resolve();
    },
  });

  suite.add('MySQL Read single department Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getDepartmentById(201);
      deferred.resolve();
    },
  });

  suite.add('MySQL Read Departments Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getDepartments();
      deferred.resolve();
    },
  });

  suite.add('MySQL Read single faculty Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getFacultyById(301);
      deferred.resolve();
    },
  });

  suite.add('MySQL Read faculties Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getFaculties();
      deferred.resolve();
    },
  });

  suite.add('MySQL Read single major Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getMajorById(101);
      deferred.resolve();
    },
  });

  suite.add('MySQL Read majors Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getMajors();
      deferred.resolve();
    },
  });

  suite.add('MySQL Read single student Query', {
    defer: true,
    fn: async (deferred) => {
      await client.getStudentById(1);
      deferred.resolve();
    },
  });

  suite.add('MySQL Read students Query', {
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