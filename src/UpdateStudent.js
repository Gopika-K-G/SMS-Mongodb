import React, { useState } from 'react';

const UpdateStudent = () => {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    student_id: '',
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    address: '',
    phone_number: '',
    department: '',
    year_of_study: '',
    section: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to manage successful update

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/students/${rollNo}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const studentData = await response.json();

      // Check if studentData is an array and non-empty
      if (!Array.isArray(studentData) || studentData.length === 0) {
        throw new Error('Student data is empty');
      }

      // Extract the first student object from the array
      const studentInfo = studentData[0];

      setStudent(studentInfo); // Set fetched student data to state
      // Update formData state with fetched student data
      setFormData({
        student_id: studentInfo.student_id,
        username: studentInfo.username,
        password: studentInfo.password,
        email: studentInfo.email,
        first_name: studentInfo.first_name,
        last_name: studentInfo.last_name,
        date_of_birth: formatDate(studentInfo.date_of_birth), // Ensure format is compatible with <input type="date">
        address: studentInfo.address,
        phone_number: studentInfo.phone_number,
        department: studentInfo.department,
        year_of_study: studentInfo.year_of_study.toString(), // Convert to string if necessary
        section: studentInfo.section,
      });
    } catch (error) {
      console.error('Error fetching student:', error);
      setStudent(null); // Clear student data on error
      // Optionally show an alert or set an error state for user feedback
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/update-student/${rollNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      setUpdateSuccess(true); // Set update success flag to true
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle error state or show a message to the user
    }
  };

  const formatDate = (dateString) => {
    // Assuming dateString is in ISO format (yyyy-mm-dd)
    const date = new Date(dateString);
    // Format the date for input type "date" (yyyy-mm-dd)
    return date.toISOString().split('T')[0];
  };

  if (updateSuccess) {
    window.location.href = '/students'; // Redirect to home or student list page after successful update
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return (
    <div style={styles.container}>
      <h2>Update Student</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <label>
          Roll No:
          <input
            type="text"
            name="rollNo"
            value={rollNo}
            onChange={handleRollNoChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Fetch Student</button>
      </form>
      {student && (
        <div style={styles.formContainer}>
          <form onSubmit={handleUpdateClick} style={styles.form}>
            <label>
              Student ID:
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Year of Study:
              <input
                type="number"
                name="year_of_study"
                value={formData.year_of_study}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label>
              Section:
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <button type="submit" style={styles.button}>Update Student</button>
          </form>
        </div>
      )}
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%', // Adjusted maxWidth to 80% for a wider form container
    margin: '20px auto',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px', // Added padding for better spacing
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    marginTop: '10px',
  },
};

export default UpdateStudent;
