import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({ name: '', description: '', date: '' });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workshops');
      setWorkshops(response.data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/workshops', newWorkshop);
      setWorkshops([...workshops, response.data]);
      setNewWorkshop({ name: '', description: '', date: '' });
    } catch (error) {
      console.error('Error adding workshop:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workshops/${id}`);
      setWorkshops(workshops.filter(workshop => workshop._id !== id));
    } catch (error) {
      console.error('Error deleting workshop:', error);
    }
  };

  return (
    <div>
      <h2>Workshops</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newWorkshop.name}
          onChange={handleInputChange}
          placeholder="Workshop Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newWorkshop.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="date"
          value={newWorkshop.date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Workshop</button>
      </form>
      <ul>
        {workshops.map(workshop => (
          <li key={workshop._id}>
            {workshop.name} - {workshop.description} - {workshop.date}
            <button onClick={() => handleDelete(workshop._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workshops;
