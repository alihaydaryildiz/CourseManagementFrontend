import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Exam = () => {
    const [currentUser, setCurrentUser] = useState([]);                                                                                                                                     
    const _id = localStorage.getItem("userId")
    const navigate = useNavigate();

    useEffect(() => {
        let url = "http://localhost:5001/user-list-all?_id=" + _id;
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {                                                                                                                                                                                                                      
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => (setCurrentUser(res))
        )
    }, [_id])
    console.log(currentUser);

    return (
        <Grid container spacing={2}>
            {
                currentUser.length &&
                currentUser[0].classroom.map((item, i) => (
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
                                    {item.room + "  / " + item.branch}
                                </Typography>

                            </CardContent>
                            <Button
                                onClick={() => navigate("/teacher/teacher-classroom/" + item.classroomId)}
                                size={"small"}
                                variant="contained"
                                color="success"
                            >Öğrenci Listesi</Button>
                            <Button
                                onClick={() => navigate("/teacher/examLessons/" + item.classroomId + "/" + currentUser[0].branch)}
                                size={"small"}
                                variant="contained"
                                color="success"
                            >Sınav Yönetimi</Button>
                         {/*    <Button
                                onClick={() => navigate("/teacher/exam-result/" + item.classroomId)}
                                size={"small"}
                                variant="contained"
                                color="success"
                            >Öğrenci Sınav Yönetimi</Button> */}
                        </Card>
                    </Grid>
                ))

            }

            <Grid item xs={12}>

            </Grid>
        </Grid>
    )
};
export default Exam;