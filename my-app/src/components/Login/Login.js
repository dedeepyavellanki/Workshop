import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { workshopManagementLoginThunk } from '../../redux/slice/workshopManagamentSlice';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { loginUserStatus = false, currentUser, errorOccured, errMsg } = useSelector((state) => state.workshopManagementLoginReducer) || {};

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (user) => {
        console.log(user);
        dispatch(workshopManagementLoginThunk(user));
    };

    useEffect(() => {
        if (loginUserStatus) {
            navigate('/Admin');
        }
    }, [loginUserStatus, navigate]);

    return (
        <div className="login-container">
            <div className="card p-4 login-card">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit(login)}>
                    <div className="mb-3">
                        <label htmlFor="facultyId" className="form-label">Admin</label>
                        <input
                            type="text"
                            id="facultyId"
                            className="form-control"
                            placeholder="Faculty ID"
                            {...register("facultyId", { required: true })}
                        />
                        {errors.facultyId && <div className="text-danger">Admin ID is required</div>}
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        <span onClick={togglePasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y me-2" style={{ cursor: 'pointer' }}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        {errors.password && <div className="text-danger">Password is required</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    {errMsg && <div className="text-danger text-center mt-3">{errMsg}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
