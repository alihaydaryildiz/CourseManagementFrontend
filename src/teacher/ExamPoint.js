import { Grid, TextField, Button, TableContainer, TableBody, TableHead, Table, TableRow, TableCell, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";


const ExamPoint = () => {
    const [pointList, setPointList] = useState();
    const [textId, setTextId] = useState();
    const [userId, setUserId] = useState();
    const [textPoint, setTextPoint] = useState();
    const [textTeacherId, setTextTeacherId] = useState();
    const [teacherNote, setTeacherNote] = useState();
    const [loading, setLoading] = useState(false);

    const _id = localStorage.getItem('userId');

    const examSubmit = () => {
        let examPointList = {
            examId: textId,
            userId: userId,
            point: textPoint,
            teacherId: _id,
            note: teacherNote,
        };
        fetch("http://localhost:5001/exam-result", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify(examPointList),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res =>  res.ok && setLoading(true))
    };

    useEffect(() => {
        fetch("http://localhost:5001/exam-point?userId="+_id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            setPointList(res);
            setLoading(false)
        })
    }, [loading]);



    return (
        <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
                <TextField fullWidth onChange={(e) => setTextPoint(e.target.value)} 
                type="number" 
                id="outlined-basic" 
                label="Sınav Puanı" 
                variant="outlined" 
                margin='normal' c
                olor='success' />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth onChange={(e) => setTeacherNote(e.target.value)} 
                id="outlined-basic"
                 label="Öğretmen Notu" 
                 variant="outlined" 
                 margin='normal' 
                 color='success' />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => examSubmit()}
                    color={"secondary"}
                    variant="contained"
                    size={'small'}
                >Kaydet</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, marginTop: 10 }} size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sınav Puanı</TableCell>
                                <TableCell >Öğretmen Notu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pointList?.length && pointList.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell >{item.point}</TableCell>
                                        <TableCell >{item.note}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
};
export default ExamPoint;