import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function DashboardId() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState({});

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/admin-api/workshopdata/${id}`);
        console.log('API Response:', response.data); // Debugging
        setWorkshop(response.data.payload || {}); // Use an empty object as fallback
      } catch (err) {
        console.error('Fetch Error:', err); // Debugging
      }
    };

    fetchWorkshop();
  }, [id]);

  return (
    <div className="workshop-details">
      <h1>{workshop.title || 'Title not available'}</h1>
      <p><strong>Date:</strong> {workshop.date}</p>
      <p><strong>Start Date:</strong> {workshop.startDate}</p>
      <p><strong>End Date:</strong> {workshop.endDate }</p>
      <p><strong>Location:</strong> {workshop.location}</p>
      <p><strong>Organized By:</strong> {workshop.organizedBy}</p>
    </div>
  );
}

export default DashboardId;
