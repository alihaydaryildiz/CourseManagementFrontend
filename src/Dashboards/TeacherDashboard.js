import React from "react";
import { Outlet } from "react-router-dom";
import { Grid} from '@mui/material';
import TeacherDashboardMenu from "../teacher/TeacherDashboardMenu";
const TeacherDashboard = () => {



  return (
    <Grid container spacing={2}  sx={{ marginTop: 10 }}>
      <Grid item xs={12} md={2}>
        <TeacherDashboardMenu />
      </Grid>
      <Grid item xs={12} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  )
};
export default TeacherDashboard;