import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './ManagePassword.css'

function ManagePassword() {
    const token = localStorage.getItem('token');
    let {register,handleSubmit,formState:{errors}}=useForm()
    let { loginUserStatus, currentUser } = useSelector(state => state.workshopManagement)
    let [err,setErr] = useState('')
    let [suc,setSuc] = useState('')
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const axiosWithToken = axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })
    let navigate = useNavigate();

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const togglePasswordVisibility3 = () => {
        setShowPassword3(!showPassword3);
    };

    async function changePassword(userObj){
        console.log(userObj)
        if(userObj.newPassword != userObj.confirmnewPassword){
            setErr('New Password and Confirm do not match')
        }
        else{
            userObj.facultyId = currentUser.facultyId
                let res;
                res = await axiosWithToken.post('http://localhost:5000/admin-api/change-password',userObj)
                if(res.data.message==='Password updated successfully'){
                    setSuc('Password updated successfully')
                    navigate('/admin')
                }
                else{
                    // console.log(res.data.message)
                    setErr(res.data.message)
                }
            }
            
        }

    function goBack(){
            navigate('/admin/profile')
    }


  return (
    <div className='container'>
        <div classname='m-card'>
            <form onSubmit={handleSubmit(changePassword)}>
                <h1 className="text-center p-1">Manage Password</h1>
                <div>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword1 ? 'text' : 'password'} id='old' className='form-control w-100 mx-auto m-1' placeholder="Old Password" {...register('password',{required:true,minLength:8})} />
                <span onClick={togglePasswordVisibility1} className="position-absolute end-0 translate-middle-y mt-4 mr-5" style={{ cursor: 'pointer', padding: '3px' }}>
                            {showPassword1 ? <FaEye style={{ color: 'black' }} /> : <FaEyeSlash style={{ color: 'black' }} />}
                        </span>
            </div>
                {errors.password?.type==='required' && <p className='text-danger text-center'>Old password is required</p>}
                {errors.password?.type==="minLength" &&
            (<p className="text-danger text-center">Minimum Length: 8</p>)}
                </div>
                <div>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword2 ? 'text' : 'password'} id='new' className='form-control w-100 mx-auto m-1' placeholder="New Password" {...register('newPassword',{required:true,minLength:8})} />
                <span onClick={togglePasswordVisibility2} className="position-absolute end-0 translate-middle-y mt-4 mr-5" style={{ cursor: 'pointer', padding: '3px' }}>
                            {showPassword2 ? <FaEye style={{ color: 'black' }} /> : <FaEyeSlash style={{ color: 'black' }} />}
                        </span>
            </div>
                {errors.newPassword?.type==='required' && <p className='text-danger text-center'>New password is required</p>}
                {errors.newPassword?.type==="minLength" &&
            (<p className="text-danger text-center">Minimum Length: 8</p>)}
                </div>
                <div>
                <div className='position-relative  d-flex mx-auto w-50 pass-wrapper'>
                <input type={showPassword3 ? 'text' : 'password'} id='confirm' className='form-control w-100 mx-auto m-1' placeholder="Confirm New Password" {...register('confirmnewPassword',{required:true,minLength:8})} />
                <span onClick={togglePasswordVisibility3} className="position-absolute end-0 translate-middle-y mt-4 mr-5" style={{ cursor: 'pointer', padding: '3px' }}>
                            {showPassword3 ? <FaEye style={{ color: 'black' }} /> : <FaEyeSlash style={{ color: 'black' }} />}
                        </span>
            </div>
                {errors.confirmnewPassword?.type==='required' && <p className='text-danger text-center'>confirm your password</p>}
                {errors.confirmnewPassword?.type==="minLength" &&
            (<p className="text-danger text-center">Minimum Length: 8</p>)}
                </div>
                <div className="mx-auto">
                <button type='submit' className='btn submit-manage-button mx-auto m-3 d-block'>
                Update
                </button>
                </div>
            </form>
            {(
                err.length !== 0 &&
                <h1 className="lead text-center text-danger">{err}</h1>
            )}
            {(
                suc.length !== 0 &&
                <h1 className="lead text-center text-info">{suc}</h1>
            )}
        </div>
        <div className="ml-5">
            <button type='submit' onClick={goBack} className='btn back-manage-button'>
                Back
            </button>
        </div>
    </div>
  );
}

export default ManagePassword;
