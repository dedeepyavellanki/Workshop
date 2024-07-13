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
    let navigate = useNavigate();
    let { currentUser } = useSelector(state => state.workshopManagementLoginReducer);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.dateOfCreation = new Date();
        data.dateOfModification = new Date();
        data.adminId = currentUser.adminID;
        data.sdpId = Date.now();

        // Handle file upload
        const fileInput = document.getElementById('certificate');
        const formData = new FormData();
        formData.append('file', fileInput.files[0], `sdp-${data.sdpId}.jpeg`);

        try {
            const fileUploadRes = await axiosWithToken.post('http://localhost:5000/file-api/upload-certificate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (fileUploadRes.data.file) {
                data.filePath = fileUploadRes.data.filePath;

                // Proceed with the rest of the form data submission
                let res = await axiosWithToken.post('http://localhost:5000/admin-api/sdpdata', data);
                if (res.data.message === 'Data Uploaded') {
                    alert('Upload Successful!');
                    navigate('/Dashboard');
                } else {
                    alert(res.data.message);
                }
            } else {
                alert('File uploaded successfully');
            }
        } catch (error) {
            alert('File uploaded successfully');
        }
    };

    return (
        <div>
            <div className="m-3">
                <h2 className="d-block m-4 mx-auto text-center">Upload Data</h2>
            </div>
            <div className="upsmain mt-5 mx-auto">
                <form className="bg-light sdpForm mx-auto p-4 pt-3 rounded" onSubmit={handleSubmit(onSubmit)}>
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
                        <label htmlFor="topic">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            {...register('topic', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.topic && <span className="error">Topic is required</span>}
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            {...register('researcherName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.researcherName && <span className="error text-danger">Researcher is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
                            {...register('topicName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.topicName && <span className="error text-danger">Topic is required</span>}
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            {...register('researcherName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.researcherName && <span className="error text-danger">Researcher is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
                            {...register('topicName', { required: true })}
                            className="form-control w-100"
                        />
                        {errors.topicName && <span className="error text-danger">Topic is required</span>}
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                        <label htmlFor="researcher-name">Researcher Name</label>
                        <input
                            type="text"
                            id="researcher-name"
                            className="form-control w-100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic-name">Topic Name</label>
                        <input
                            type="text"
                            id="topic-name"
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
                            <label className="input-group-text" htmlFor="broacher">Upload</label>
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
                            <label className="input-group-text" htmlFor="letter">Upload</label>
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
                            <label className="input-group-text" htmlFor="schedule">Upload</label>
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
                            <label className="input-group-text" htmlFor="profiles">Upload</label>
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
                            <label className="input-group-text" htmlFor="certificate">Upload</label>
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
                            <label className="input-group-text" htmlFor="forms">Upload</label>
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
                            <label className="input-group-text" htmlFor="sheets">Upload</label>
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
                            <label className="input-group-text" htmlFor="report">Upload</label>
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
                            <label className="input-group-text" htmlFor="summary">Upload</label>
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
                            <label className="input-group-text" htmlFor="feedback">Upload</label>
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
                            <label className="input-group-text" htmlFor="photos">Upload</label>
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
                            <label className="input-group-text" htmlFor="certificate">Upload</label>
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
