import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Grid } from "@mui/material";
import moment from "moment";
import CourseSchedule from "../executive/CourseSchedule";
const TeacherCalendar = () => {
    const [calendarEvents,setCalendarEvents] = useState([]);
    document.addEventListener('DOMContentLoaded', function(e) {
        const calendarEl = document.getElementById('calendar')
        const calendar = new FullCalendar(calendarEl, {
          initialView: 'dayGridMonth',
          eventClick: function(info) {
            console.log("aloha")
            alert('Event: ' + info.event.title);
            alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            alert('View: ' + info.view.type);
        
            // change the border color just for fun
            info.el.style.borderColor = 'red';
          }
    
        });
       
        calendar.render()
      })

    let userId = localStorage.getItem("userId");
    const calendarRef = useRef(null)
    useEffect(() => {
        console.log(userId)
        fetch("http://localhost:5001/course-schedule?userId=" + userId, {
            metod: "GET",
            mode: "cors",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(res => {
           // console.log(res);
            let newArr = [];
         /*    res?.forEach(element => {
                newArr.push({title:element.lesson[0],start:element.lessonDay?.label});
            });
            console.log(newArr); */
            //setCalendarEvents(newArr);
            const events = res.map(event => {
                // Pazartesi, Salı gibi gün isimlerini tarih formatına çevir
                const day = getDayNumber(event.lessonDay?.label); // Örneğin: "Pazartesi" -> 1, "Salı" -> 2
                let startDate = getDateForDay(day); // Belirtilen gün için tarihi hesapla
                Array.from({ length: 52 }).fill(1).forEach((asd, c) => {
                    newArr.push({title:event.lesson[0],start:startDate});
                    startDate = moment(startDate).add(7, 'days').toDate();    
                })
                
                /* return {
                    title: event.lesson[0],
                    start: startDate
                }; */
            });
            setCalendarEvents(newArr);
            //let currentMont = moment(calendarRef.current.calendar.currentData.viewTitle).format("MM");
            //console.log(currentMont)
       /*      let currentYear = new Date().getFullYear();
            const events = res.map(event => ({
                title: event.lesson[0],
                //start: moment(currentYear + "-" + currentMont + "-" + (Number(event.lessonDay.value)) + " " + event.startTime).format("YYYY-MM-DD hh:mm"),
               // end: moment(currentYear + "-" + currentMont + "-" + (Number(event.lessonDay.value)) + " " + event.finsihTime).format("YYYY-MM-DD hh:mm")
            })); */
            //console.log(calendarRef.current.calendar.currentData.viewTitle)
            //calendarRef.current.getApi().removeAllEvents();
            //calendarRef.current.getApi().addEventSource(events);
        }).catch(error => {
            console.log("Hata", error)
        })
    }, [userId]);


    const getDayNumber = (dayName) => {
        const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
        return days.indexOf(dayName) + 1;
    };

    const getDateForDay = (day) => {
        const today = new Date();
        const diff = day - today.getDay();
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + diff);
        return newDate;
    };
 

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                < FullCalendar
                    id="calendar"
                    //ref={calendarRef}
                    events={calendarEvents}
        //eventContent={calendarEvents}
                    height={750}
                    width={650}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </Grid>
        </Grid>
    )
};
export default TeacherCalendar;