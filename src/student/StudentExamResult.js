import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";


const StudentExamResult = () => {
  const userId = localStorage.getItem('userId')
  const [studentUser, setStudentUser] = useState([])

  useEffect(() => {
    let url = "http://localhost:5001/exam-point?userId=" + userId;
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      (setStudentUser(res))
    })
  }, [userId])


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table" >
            <TableHead>
              <TableRow>
                <TableCell align="left">Sınav Adı</TableCell>
                <TableCell align="left">Sınav Puan</TableCell>
                <TableCell align="left">Öğretmen Notu</TableCell>
                <TableCell align="left">Sınav Dönemi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(studentUser)}
              {studentUser?.length && studentUser.map((item, i) => (
                <TableRow key={i}>
                  <TableCell align="left">{item.examId?.label}</TableCell>
                  <TableCell align="left">{item.point}</TableCell>
                  <TableCell align="left">{item.note}</TableCell>
                  <TableCell align="left">{item.season}</TableCell>
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

export default StudentExamResult;