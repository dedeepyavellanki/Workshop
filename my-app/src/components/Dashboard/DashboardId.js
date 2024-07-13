import React from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';

const sampleWorkshops = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Learn the basics of React.js and build your first application.',
    date: '2024-07-01',
    location: 'Online',
    details: 'In this workshop, you will learn about components, state, and props...',
    image: '/assests/images/broucher.jpg',
     pdf: '/assests/pdf/Report.pdf',
    doc: '/assests/docs/List.docx',
    excel: '/assests/excel/Sheets.xlsx'
  },
  {
    id: 2,
    title: 'Advanced React',
    description: 'Dive deeper into React.js and explore advanced concepts.',
    date: '2024-07-15',
    location: 'New York, NY',
    details: 'This workshop covers advanced topics such as hooks, context, and performance...',
    image: '/assests/images/broucher.jpg',
     pdf: '/assests/pdf/Report.pdf',
    doc: '/assests/docs/List.docx',
    excel: '/assests/excel/Sheets.xlsx'
  },
  {
    id: 3,
    title: 'Full Stack Development',
    description: 'Become a full stack developer by learning React, Node.js, and databases.',
    date: '2024-08-01',
    location: 'San Francisco, CA',
    details: 'Learn how to build a complete web application with front-end and back-end technologies...',
    image: '/assests/images/broucher.jpg',
     pdf: '/assests/pdf/Report.pdf',
    doc: '/assests/docs/List.docx',
    excel: '/assests/excel/Sheets.xlsx'
   }
];

function DashboardId() {
  const { id } = useParams();
  const workshop = sampleWorkshops.find(ws => ws.id === parseInt(id, 10));

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  const openFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="workshop-details">
      <h1>{workshop.title}</h1>
      <p>{workshop.description}</p>
      <p><strong>Date:</strong> {workshop.date}</p>
      <p><strong>Location:</strong> {workshop.location}</p>
      <p><strong>Details:</strong> {workshop.details}</p>

      <div className="file-buttons mt-4">
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.image)}>Broucher</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.image)}>Permission Letter</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.image)}>Schedule</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.pdf)}>Resource Persons Profile</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.excel)}>List of Participants</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.pdf)}>Forms</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.excel)}>Attendance Sheets</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.doc)}>Report</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.excel)}>Expenditure Summary</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.pdf)}>Feedback Forms</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.pdf)}>Photos</button>
        </div>
        <div className="mb-4">
          <button className="btn custom-button mr-4" onClick={() => openFile(workshop.image)}>Certificate</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardId;
