import React, { useEffect, useState } from "react";
import { CardContent, Grid, Card, Button, CardActions, Table, TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import { useParams } from "react-router-dom";


const StudentClassSchedule = () => {
    const [studentSchedule, setStudentSchedule] = useState([]);
    const getParams = useParams();

    useEffect(() => {
        let userId = getParams._id;
        fetch("http://localhost:5001/course-schedule?userId=" + userId, {
            metod: "GET",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(res => setStudentSchedule(res))
    }, []);

    const dayArray = [
        { label: "Pazartesi", value: 1 },
        { label: "Salı", value: 2 },
        { label: "Çarşamba", value: 3 },
        { label: "Perşembe", value: 4 },
        { label: "Cuma", value: 5 },
        { label: "Cumartesi", value: 6 },
        { label: "Pazar", value: 7 },
    ];

    const dayCompare = (dayValue) => {
        let res = []
        if (studentSchedule.length) {
            res = studentSchedule.filter(item => Number(item.lessonDay.value) === Number(dayValue))
        }
        return res
    };
    return (
        <Grid container spacing={2}>
            {
                studentSchedule.length && dayArray.map((day, i) => {
                    let currentDayLessons = dayCompare(day.value)
                    return (
                        <Grid item xs={12} md={3} key={i}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid item xs={12}>
                                        <Table  sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                            <Button>{day.label}</Button>    
                                                <TableRow>
                                                    <TableCell>Ders Adı</TableCell>
                                                    <TableCell>Ders Saati</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentDayLessons.length && currentDayLessons.map((daylesson, e) => (
                                                    <TableRow
                                                       key={e}
                                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell>{daylesson.lesson[0]}</TableCell>
                                                            <TableCell>{daylesson.startTime}</TableCell>
                                                            <TableCell>{daylesson.finishTime}</TableCell>
                                                        

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};
export default StudentClassSchedule;