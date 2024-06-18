import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home'; // Adjusted filename to match component naming convention
import AdminLogin from './Adminlogin'; // Adjusted filename to match component naming convention
import AdminHome from './Adminhome'; // Adjusted filename to match component naming convention
import StudentDetail from './StudentDetail'; // Adjusted filename to match component naming convention
import AddStudentForm from './AddStudentForm';
import DeleteStudent from './DeleteStudent';
import UpdateStudent from './UpdateStudent';
import ViewMarks from './ViewMarks';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/students" element={<StudentDetail />} /> {/* Use element prop here */}
          <Route path="/add-student" element={<AddStudentForm/>} />
          <Route path="/update-student" element={<UpdateStudent/>} />
          <Route path="/delete-student" element={<DeleteStudent/>} />
          <Route path="/marks" element={<ViewMarks/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
