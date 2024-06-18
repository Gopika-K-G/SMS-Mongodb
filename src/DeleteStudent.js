import React, { useState } from 'react';

const DeleteStudent = () => {
  const [rollNo, setRollNo] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    if (window.confirm(`Are you sure you want to delete student with roll number ${rollNo}?`)) {
      try {
        const response = await fetch(`/api/delete-student/${rollNo}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        setConfirmation(true); // Set confirmation flag to true after successful deletion
      } catch (error) {
        console.error('Error deleting student:', error);
        // Handle error state or show a message to the user
      }
    }
  };

  if (confirmation) {
    // Redirect to student list or homepage after successful deletion
    window.location.href = '/students'; // Update with your desired redirect location
    return null; // Optionally return null or a loading spinner while redirecting
  }

  return (
    <div style={styles.container}>
      <h2>Delete Student</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleDeleteClick} style={styles.form}>
          <label style={styles.label}>
            Enter Roll No to Delete:
            <input
              type="text"
              value={rollNo}
              onChange={handleRollNoChange}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Delete</button>
        </form>
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
  formContainer: {
    maxWidth: '50%',
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default DeleteStudent;
