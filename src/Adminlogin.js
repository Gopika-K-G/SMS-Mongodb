import React, { useState } from 'react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();

      if (data.success) {
        // Redirect to admin-home
        window.location.href = '/admin-home';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to login. Please try again later.');
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundImage: "url('https://img.freepik.com/free-photo/nobody-exterior-wall-page-empty_1258-257.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718409600&semt=ais_user')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        display: 'flex',
        width: '80%',
        maxWidth: '800px',
        height: '500px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        overflow: 'hidden',
      }}>
        <div style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundImage: "url('https://cdn1.iconfinder.com/data/icons/internet-technology-and-security-2/128/81-512.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {/* Left side content */}
        </div>
        <div style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: 'black' }}>ADMIN LOGIN</h1>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              style={{
                width: 'calc(100% - 22px)',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                width: 'calc(100% - 22px)',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              required
            />
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: 'rgb(37, 164, 214)',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
