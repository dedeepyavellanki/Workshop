
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const sampleWorkshops = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Learn the basics of React.js and build your first application.',
    date: '2024-07-01',
    location: 'Online',
    details: 'In this workshop, you will learn about components, state, and props...'
  },
  {
    id: 2,
    title: 'Advanced React',
    description: 'Dive deeper into React.js and explore advanced concepts.',
    date: '2024-07-15',
    location: 'New York, NY',
    details: 'This workshop covers advanced topics such as hooks, context, and performance...'
  },
  {
    id: 3,
    title: 'Full Stack Development',
    description: 'Become a full stack developer by learning React, Node.js, and databases.',
    date: '2024-08-01',
    location: 'San Francisco, CA',
    details: 'Learn how to build a complete web application with front-end and back-end technologies...'
  }
];

function Dashboard() {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/admin/dashboard/${id}`);
  };

  return (
    <div className="dashboard">
      <h1>Workshop Dashboard</h1>
      <div className="card-container">
        {sampleWorkshops.map(workshop => (
          <div key={workshop.id} className="card">
            <h2>{workshop.title}</h2>
            <p>{workshop.description}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p><strong>Location:</strong> {workshop.location}</p>
            <button onClick={() => handleViewDetails(workshop.id)}>View</button>
          </div>
        ))}
            <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
