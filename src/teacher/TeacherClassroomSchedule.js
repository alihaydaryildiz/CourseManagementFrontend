import React, { useState, useEffect } from "react";
import {Grid, Card, CardContent, Typography } from "@mui/material";
import {useParams } from 'react-router-dom';

const TeacherClassroomSchedule = () => {
    const [courseScheduleList, setCourseScheduleList] = useState([]);
    const getParams = useParams();
    const dayArray = [
        { label: "Pazartesi", value: 1 },
        { label: "Salı", value: 2 },
        { label: "Çarşamba", value: 3 },
        { label: "Perşembe", value: 4 },
        { label: "Cuma", value: 5 },
        { label: "Cumartesi", value: 6 },
        { label: "Pazar", value: 7 },
    ];
    useEffect(() => {
        let classId = getParams._id;
        console.log(classId);
        fetch("http://localhost:5001/course-schedule/" + classId, {
            metod: "GET",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(res => setCourseScheduleList(res))
    }, []);
    
    const dayCompare = (dayValue) => {
        let res = []
        if (courseScheduleList.length) {
            res = courseScheduleList.filter(item => Number(item.lessonDay.value ) === Number(dayValue))
        }
        return res
    };

    return (
        <>
            <Grid container spacing={2}>
                {
                    courseScheduleList.length && dayArray.map((day, i) => {
                        let currentDayLessons = dayCompare(day.value)
                        return (
                            <Grid item xs={12} md={3} key={i}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} 
                                        color="text.secondary" 
                                        gutterBottom>
                                        </Typography>
                                        <Typography
                                            variant="h"
                                            component="div">
                                            {day.label}
                                        </Typography>

                                        {currentDayLessons.length && currentDayLessons.map((daylesson, e) => (
                                            <div key={e}>
                                                {daylesson.lesson[0]+" - "+ daylesson.startTime +" - "+ daylesson.finishTime}
                                            </div>
                                        ))}
                                    </CardContent>

                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
};
export default TeacherClassroomSchedule;