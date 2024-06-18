import React, { useEffect, useState } from 'react';

const StudentDetail = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleAddStudentClick = () => {
    window.location.href = '/add-student';
  };
  const handleUpdateStudentClick = () => {
    window.location.href = '/update-student';
  };
  const handleDeleteStudentClick = () => {
    window.location.href = '/delete-student';
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleAddStudentClick}>Add Student</button>
        <button style={styles.button} onClick={handleUpdateStudentClick}>Update Student</button>
        <button style={styles.button} onClick={handleDeleteStudentClick}>Delete Student</button>
      </div>
      <div style={styles.tableContainer}>
        <h2 style={{ textAlign: 'center' }}>Student Details</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Roll No</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>First Name</th>
                <th style={styles.tableHeader}>Last Name</th>
                <th style={styles.tableHeader}>Date of Birth</th>
                <th style={styles.tableHeader}>Address</th>
                <th style={styles.tableHeader}>Phone Number</th>
                <th style={styles.tableHeader}>Department</th>
                <th style={styles.tableHeader}>Year of Study</th>
                <th style={styles.tableHeader}>Section</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id} style={styles.tableRow}>
                  <td style={styles.tableData}>{student.student_id}</td>
                  <td style={styles.tableData}>{student.username}</td>
                  <td style={styles.tableData}>{student.email}</td>
                  <td style={styles.tableData}>{student.first_name}</td>
                  <td style={styles.tableData}>{student.last_name}</td>
                  <td style={styles.tableData}>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                  <td style={styles.tableData}>{student.address}</td>
                  <td style={styles.tableData}>{student.phone_number}</td>
                  <td style={styles.tableData}>{student.department}</td>
                  <td style={styles.tableData}>{student.year_of_study}</td>
                  <td style={styles.tableData}>{student.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    padding: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Align buttons horizontally
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    overflow: 'auto',
    maxWidth: '90%',
    margin: '20px auto',
  },
  tableHeader: {
    background: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#ffffff',
  },
  tableData: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    borderRight: '1px solid #ddd',
    height: 'auto',
    lineHeight: '1.6',
  },
};

export default StudentDetail;
