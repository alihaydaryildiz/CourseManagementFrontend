import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Card, CardActions, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";


const TeacherClassroom = () => {
    const [teacherClassroom, setTeacherClassroom] = useState([]);
    const navigate = useNavigate();
    const getParams = useParams();
    console.log(getParams)
    const _id = localStorage.getItem('userId');

    useEffect(() => {
        let url = "http://localhost:5001/user-list-all?classroomId=" + getParams.id+"&role=Student"
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
                        </Card>
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Öğrenci Adı</TableCell>
                                <TableCell>Öğrenci Soyadı</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           
                            {
                                teacherClassroom?.length && teacherClassroom.map((item, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.lastName}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>    
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
};
export default TeacherClassroom;
