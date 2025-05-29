import React, { useEffect, useState } from "react";
import { TableContainer, TableBody, TableCell, Table, TableHead, Paper, Grid, TableRow, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';


const TeacherCourseSchedule = () => {
    const [teacherClassroom, setTeacherClassroom] = useState([]);
    const getParams = useParams();
    const userId = localStorage.getItem("userId")
    const _id = localStorage.getItem('userId');
    const navigate = useNavigate();


    useEffect(() => {
        let url = "http://localhost:5001/user-list-all?_id=" + _id
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => (
            setTeacherClassroom(res))
        )
    }, [getParams.id])


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h3>Ders Programım</h3>
            </Grid>
            <Grid item xs={12}>
                {
                    teacherClassroom.length &&
                    teacherClassroom[0].classroom.map((item, i) => (
                        <Grid item xs={12} md={3}
                            key={i}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Sınıf/Şube
                                    </Typography>
                                    <Typography
                                        variant="h"
                                        component="div">
                                        {item.room + "/" + item.branch}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => navigate("/teacher/teacher-c-schedule/" + item.classroomId)} 
                                    size={"small"} 
                                    variant="contained" 
                                    color="secondary" 
                                    >Ders Programını Görüntüle</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }


            </Grid>
        </Grid>
    )
};
export default TeacherCourseSchedule;