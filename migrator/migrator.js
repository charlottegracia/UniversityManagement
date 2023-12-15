const { UniversityMongoDBClient } = require('../mongodbprovider/universityMongoDBClient');
const { UniversityMySQLClient } = require('../mysqlprovider/universityMySQLClient');

async function migrate() {
    const mySQLClient = new UniversityMySQLClient();
    const mongoClient = new UniversityMongoDBClient();

  try {
    // MySQL operations
    await mySQLClient.connectToDb();

    const courses = await mySQLClient.getCourses();
    const departments = await mySQLClient.getDepartments();
    const faculties = await mySQLClient.getFaculties();
    const majors = await mySQLClient.getMajors();
    const students = await mySQLClient.getStudents();

    // MongoDB operations
    await mongoClient.connectToDb();

    await mongoClient.insertCourses(courses);
    await mongoClient.insertDepartments(departments);
    await mongoClient.insertFaculties(faculties);
    await mongoClient.insertMajors(majors);
    await mongoClient.insertStudents(students);

  } catch (error) {
    console.error('Error during migration:', error);
    throw error; // Rethrow the error to signal failure
  } finally {
    // Ensure that both connections are closed, even if an error occurs
    if (mySQLClient) {
      await mySQLClient.disconnect();
    }

    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

migrate()
    .then(() => {
    console.log('Migration successful.');
    process.exit(0); // Exit the process with success code
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1); // Exit the process with an error code
  });