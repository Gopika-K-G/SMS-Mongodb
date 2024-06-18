import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Ensure correct path to your CSS file

const Home = () => {
  const [sectionContent, setSectionContent] = useState({
    title: 'Home',
    content: 'Welcome to the Student Management System of our institution. Our system is designed to streamline academic and administrative processes, making it easier for students and faculty to manage their activities efficiently.',
  });

  const showSection = (section) => {
    console.log('Clicked section:', section);
    if (section === 'home') {
      setSectionContent({
        title: 'Home',
        content: 'Welcome to the Student Management System of our institution. Our system is designed to streamline academic and administrative processes, making it easier for students and faculty to manage their activities efficiently.',
      });
    } else if (section === 'about') {
      setSectionContent({
        title: 'About Us',
        content: 'Our institution is committed to providing top-quality education and services to our students. We aim to foster an environment that encourages academic excellence, innovation, and personal growth.',
      });
    } else if (section === 'contact') {
      setSectionContent({
        title: 'Contact Us',
        content: 'If you have any questions or need assistance, please feel free to reach out to us at contact@institution.edu or call us at (123) 456-7890.',
      });
    }
  };

  return (
    <div>
      <header>
        <h1>Student Management System</h1>
      </header>

      <nav>
        <a href="#" onClick={() => showSection('home')}>Home</a>
        <a href="#" onClick={() => showSection('about')}>About Us</a>
        <a href="#" onClick={() => showSection('contact')}>Contact Us</a>
        <div className="dropdown">
          <span className="dropbtn">Login</span>
          <div className="dropdown-content">
            <Link to="/admin">Admin</Link>
            <a href="#">Student</a>
          </div>
        </div>
      </nav>

      <div id="content" className="container">
        <h2>{sectionContent.title}</h2>
        <p>{sectionContent.content}</p>
      </div>

      <footer>
        <p>&copy; 2024 Student Management System</p>
      </footer>
    </div>
  );
};

export default Home;
