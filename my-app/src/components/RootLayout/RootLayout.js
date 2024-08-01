import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar2 from '../Sidebar2/Sidebar2';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { resetState } from '../../redux/slice/workshopManagamentSlice';
import './RootLayout.css';

function RootLayout() {
  const { loginUserStatus, currentUser } = useSelector((state) => state.user) || { loginUserStatus: false, currentUser: null };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/login');
  };

  useEffect(() => {
    if (loginUserStatus === false) {
      navigate('/login');
    } else if (currentUser && currentUser.userType === 'admin') {
      navigate('/admin');
    } 
  }, [loginUserStatus, currentUser, navigate]);

  return (
    <div>
      {loginUserStatus === false ? (
        <Outlet />
      ) : (
        <div>
          <div className="top-bar">
            <div className="open-sidebar-button toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </div>
            <div className='text-center mt-2'>
                <h1>
                    Workshop Management Module
                </h1>
                </div>
            <button className="logout-button" onClick={signOut}>
              <FaSignOutAlt />
              <span> </span>Logout
            </button>
          </div>
          <Sidebar2 isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default RootLayout;
