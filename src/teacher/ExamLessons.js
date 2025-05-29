import React, { useEffect, useState } from "react";
import { Grid, TableContainer, TableBody, TableCell, Table, TableHead, Paper, TextField, Button, TableRow } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from "react-router-dom";

const ExamLessons = () => {
    const [examTitle, setExamTitle] = useState();
    const [examId, setExamId] = useState();
    const [testDay, setTestDay] = useState();
    const [testTime, setTestTime] = useState();
    const [testFinishTime, setTestFinishTime] = useState();
    const [examDescirptions, setExamDescriptions] = useState();
    const [getUser, setUser] = useState();
    const [examLessonsList, setExamLessonsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [season, setSeason] = useState();

    const _id = localStorage.getItem("userId");
    const { classroomId, branchId } = useParams();

    const examListData = () => {
        let examData = {
            label: examTitle,
            lessonId: examId,
            descriptions: examDescirptions,
            examDay: testDay,
            examTime: testTime,
            examFinish: testFinishTime,
            creatorId: _id,
            classroomId,
            branchId,
            season,
        };
        fetch("http://localhost:5001/exam", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify(examData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => setLoading(true))
    };

    useEffect(() => {
        fetch("http://localhost:5001/user-list-all?_id=" + _id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => setUser(res))

    }, [_id]);

    useEffect(() => {
        let url = "http://localhost:5001/getExam?creatorId=" + _id + "&classroomId=" + classroomId + "&branchId=" + branchId;
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            setExamLessonsList(res);
            console.log(res)
            setLoading(false)
        })
    }, [loading]);

    const handleChange = (event) => {
        setSeason(event.target.value);
    };

    const navigate = useNavigate();
    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Grid item xs={12} md={3}>
                    <select value={season} onChange={handleChange} style={{ width: "400px", height: 50, }}>
                        <option value="Autumn">Autumn</option>
                        <option value="Spring">Spring</option>
                    </select>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField select fullWidth onChange={(e) => setExamTitle(e.target.value)} label="Sınav" variant="outlined" margin='normal' color='success' >

                        {
                            getUser?.length && getUser[0].lessons?.map((item, i) => (
                                <option key={i} value={item.name}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField fullWidth onChange={(e) => setTestDay(e.target.value)}
                        type="date"
                        id="outlined-basic"
                        label="Sınav Günü"
                        variant="outlined"
                        margin='normal'
                        color='success' />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField fullWidth onChange={(e) => setTestTime(e.target.value)}
                        id="outlined-basic"
                        type="time"
                        label="Sınav Başlangıç Saati"
                        variant="outlined"
                        margin='normal'
                        color='success' />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField fullWidth onChange={(e) => setTestFinishTime(e.target.value)}
                        id="outlined-basic"
                        type="time"
                        label="Sınav Bitiş Saati"
                        variant="outlined"
                        margin='normal'
                        color='success' />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField fullWidth onChange={(e) => setExamDescriptions(e.target.value)}
                        id="outlined-basic"
                        label="Sınav Açıklaması"
                        variant="outlined"
                        margin='normal'
                        color='success' />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => examListData()}
                        color={"secondary"}
                        variant="contained"
                        size={'small'}
                    >
                        Kaydet
                    </Button>

                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, marginTop: 10 }} size={'small'}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sınav Dönemi</TableCell>
                                    <TableCell>Sınav Adı</TableCell>
                                    <TableCell >Sınav Günü</TableCell>
                                    <TableCell>Sınav Başlangıç Saati</TableCell>
                                    <TableCell>Sınav Bitiş Saati</TableCell>
                                    <TableCell>Sınav Açıklaması</TableCell>
                                    <TableCell>Detay</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    examLessonsList?.length && examLessonsList.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell >{item.season}</TableCell>
                                            <TableCell >{item.label}</TableCell>
                                            <TableCell >{item.examDay}</TableCell>
                                            <TableCell >{item.examTime}</TableCell>
                                            <TableCell >{item.examFinish}</TableCell>
                                            <TableCell >{item.descriptions}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => navigate("/teacher/exam-result/"+classroomId + "/" +item._id)} endIcon={<SendIcon />} variant="contained" color="success" size="small">Detaya Git</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>

    )
};
export default ExamLessons;