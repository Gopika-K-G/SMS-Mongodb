const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Student_Management';
app.use(cors());
// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose schema and model for Admin
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema, 'admins');

// Define Mongoose schema and model for Student
const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  department: { type: String, required: true },
  year_of_study: { type: Number, required: true },
  section: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema, 'students');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example API route for Admin login
// Example API route for Admin login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username, password });
      if (admin) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// API route to fetch all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    console.log('Fetched students successfully:', students);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route to add a new student
app.post('/api/add-student', async (req, res) => {
  const {
    student_id,
    username,
    password,
    email,
    first_name,
    last_name,
    date_of_birth,
    address,
    phone_number,
    department,
    year_of_study,
    section,
  } = req.body;

  try {
    // Insert a new Student document
    const newStudent = await Student.create({
      student_id,
      username,
      password,
      email,
      first_name,
      last_name,
      date_of_birth: new Date(date_of_birth),
      address,
      phone_number,
      department,
      year_of_study,
      section,
    });

    console.log('Added new student:', newStudent._id);
    res.json({ success: true, studentId: newStudent._id });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Central error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}
// API route to fetch a specific student by roll number
app.get('/api/students/:rollNo', async (req, res) => {
    const rollNo = req.params.rollNo;
  
    try {
      const student = await Student.find({ student_id: rollNo });
      console.log(student);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      console.log('Fetched student:', student);
      res.json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// API route to update a specific student by roll number
app.put('/api/update-student/:rollNo', async (req, res) => {
    const rollNo = req.params.rollNo;
    const updatedData = req.body;
  
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { student_id: rollNo },
        updatedData,
        { new: true } // To return the updated document
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      console.log('Updated student:', updatedStudent);
      res.json(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete('/api/delete-student/:rollNo', async (req, res) => {
    const rollNo = req.params.rollNo;
    console.log('Deleting student with roll number:', rollNo); // Log the rollNo received
    
    try {
      const deletedStudent = await Student.deleteOne({ student_id: rollNo });
      console.log('Deleted student:', deletedStudent); // Log the deletedStudent object
      
      if (deletedStudent.deletedCount === 0) { // Check if deletedCount is 0
        return res.status(404).json({ error: 'Student not found' });
      }
  
      console.log('Deleted student:', deletedStudent);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// server.js

// Define Mongoose schemas and models
const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: Number, required: true },
});

const Course = mongoose.model('Course', courseSchema, 'courses');

// Define Mongoose schemas and models
const studentMarksSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  course_id: { type: String, required: true },
  semester: { type: Number, required: true },
  marks_obtained: { type: Number, required: true },
  grade: { type: String, required: true },
});

const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema, 'studentMarks');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to get marks for a specific student ID
app.get('/api/marks/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Fetch marks for the given student ID
    const marks = await StudentMarks.find({ student_id: studentId }).lean();

    if (!marks.length) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Organize marks by semester
    const organizedMarks = marks.reduce((acc, mark) => {
      const semester = mark.semester;
      if (!acc[semester]) {
        acc[semester] = { semesterNumber: semester, subjects: [] };
      }
      acc[semester].subjects.push({
        course_id: mark.course_id,
        marks_obtained: mark.marks_obtained,
        grade: mark.grade
      });
      return acc;
    }, {});

    // Convert the organized marks to an array
    const result = Object.values(organizedMarks).sort((a, b) => a.semesterNumber - b.semesterNumber);

    res.status(200).json({ semesters: result });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.get('/admin/view-marks', async (req, res) => {
    const { semester } = req.query;
    if (!semester) {
      return res.status(400).send('Semester is required');
    }
  
    try {
      const courses = await Course.find({ semester: semester });
      console.log(courses);
      const marks = await StudentMarks.find({ semester: semester });
      console.log(marks);
      const studentIds = marks.map(mark => mark.student_id);

      const students = await Student.find({ student_id: { $in: studentIds } });
      console.log(students);
  
      res.json({ courses, marks, students });
    } catch (error) {
      console.error('Error fetching marks:', error);
      res.status(500).send('Failed to fetch marks');
    }
  });
 
    
    
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
