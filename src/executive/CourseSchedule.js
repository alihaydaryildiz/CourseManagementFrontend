import React, { useState, useEffect } from "react";
import { TableContainer, TableBody, TableCell, Table, TableHead, Paper, TextField, Button, Grid, TableRow, CardContent, Card } from "@mui/material";
import { useParams } from 'react-router-dom';
import { groupBy } from "underscore";
import { CardHeader } from "react-bootstrap";
const CourseSchedule = () => {

  const [beginngBell, setBeginngBell] = useState();
  const [endBell, setEndBell] = useState();
  const [courseTime, setCourseTime] = useState();
  const [lessonMonth, setLessonMonth] = useState()
  const [loding, setLoding] = useState(false);
  const [CourseScheduleList, setCourseScheduleList] = useState();
  const [getSelectedClass, setSelectedClass] = useState({});
  const [groupingCourseSchedules, setGroupingCourseSchedules] = useState();
  const [userList, setUserList] = useState();
  const [teacher, setTeacher] = useState();
  const [userLessons, setUserLessons] = useState([]);
  const [selectedLesson, setSellectedLesson] = useState();
  const [examDate, setExamDate] = useState();
  const [selectedDay, setSelectedDay] = useState(
    [
      { label: "Pazartesi", value: 1 },
      { label: "Salı", value: 2 },
      { label: "Çarşamba", value: 3 },
      { label: "Perşembe", value: 4 },
      { label: "Cuma", value: 5 },
      { label: "Cumartesi", value: 6 },
      { label: "Pazar", value: 7 },
    ]
  );

  const { _id, branchId } = useParams();

  useEffect(() => {

    if (!_id) {
      return false
    }
    let url = "http://localhost:5001/selectedClass/" + _id + "/" + branchId;
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      setSelectedClass(res);
    })

  }, [_id])

  const CourseScheduleSubmit = async () => {
    let data = {
      classId: _id,
      startTime: beginngBell,
      finishTime: endBell,
      lessonDay: courseTime,
      classroom: { room: getSelectedClass.classroom, branch: getSelectedClass.classroomBranch, _id: getSelectedClass._id },
      lesson: selectedLesson,
      userId: teacher,
      lessonDate: examDate
    };
    console.log(data)

    fetch("http://localhost:5001/course-schedule-save", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.ok && setLoding(true))
  };

  useEffect(() => {
    fetch("http://localhost:5001/course-schedule/" + _id, {
      metod: "GET",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(res => {
      let groupingData = groupBy(res, (item) => {
        return item.lessonDay?.label
      })
      if (groupingData) {
        setGroupingCourseSchedules(groupingData)
      }

      setCourseScheduleList(res)
    })
  }, [loding, _id]);

  useEffect(() => {
    let url = "http://localhost:5001/user-list/" + branchId + "/Teacher";
    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      if (!res.length) {
        console.log("Data Bulunamadı!")
      } else {
        setUserList(res);
      }
    })
  }, [groupingCourseSchedules]);


  useEffect(() => {
    let selectedUser = userList?.find(item => item._id === teacher)
    if (selectedUser) {
      setUserLessons(selectedUser.lessons)
    }
  }, [teacher])


  return (
    <div>
      <Grid container spacing={2}>
        {
          getSelectedClass?._id ?
            <Grid item xs={12}>
              <h2>{getSelectedClass?.classroom + " / " + getSelectedClass?.classroomBranch + " İçin Ders Programı Düzenleniyor!"}</h2>
            </Grid>
            :
            null
        }
        <Grid item xs={12}>
          <TextField onChange={(e) => setBeginngBell(e.target.value)}
            id="outlined-basic"
            type="time"
            label="Ders Başlangıç Saati"
            variant="outlined"
            color='success'
            size={'small'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={(e) => setEndBell(e.target.value)}
            id="outlined-basic"
            type="time"
            label="Ders Bitiş Saati"
            variant="outlined"
            color='success'
            size={'small'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={(e) => setExamDate(e.target.value)}
            id="outlined-basic"
            type="date"
            label="Ders Tarihi"
            variant="outlined"
            color='success'
            size={'small'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {

          <Grid item xs={12}>
            <TextField onChange={(e) => e.target.value !== "-1" && setCourseTime({ label: e.target.options[e.target.selectedIndex].text, value: e.target.value })}
              id="outlined-basic"
              select
              label="Ders Günü"
              variant="outlined"
              color='success'
              size={'small'}
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <option value={"-1"}>
                Ders Günü Seç
              </option>
              {
                selectedDay.map((item, i) => (
                  <option key={i} value={item.value} id={item.label}>{item.label}</option>
                ))
              }
            </TextField>
          </Grid>

        }
        <Grid item xs={12}>
          <TextField onChange={(e) => setTeacher(e.target.value)}
            id="outlined-basic"
            select
            label="Öğretmen"
            variant="outlined"
            color='success'
            size={'small'}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          ><option value={"-1"}>Öğretmen Seç</option>
            {
              userList?.map((item, i) => (
                <option key={i} value={item._id} >{item.name + " " + item.lastName}</option>
              ))
            }</TextField>
        </Grid>


        {
          userLessons?.length ?
            <Grid item xs={12}>
              <TextField onChange={(e) => e.target.value !== "-1" && setSellectedLesson(e.target.value)}
                id="outlined-basic"
                select
                label="Ders Adı"
                variant="outlined"
                color='success'
                size={'small'}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <option value={"-1"}>Ders Seçiniz</option>
                {
                  userLessons?.map((item, i) => (
                    <option key={i} value={item.name}>{item.name}</option>
                  ))
                }
              </TextField>
            </Grid>
            :
            null
        }

        <Grid item xs={12}>
          <Button onClick={() => CourseScheduleSubmit()}
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
                  <TableCell>Ders Ayı</TableCell>
                  <TableCell>Ders Başlangıç Saati</TableCell>
                  <TableCell>Ders Bitiş Saati</TableCell>
                  <TableCell >Ders Günü</TableCell>
                  <TableCell >Derslik</TableCell>
                  <TableCell >Ders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  CourseScheduleList?.length && CourseScheduleList.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell >{item.month}</TableCell>
                      <TableCell >{item.startTime}</TableCell>
                      <TableCell >{item.finishTime}</TableCell>
                      <TableCell >{item.lessonDay?.label}</TableCell>
                      <TableCell >{item.classroom.room + "/" + item.classroom.branch}</TableCell>
                      <TableCell >{item.lesson}</TableCell>

                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {
          CourseScheduleList?.length && Object.entries(groupingCourseSchedules).length ? Object.entries(groupingCourseSchedules).map((item, i) => (
            <Grid item xs={12} md={2} key={i}>
              <Card
                sx={{ minWidth: 275 }}>
                <CardHeader>
                  {item[0]}
                </CardHeader>
                <CardContent>                {
                  item[1].map((dayItem, l) => (
                    <div key={l}>
                      {dayItem.lesson + " - " + dayItem.startTime + " - " + dayItem.finishTime}
                    </div>
                  ))
                }
                </CardContent>
              </Card>
            </Grid>
          ))
            :
            null
        }

      </Grid>
    </div>
  )
};
export default CourseSchedule;