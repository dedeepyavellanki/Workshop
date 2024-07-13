import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import { FaArrowUp, FaArrowDown, FaCircle, FaDownload, FaFilter, FaTimes } from 'react-icons/fa';
import './Workshops.css';

function Workshops() {
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [workshopData, setWorkshopData] = useState({});
  const [errFetch, setErrF] = useState('');
  const [selectedColumns, setSelectedColumns] = useState({
    sno: true,
    title: true,
    topic: true,
    startDate: true,
    endDate: true,
    organizedBy: true,
    workshopName: true,
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showFilters, setShowFilters] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllWorkshops();
    getWorkshopData();
  }, []);

  function getAllWorkshops() {
    const sampleWorkshops = [
      {
        title: 'Workshop on React',
        topic: 'React Basics',
        startDate: '2023-05-01',
        endDate: '2023-05-02',
        organizedBy: 'ABC University',
        workshopId: '1',
      },
      {
        title: 'Workshop on Advanced React',
        topic: 'Advanced React',
        startDate: '2023-06-01',
        endDate: '2023-06-03',
        organizedBy: 'XYZ University',
        workshopId: '2',
      },
      {
        title: 'Full Stack Development',
        topic: 'MERN Stack',
        startDate: '2023-11-01',
        endDate: '2024-06-03',
        organizedBy: 'KLU University',
        workshopId: '3',
      },
      // Add more sample data as needed
    ];
    setAllWorkshops(sampleWorkshops);
  }

  function getWorkshopData() {
    const sampleWorkshops = [
      { workshopId: '1', username: 'John Doe' },
      { workshopId: '2', username: 'Kelly Smith' },
      { workshopId: '3', username: 'David Johns' },
      // Add more sample data as needed
    ];
    const workshopMap = sampleWorkshops.reduce((map, workshop) => {
      map[workshop.workshopId] = workshop.username;
      return map;
    }, {});
    setWorkshopData(workshopMap);
  }

  const handleColumnChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColumns((prevColumns) => ({
      ...prevColumns,
      [name]: checked,
    }));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({ key, direction });
  };

  const handleFilterDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'filterStartDate') {
      setFilterStartDate(value);
    } else if (name === 'filterEndDate') {
      setFilterEndDate(value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkshops = React.useMemo(() => {
    return allWorkshops.filter((workshop) => {
      const workshopStartDate = new Date(workshop.startDate);
      const workshopEndDate = new Date(workshop.endDate);
      const filterStart = filterStartDate ? new Date(filterStartDate) : null;
      const filterEnd = filterEndDate ? new Date(filterEndDate) : null;

      const matchesSearchTerm = searchTerm
        ? workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.organizedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (workshopData[workshop.workshopId] && workshopData[workshop.workshopId].toLowerCase().includes(searchTerm.toLowerCase()))
        : true;

      return matchesSearchTerm && (!filterStart || workshopStartDate >= filterStart) && (!filterEnd || workshopEndDate <= filterEnd);
    });
  }, [allWorkshops, filterStartDate, filterEndDate, searchTerm, workshopData]);

  const sortedWorkshops = React.useMemo(() => {
    let sortableItems = [...filteredWorkshops];
    if (sortConfig.key !== null && sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredWorkshops, sortConfig]);

  const workshopsWithWorkshopNames = sortedWorkshops.map(workshop => ({
    ...workshop,
    workshopName: workshopData[workshop.workshopId] || 'Unknown',
  }));

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  const generateCSV = () => {
    const headers = ['S.No', 'Title', 'Resource Person Name', 'Start Date', 'End Date', 'Organized By'];
    const rows = workshopsWithWorkshopNames.map((workshop, index) => [
      index + 1,
      workshop.title,
      workshop.startDate,
      workshop.resourcepersonName,
      workshop.endDate,
      workshop.organizedBy,
    ]);

    let csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'workshop_records.csv');
  };

  return (
    <div className="container mt-4">
      <div className="m-3 p-3 d-block text-center">
        <h3><strong>Workshop Data</strong></h3>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn filbut" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <div><FaTimes /><span> </span>Hide Filters</div> : <div><FaFilter /><span> </span>Show Filters</div>}
        </button>
        <button className="btn filbut" onClick={generateCSV}>
          <FaDownload /><span> </span>Download CSV
        </button>
      </div>
      {showFilters && (
        <div className="mb-3 w-60">
          <div className="form-group w-40">
            <label htmlFor="searchTerm">Search:</label>
            <input
              type="text"
              className="form-control w-100"
              id="searchTerm"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {Object.keys(selectedColumns).map((col) => (
            <div className="form-check form-check-inline" key={col}>
              <input
                className="form-check-input"
                type="checkbox"
                name={col}
                checked={selectedColumns[col]}
                onChange={handleColumnChange}
              />
              <label className="form-check-label">{col}</label>
            </div>
          ))}
          <div className="form-group w-40">
            <label htmlFor="filterStartDate">Start Date:</label>
            <input
              type="date"
              className="form-control w-40 datebar"
              id="filterStartDate"
              name="filterStartDate"
              value={filterStartDate}
              onChange={handleFilterDateChange}
            />
          </div>
          <div className="form-group w-40">
            <label htmlFor="filterEndDate">End Date:</label>
            <input
              type="date"
              className="form-control w-40 datebar"
              id="filterEndDate"
              name="filterEndDate"
              value={filterEndDate}
              onChange={handleFilterDateChange}
            />
          </div>
        </div>
      )}
      {errFetch && <div className="alert alert-danger">{errFetch}</div>}
      <div className="table-responsive text-center">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              {selectedColumns.sno && <th>S.No</th>}
              {selectedColumns.workshopName && (
                <th onClick={() => handleSort('workshopName')}>
                  Workshop Name {sortConfig.key === 'workshopName' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'workshopName' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
              {selectedColumns.title && (
                <th onClick={() => handleSort('title')}>
                  Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'title' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
              {selectedColumns.topic && (
                <th onClick={() => handleSort('topic')}>
                  Topic {sortConfig.key === 'topic' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'topic' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
              {selectedColumns.startDate && (
                <th onClick={() => handleSort('startDate')}>
                  Start Date {sortConfig.key === 'startDate' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'startDate' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
              {selectedColumns.endDate && (
                <th onClick={() => handleSort('endDate')}>
                  End Date {sortConfig.key === 'endDate' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'endDate' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
              {selectedColumns.organizedBy && (
                <th onClick={() => handleSort('organizedBy')}>
                  Organized By {sortConfig.key === 'organizedBy' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                  {sortConfig.key !== 'organizedBy' && (
                    <FaArrowUp className="transparent-arrow" />
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {workshopsWithWorkshopNames.map((workshop, index) => (
              <tr key={index}>
                {selectedColumns.sno && <td>{index + 1}</td>}
                {selectedColumns.workshopName && <td>{workshop.workshopName}</td>}
                {selectedColumns.title && <td>{workshop.title}</td>}
                {selectedColumns.topic && <td>{workshop.topic}</td>}
                {selectedColumns.startDate && <td>{formatDate(workshop.startDate)}</td>}
                {selectedColumns.endDate && <td>{formatDate(workshop.endDate)}</td>}
                {selectedColumns.organizedBy && <td>{workshop.organizedBy}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workshops;
