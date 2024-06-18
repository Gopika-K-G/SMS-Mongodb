import React, { useState } from 'react';

const ViewMarks = () => {
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState('');

  const fetchMarks = async () => {
    try {
      const response = await fetch(`/api/marks/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setMarks(data);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch marks. Please try again.');
      }
    } catch (error) {
      setError('Failed to fetch marks. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMarks();
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
        maxWidth: '800px',  // Increased width for better table display
        padding: '40px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Enter Student Roll Number</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <input
            type="text"
            placeholder="Student Roll Number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
          />
          <button type="submit" style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>Fetch Marks</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
        {marks && (
          <div style={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
            <h2>Marks Details</h2>
            {marks.semesters.map((semester, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Semester {semester.semesterNumber}</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>Course ID</th>
                      <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>Marks Obtained</th>
                      <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.subjects.map((subject, subjectIndex) => (
                      <tr key={subjectIndex}>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{subject.course_id}</td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{subject.marks_obtained}</td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{subject.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMarks;
