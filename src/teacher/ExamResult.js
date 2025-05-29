import React, { useEffect, useState } from "react";
import { Grid, Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from "react-router-dom";

const ExamResult = () => {
    const [userList, setUserList] = useState([]);
    const [pointList, setPointList] = useState();
    const [userId, setUserId] = useState();
    const [textPoint, setTextPoint] = useState();
    const [teacherNote, setTeacherNote] = useState();
    const [loading, setLoading] = useState(false)
    const getParams = useParams();
    const [openModalSubmit, setOpenModalSubmit] = useState(false);
    const [examList, setExamList] = useState([]);
    const _id = localStorage.getItem('userId');

    useEffect(() => {
        console.log(getParams._id)
        let url = "http://localhost:5001/getexam-result/" + getParams.classroomId;
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => (setUserList(res))
        )
    }, []);

    const studentExamResult = (id) => {
        return pointList?.length && id && pointList.find(item => item.userId === id)
    };

    const examSubmit = () => {
        let examPointList = {
            examId: getParams.examId,
            userId: userId,
            point: textPoint,
            teacherId: _id,
            note: teacherNote,
            notePermissions: { student: true, parent: false }
        };
        fetch("http://localhost:5001/exam-result", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify(examPointList),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.ok && setLoading(true))
    };

    useEffect(() => {
        fetch("http://localhost:5001/exam-point?examId=" + getParams.examId, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            setPointList(res);
            setLoading(false)
        })
    }, [loading, userId]);


    useEffect(() => {
        if (_id) {
            let query = "?creatorId=" + _id + "&";

            fetch("http://localhost:5001/getExam", {
                mode: "cors",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                console.log(res, "exam list");
                setExamList(res)
            })
        }


    }, [_id]);

    const pointOpenModal = (id) => {
        setUserId(id)
        setOpenModalSubmit(true);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}  >
                            <TableHead>
                                <TableRow>
                                    <TableCell >Adı</TableCell>
                                    <TableCell >Soyadı</TableCell>
                                    <TableCell >Sınav Dönemi</TableCell>
                                    <TableCell >Puan</TableCell>
                                    <TableCell >Notlarım</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    userList?.length && userList?.map((item, i) => {
                                        let userresult = studentExamResult(item._id)
                                        return (    
                                            <TableRow key={i}>
                                                <TableCell >{item.name}</TableCell>
                                                <TableCell >{item.lastName}</TableCell>
                                                <TableCell >{userresult?.season}</TableCell>
                                                <TableCell>
                                                    {userresult?.point ?
                                                        userresult.point
                                                        :
                                                        <Button onClick={() => pointOpenModal(item._id)} endIcon={<SendIcon />}
                                                            variant="contained"
                                                            color="success"
                                                            size="small">Sınav Puanı Ekle</Button>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {userresult?.note}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {openModalSubmit &&
                <Dialog
                    onClose={() => setOpenModalSubmit(false)}
                    open={openModalSubmit}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle>Sınav Sonuç Tablosu</DialogTitle>
                    <DialogContent>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth onChange={(e) => setTextPoint(e.target.value)}
                                type="number"
                                id="outlined-basic"
                                label="Sınav Puanı"
                                variant="outlined"
                                margin='normal'
                                color='success' />
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
                    </DialogContent>
                </Dialog>
            }
        </>
    )

};

export default ExamResult;