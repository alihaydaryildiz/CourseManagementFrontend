import React, { useState, useEffect } from 'react';
import { Grid, DialogTitle, DialogContent, DialogActions, TextField, CardActions, CardContent, Card, Typography, Dialog, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';



const BranchDetails = () => {
  const [classroom, setClassRoom] = useState();
  const [classRoomBranch, setClassRoomBranch] = useState();
  const [loding, setLoding] = useState(false);
  const [classList, setClassList] = useState([]);
  const [teacherOpenModal, setTeacherOpenModal] = useState(false);
  const [studentOpenModal, setStudentOpenModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [classRoomId, setClassRoomId] = useState();

  let { id } = useParams();

  const branchClassList = () => {
    let url = "http://localhost:5001/branchClassList/" + id;
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      if (!res.length) {
        alert("Data Bulunamadı!")
      } else {
        setClassList(res);
        setLoding(false)
      }
    })
  }

  useEffect(() => {
    branchClassList();
  }, [id])

  const getUserListFetch = async () => {
    let selectedRole = teacherOpenModal ? "Teacher" : "Student"
    let url = "http://localhost:5001/user-list/" + id + "/" + selectedRole;
    console.log(url)
    await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      setUserList(res)
    })
  }
  useEffect(() => {
    if (!!teacherOpenModal || !!studentOpenModal) {
      getUserListFetch()
    }

  }, [teacherOpenModal, studentOpenModal])


  const userClassroomSubmit = (_id) => {
    let data = {
      room: classroom,
      branch: classRoomBranch,
      userId: _id,
      classroomId: classRoomId
    }
    console.log(data)
    fetch("http://localhost:5001/userClassroomSave", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => console.log(res))
  }

  const classroomSellect = (modalstatus, room, branch, _id, modalType) => {
    modalType == "teacher" ? setTeacherOpenModal(modalstatus) : setStudentOpenModal(modalstatus)
    setClassRoom(room)
    setClassRoomBranch(branch)
    setClassRoomId(_id)
  }
  console.log(classRoomId)
  const teacherBranchCompaire = (rooms) => {
    let compaireBranch = rooms.find(item => item.branch === classRoomBranch && Number(item.room) === Number(classroom))
    return !compaireBranch;
  }
  const navigate = useNavigate();


  return (
    <Grid container spacing={2}>
      {classList?.map((item, i) => (
        <Grid item xs={12} md={3}
          key={i}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary" gutterBottom>
                Sınıf / Şube
              </Typography>
              <Typography
                variant="h"
                component="div">
                {item.classroom + "  / " + item.classroomBranch}
              </Typography>
            </CardContent>
            <CardActions>

              <Grid item xs={12}>
                <Button
                  onClick={() => classroomSellect(!teacherOpenModal, item.classroom, item.classroomBranch, item._id, "teacher")}
                  size={"small"}
                  variant="contained"
                  color="success"
                >Öğretmen Ata</Button>

                <Button
                  onClick={() => classroomSellect(!studentOpenModal, item.classroom, item.classroomBranch, item._id, "student")}
                  size={"small"}
                  variant="contained"
                  color="primary"
                >Öğrenci Ata</Button>

                <Button
                  onClick={() => navigate("/admin/course-schedule/" + item._id + "/" + item.branch)}
                  size={"small"}
                  variant="contained"
                  color="primary"
                >Ders Programı</Button>

              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        {
          teacherOpenModal ?
            <Dialog
              onClose={() => setTeacherOpenModal(!teacherOpenModal)}
              open={teacherOpenModal}
              maxWidth={'sm'}
              fullWidth
            >
              <DialogTitle>Set backup account</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Table>
                      <TableBody>
                        {userList?.length && userList.map((user, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              {user.name}
                            </TableCell>
                            <TableCell>
                              {user.lastName}
                            </TableCell>
                            <TableCell>
                              {user.classroom?.length
                                ?
                                user.classroom.map((room, e) => (
                                  <span key={e} style={{ marginRight: 10, border: "1px solid #ccc", padding: "8px 10px", borderRadius: 25 }}>{room.room + " / " + room.branch}</span>
                                ))
                                :
                                <Button onClick={() => userClassroomSubmit(user._id)} size={"small"} variant="contained" color="success">Ata</Button>
                              }
                            </TableCell>
                            <TableCell>
                              {
                                user.classroom?.length
                                  &&
                                  teacherBranchCompaire(user.classroom) ?
                                  <Button onClick={() => userClassroomSubmit(user._id)} size={"small"} variant="contained" color="success">Ata</Button>
                                  : null
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
              </DialogActions>
            </Dialog>
            : null
        }
        {
          studentOpenModal ?
            <Dialog
              onClose={() => setStudentOpenModal(!studentOpenModal)}
              open={studentOpenModal}
              maxWidth={'sm'}
              fullWidth
            >
              <DialogTitle>Set backup account</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Table>
                      <TableBody>
                        {userList?.length && userList.map((user, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              {user.name}
                            </TableCell>
                            <TableCell>
                              {user.lastName}
                            </TableCell>
                            <TableCell>
                              {user.classroom?.length
                                ?
                                user.classroom[0].room + " / " + user.classroom[0].branch
                                :
                                <Button onClick={() => userClassroomSubmit(user._id)} size={"small"} variant="contained" color="success">Ata</Button>
                              }

                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
              </DialogActions>
            </Dialog>
            : null
        }
      </Grid>
    </Grid>
  )
};
export default BranchDetails;

