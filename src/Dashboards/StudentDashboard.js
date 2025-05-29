import React from "react";
import { Outlet } from "react-router-dom";
import StudentDashboardMenu from "../student/StudentDashboardMenu";
import SendIcon from '@mui/icons-material/Send';
import { Grid, AppBar, Box, Toolbar, Typography, Button, IconButton, Card, CardContent, CardActions, } from '@mui/material';
import {  useNavigate } from 'react-router-dom';


const StudentDashboard = () => {



  return (
    <Grid container spacing={2} mt={300} sx={{ marginTop: 3 }}>
      <Grid item xs={12} md={3}>
        <StudentDashboardMenu />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet />
      </Grid>
      {/* <Grid item xs={12} md={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small">Sınav Sonuçlarımı Görüntüle</Button>
              </CardActions>
            </Card>
          </Grid> */}
    </Grid>

  )
};

export default StudentDashboard;