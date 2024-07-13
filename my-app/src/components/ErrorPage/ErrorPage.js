import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';
import { MdOutlineErrorOutline } from "react-icons/md";

function ErrorPage() {
  const routingError = useRouteError();
  console.log(routingError);

  return (
    <div className="error-container d-flex align-items-center justify-content-center vh-100 bg-dark text-light">
      <div className="text-center p-5 shadow-lg rounded bg-light">
        <MdOutlineErrorOutline className='text-danger fs-1'/>
        <h1 className="display-4 text-danger">{routingError.status || 'Error'}</h1>
        <p className="text-danger">{routingError.data || 'An unexpected error occurred.'}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
