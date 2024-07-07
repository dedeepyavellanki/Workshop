import React from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { workshopManagementLoginThunk } from '../../redux/slice/workshopManagamentSlice';
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false);
    let { loginUserStatus, currentUser, errorOccured, errMsg } = useSelector(state => state.workshopManagementLoginReducer)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const login = async (user) => {
        console.log(user)
        dispatch(workshopManagementLoginThunk(user))
    }
    useEffect(() => {

        if (loginUserStatus === true) {
            navigate('/workshop')
        }
    }, [loginUserStatus])
    return (
        <div className="signinmain mt-5 mx-auto">

            <form className="mx-auto p-4 pt-3 bg-light formmain rounded" onSubmit={handleSubmit(login)}>
                <div className="adid m-2 p-3 ">

                    <input type="text" id="adid" className="form-control w-75 mx-auto" placeholder='adminId'{...register("adminId", { required: true })} />

                </div>
                <div className="password m-2 p-3">
                    <div className="position-relative  d-flex mx-auto w-75 pass-wrapper">
                        <input type={showPassword ? 'text' : 'password'} id="pass" className="form-control w-100" placeholder='password'{...register("password", { required: true })} />
                        <i onClick={togglePasswordVisibility} className="flex justify-around items-center">
                            {showPassword ? 'Yes' : 'No'}
                        </i>

                    </div>
                    {errors.password?.type === "required" &&
                        (<p className="text-danger">Required</p>)}

                </div>
                <button className="btn button-reg  mx-auto d-block" style={{ backgroundColor: "var(--main-yellow)" }}>Login</button>
            </form>

        </div>
    )
}

export default Login
