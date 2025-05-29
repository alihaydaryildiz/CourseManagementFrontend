import React, { useEffect } from 'react';
import {useNavigate } from "react-router-dom";

const AdminPages = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            navigate("/")
        }
    })

    return (
        <div>
            Admin Paneli
        </div>
    );
}






export default AdminPages;