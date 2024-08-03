import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Upload.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Upload() {
    const token = localStorage.getItem('token');
    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.workshopManagement);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const generateWorkshopId = () => Math.floor(Math.random() * 1000000); // Adjust range as needed

    const onSubmit = async (data) => {
        data.dateOfCreation = new Date();
        data.dateOfModification = new Date();
        data.adminId = currentUser.adminID;
        data.sdpId = Date.now(); // or use another method if needed
        data.workshopId = generateWorkshopId();

        try {
            // Directly submit form data
            let res = await axiosWithToken.post('http://localhost:4000/admin-api/workshopdata', data);
            if (res.data.message === 'Data Uploaded') {
                alert('Upload Successful!');
                navigate('/admin/Dashboard');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert('Error occurred during data submission');
        }
    };

    return (
        <div style={{backgroundImage:'https://help.nextcloud.com/uploads/default/original/3X/2/3/23cbcf8f59cdfda285a3a922b7677c0fa54f795b.jpeg'}}>
            <div className="m-3 p-3 d-block text-center">
                <h3 ><strong>Upload Data</strong></h3>
            </div>
            <div className="upsmain mt-5 mx-auto" >
                <form className="bg-purple sdpForm mx-auto p-4 pt-3 rounded" style={{backgroundCImage:'https://help.nextcloud.com/uploads/default/original/3X/2/3/23cbcf8f59cdfda285a3a922b7677c0fa54f795b.jpeg'}} onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
    <label htmlFor="title">Title</label>
    <input
        type="text"
        id="title"
        {...register('title', { required: true })}
        className="form-control w-100"
    />
    {errors.title && <span className="error">Title is required</span>}
</div>

<div className="form-group">
    <label htmlFor="location">Location</label>
    <input
        type="text"
        id="location"
        {...register('location', { required: true })}
        className="form-control w-100"
    />
    {errors.location && <span className="error">Location is required</span>}
</div>

                    <div className="form-group">
                        <label htmlFor="start-date">Start Date</label>
                        <input
                            type="date"
                            id="start-date"
                            {...register('startDate', { required: true })}
                            className="form-control w-50"
                        />
                        {errors.startDate && <span className="error">Start Date is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="end-date">End Date</label>
                        <input
                            type="date"
                            id="end-date"
                            {...register('endDate', { required: true })}
                            className="form-control w-50"
                        />
                        {errors.endDate && <span className="error">End Date is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="organized-by">Organized By</label>
                        <input
                            type="text"
                            id="organized-by"
                            {...register('organizedBy', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.organizedBy && <span className="error">Organizer is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            {...register('researcherName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.researcherName && <span className="error text-danger">Researcher is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            {...register('topicDelivered', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.topicDelivered && <span className="error text-danger">Topic Delivered is required</span>}
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            {...register('date', { required: true })}
                            className="form-control w-50 mr-3"
                        />
                        {errors.date && <span className="error text-danger">Date is required</span>}
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                    {...register('timePeriod', { required: true })}
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                    {...register('timePeriod', { required: true })}
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                        {errors.timePeriod && <span className="error text-danger">Time period is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            {...register('researcherName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.researcherName && <span className="error text-danger">Researcher is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            {...register('topicDelivered', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.topicDelivered && <span className="error text-danger">Topic Delivered is required</span>}
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            {...register('date', { required: true })}
                            className="form-control w-50 mr-3"
                        />
                        {errors.date && <span className="error text-danger">Date is required</span>}
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                    {...register('timePeriod', { required: true })}
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                    {...register('timePeriod', { required: true })}
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                        {errors.timePeriod && <span className="error text-danger">Time period is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="researcher-name">Resource Person Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-delivered">Topic Delivered</label>
                        <input
                            type="text"
                            id="topic-delivered"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group align-items-center">
                        <label htmlFor="date" className="mr-3">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-50 mr-3"
                        />
                        <div className="form-group mt-3">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="am"
                                    value="AM"
                                />
                                <label className="form-check-label" htmlFor="am">AM</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="pm"
                                    value="PM"
                                />
                                <label className="form-check-label" htmlFor="pm">PM</label>
                            </div>
                        </div>
                    </div>
                    {<div className="form-group">
                        <label htmlFor="broacher">Broacher (jpeg)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="broacher"
                                accept="image/jpeg"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="letter">Management Permission Letter (jpeg)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="letter"
                                accept="image/jpeg"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="schedule">Schedule (jpeg)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="schedule"
                                accept="image/jpeg"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="profiles">Researcher Persons Profiles (PDF)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="profiles"
                                accept="pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="list">List Of Participants (PDF/EXCEL)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="list"
                                accept="excel/pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="forms">Registration Forms (PDF)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="forms"
                                accept="pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="sheets">Attendance Sheets (PDF/EXCEL)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="sheets"
                                accept="excel/pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="report">Workshop Report(PDF/DOC)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="report"
                                accept="doc/pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="summary">Expenditure Summary (PDF)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="summary"
                                accept="pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="feedback">Feedback Forms (PDF)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="feedback"
                                accept="pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="photos">Photos (PDF)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="photos"
                                accept="pdf"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    {<div className="form-group">
                        <label htmlFor="certificate">Certificate (jpeg)</label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                id="certificate"
                                accept="image/jpeg"
                                {...register('file')}
                                className="form-control w-40"
                            />
                        </div>
                    </div> }
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Upload;