import React, { useState } from 'react';
import FileSaver from 'file-saver';
import { FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import './Summary.css';

function Summary() {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const allREV = [
        { year: '2018-2019', noOfWorkshops: 5, noOfStudentsAttended: 100, noOfFacultyAttended: 10 },
        { year: '2020-2021', noOfWorkshops: 3, noOfStudentsAttended: 80, noOfFacultyAttended: 8 },
        { year: '2022-2023', noOfWorkshops: 4, noOfStudentsAttended: 90, noOfFacultyAttended: 12 },
    ];

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

    const sortedREV = React.useMemo(() => {
        let sortableItems = [...allREV];
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
    }, [allREV, sortConfig]);

    const generateCSV = () => {
        const headers = ['S.No', 'Year', 'No. of Workshops', 'No. of Students Attended', 'No. of Faculty Attended'];
        const rows = sortedREV.map((rev, index) => [
            index + 1,
            rev.year,
            rev.noOfWorkshops,
            rev.noOfStudentsAttended,
            rev.noOfFacultyAttended,
        ]);

        let csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        FileSaver.saveAs(blob, 'review_records.csv');
    };

    return (
        <div className="container mt-4">
            <div className="m-3 p-3 d-block text-center">
                <h3><strong>Year Wise Surmmary</strong></h3>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn filbut" onClick={generateCSV}>
                    <FaDownload /><span> </span>Download CSV
                </button>
            </div>
            <div className="table-responsive text-center">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th onClick={() => handleSort('year')}>
                                Year {sortConfig.key === 'year' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                                {sortConfig.key !== 'year' && (
                                    <FaArrowUp className="transparent-arrow" />
                                )}
                            </th>
                            <th onClick={() => handleSort('noOfWorkshops')}>
                                No. of Workshops {sortConfig.key === 'noOfWorkshops' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                                {sortConfig.key !== 'noOfWorkshops' && (
                                    <FaArrowUp className="transparent-arrow" />
                                )}
                            </th>
                            <th onClick={() => handleSort('noOfStudentsAttended')}>
                                No. of Students Attended {sortConfig.key === 'noOfStudentsAttended' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                                {sortConfig.key !== 'noOfStudentsAttended' && (
                                    <FaArrowUp className="transparent-arrow" />
                                )}
                            </th>
                            <th onClick={() => handleSort('noOfFacultyAttended')}>
                                No. of Faculty Attended {sortConfig.key === 'noOfFacultyAttended' && (sortConfig.direction === 'ascending' ? <FaArrowUp /> : sortConfig.direction === 'descending' ? <FaArrowDown /> : <FaArrowUp className="transparent-arrow" />)}
                                {sortConfig.key !== 'noOfFacultyAttended' && (
                                    <FaArrowUp className="transparent-arrow" />
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedREV.map((rev, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{rev.year}</td>
                                <td>{rev.noOfWorkshops}</td>
                                <td>{rev.noOfStudentsAttended}</td>
                                <td>{rev.noOfFacultyAttended}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Summary;