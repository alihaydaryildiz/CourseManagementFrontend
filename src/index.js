import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './executive/Login';
import SignUp from './executive/SignUp';
import AdminPages from './Dashboards/AdminPages';
import BranchManagements from './executive/BranchManagement';
import UserList from './executive/userList';
import BranchDetails from './executive/BranchDetails';
import TeacherDashboard from './Dashboards/TeacherDashboard';
import StudentDashboard from './Dashboards/StudentDashboard';
import ExecutiveDashboard from './Dashboards/ExecutiveDashboard';
import CourseSchedule from './executive/CourseSchedule';
import TeacherClassroom from './teacher/TeacherClassroom';
import ExamLessons from './teacher/ExamLessons';
import Exam from './teacher/Exam';
import TeacherCourseSchedule from './teacher/TeacherCourseSchedule';
import ExamResult from './teacher/ExamResult';
import TeacherClassroomSchedule from './teacher/TeacherClassroomSchedule';
import TeacherCalendar from './teacher/TeacherCalendar';
import StudentClassSchedule from './student/StudentClassSchedule';
import StudentExamResult from './student/StudentExamResult';
import StudentCalendar from './student/StudentCalendar';


export default function SchoolRouter() {
  const [role, setRole] = useState(localStorage.getItem("userRole"))
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        {
          role === "Executive"  
            ?
            <Route path={"/admin"} element={<ExecutiveDashboard />}>
              <Route path={'dashboard'} element={<AdminPages />} />
              <Route path={'branchmanagement'} element={<BranchManagements />} />
              <Route path={'user-list'} element={<UserList />} />
              <Route path={'branch-details/:id'} element={<BranchDetails />} />
              <Route path={'course-schedule/:_id/:branchId'} element={<CourseSchedule />} />
            </Route>
            :
            null
        }

        {
          role === "Teacher" ?
            <Route path={'/teacher'} element={<TeacherDashboard />}>
              <Route path={'dashboard'} element={<TeacherCalendar />} />
              <Route path={'teacher-c-s'} element={<TeacherCourseSchedule />} />
              <Route path='teacher-calendar' element={<TeacherCalendar/>}/>
              <Route path={'exam'} element={<Exam/>} />
              <Route path={'teacher-classroom/:id'} element={<TeacherClassroom />} />
              <Route path={'examLessons/:classroomId/:branchId'} element={<ExamLessons/>} />
              <Route path={'exam-result/:classroomId/:examId'} element={<ExamResult/>}/>
              <Route path={'teacher-c-schedule/:_id'} element={<TeacherClassroomSchedule/>}/>
            </Route>
            : null
        }
        {
          role === "Student"
            ?
            <Route path={'/student'} element={<StudentDashboard />}>
              <Route path={'dashboard'} element={<StudentDashboard />} />
              <Route path={'student-schedule/:_id'} element={<StudentClassSchedule/>} />
              <Route path={'student-exam-result/:_id'} element={<StudentExamResult/>}/>
              <Route path={'student-calendar'} element={<StudentCalendar/>}/>
            </Route>
            :
            null  
        }
      </Routes>
    </Router>
  ) 

}
const root = createRoot(document.getElementById('root'));
root.render(<SchoolRouter />);
reportWebVitals()

