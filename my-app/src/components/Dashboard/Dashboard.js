import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch workshop data
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin-api/all-workshops');
        setWorkshops(response.data.payload); // Assuming the payload contains the workshop data
      } catch (error) {
        console.error('Error fetching workshop data:', error);
      }
    };

    fetchWorkshops();
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleViewDetails = (id) => {
    navigate(`/admin/Dashboard/${id}`);
  };

  return (
    <div className="dashboard">
      <h1>Workshop Dashboard</h1>
      <div className="card-container">
        {workshops.map(workshop => (
          <div key={workshop.id} className="d-card">
            <h2>{workshop.title}</h2>
            <p>{workshop.description}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p><strong>Location:</strong> {workshop.location}</p>
            <button className="btn custom-button1 mr-4 align-center" onClick={() => handleViewDetails(workshop.workshopId)}>View</button>
          </div>
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
