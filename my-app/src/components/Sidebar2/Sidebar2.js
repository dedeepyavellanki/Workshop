import React from 'react'
import { NavLink } from 'react-router-dom';
import './Sidebar2.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar2({ isOpen, toggleSidebar }) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <div className="close-icon" onClick={toggleSidebar}>
                    <FaTimes />
                </div>
            )}
            <nav>
                <ul>
                    <li>
                    {/* <NavLink
                            to="admin/all-faculty"
                            end
                            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
                        >
                            Faculty
                        </NavLink> */}
                    </li>
                    <li>
                        <NavLink
                            to="admin/view-all-workshops"
                            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
                        >
                            All Workshop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="admin/upload-new-workshop"
                            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
                        >
                            UPLOAD Workshop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="admin/view-all-summary"
                            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
                        >
                            Summary
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button className="profile-button">
                <NavLink to="admin/profile" className="nav-link">Profile</NavLink>
            </button>
        </div>
    )
}

export default Sidebar2;
