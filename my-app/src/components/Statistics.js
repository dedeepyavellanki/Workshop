import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/api/statistics')
      .then(response => setStats(response.data))
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Number of Workshops: {stats.workshopCount}</p>
      <p>Number of Participants: {stats.participantCount}</p>
      {/* Add more statistics as needed */}
    </div>
  );
};

export default Statistics;
