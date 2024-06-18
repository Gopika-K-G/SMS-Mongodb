import React from 'react';
import { Link } from 'react-router-dom';
import viewStudentsImage from './view_students.png';
import viewMarksImage from './view_marks.jpg';

const AdminHome = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/admin/logout');
      if (response.ok) {
        // Perform any necessary cleanup or state updates upon successful logout
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        width: '95%',
        maxWidth: '1000px',
        padding: '40px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderRadius: '10px',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        margin: '20px auto',
        position: 'relative', // Ensure position context for absolute positioning
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '30px',
        }}>Welcome, Admin</h1>
        
        {/* Dashboard Elements */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          gap: '40px',
          flexWrap: 'wrap',
          height: '300px',
        }}>
          {/* View Students */}
          <div style={{
            width: 'calc(30% - 40px)',
            height: '100%',
            backgroundColor: '#007BFF',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}>
            <Link to="/students" style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '15px',
              display: 'block',
            }}>
              <img src={viewStudentsImage} alt="View Students" style={{
                width: '100px',
                height: '100px',
                transition: 'transform 0.3s ease',
              }} />
              <div>View Students</div>
            </Link>
          </div>

          {/* View Marks */}
          <div style={{
            width: 'calc(30% - 40px)',
            height: '100%',
            backgroundColor: '#007BFF',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}>
            <Link to="/marks" style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '15px',
              display: 'block',
            }}>
              <img src={viewMarksImage} alt="View Marks" style={{
                width: '100px',
                height: '100px',
                transition: 'transform 0.3s ease',
              }} />
              <div>View Marks</div>
            </Link>
          </div>
        </div>

        {/* Logout Link */}
        <Link to="/" className="logout-link" style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          textDecoration: 'none',
          color: '#007BFF',
          fontWeight: 'bold',
        }} onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
};

export default AdminHome;
