import React from 'react';

const AddStudentForm = ({ onSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch('/api/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      // Handle success or redirect as needed
      const data = await response.json();
      console.log('Student added successfully:', data);

      // Example: Redirect to student list after successful addition
      window.location.href = '/students'; // Uncomment to redirect
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="login-form" style={styles.formContainer}>
      <h2 style={styles.formHeading}>Enter the student details here.</h2>
      <form id="add-student-form" onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="student_id" style={styles.label}>Roll no:</label>
            <input type="text" id="student_id" name="student_id" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="username" style={styles.label}>Username:</label>
            <input type="text" id="username" name="username" required style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" name="password" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input type="email" id="email" name="email" required style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="first_name" style={styles.label}>First Name:</label>
            <input type="text" id="first_name" name="first_name" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="last_name" style={styles.label}>Last Name:</label>
            <input type="text" id="last_name" name="last_name" required style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="date_of_birth" style={styles.label}>Date of Birth:</label>
            <input type="date" id="date_of_birth" name="date_of_birth" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="address" style={styles.label}>Address:</label>
            <input type="text" id="address" name="address" required style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="phone_number" style={styles.label}>Phone Number:</label>
            <input type="tel" id="phone_number" name="phone_number" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="department" style={styles.label}>Department:</label>
            <input type="text" id="department" name="department" required style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formItem}>
            <label htmlFor="year_of_study" style={styles.label}>Year of Study:</label>
            <input type="number" id="year_of_study" name="year_of_study" required style={styles.input} />
          </div>
          <div style={styles.formItem}>
            <label htmlFor="section" style={styles.label}>Section:</label>
            <input type="text" id="section" name="section" required style={styles.input} />
          </div>
        </div>
        <button type="submit" style={styles.button}>Add Student</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: '100%',
    maxWidth: '700px',
    padding: '30px',
    backgroundColor: 'lavender',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    position: 'relative',
    left: '-200px', // Adjust as needed
    margin: '20px auto', // Adjust as needed
    boxSizing: 'border-box',
  },
  formHeading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  formItem: {
    flex: '0 0 48%',
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #addfff',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default AddStudentForm;
