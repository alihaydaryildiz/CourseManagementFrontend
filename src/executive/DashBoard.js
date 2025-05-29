import React from 'react';
import {  useNavigate, Outlet } from 'react-router-dom';
import { Grid, AppBar, Box, Toolbar, Typography, Button, IconButton, Card, CardContent, CardActions, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import TeacherDashboard from '../Dashboards/TeacherDashboard';

const DashBoard = () => {
  const role = localStorage.getItem("userRole")
 
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roleList, setRoleList] = React.useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    localStorage.removeItem("userId") ;
    localStorage.removeItem("userRole") ;

    navigate("/")

  };
  const users = localStorage.getItem("userId");
  console.log(users);





  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ana Sayfa
            </Typography>
            <Button onClick={() => handlelogout()} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {role === "Teacher" ?
        <TeacherDashboard />
        : null}
      <Grid container spacing={2} mt={300} sx={{ marginTop: 3 }}>
        
        {role === "Student" ?
          <Grid item xs={12} md={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small">Sınav Sonuçlarımı Görüntüle</Button>
              </CardActions>
            </Card>
          </Grid>
          : null}
        {role === "Teacher" ?
          <Grid item xs={12} md={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" size="small">Öğrenci Sınav Sonuçlarını Görüntüle</Button>
              </CardActions>
            </Card>
          </Grid>
          : null}
       
        <Grid item xs={12} md={3}>
          <Card sx={{
            minWidth: 275,
            backgroundColor: '#f77ff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            transition: 'transform 0.3s ease-in-out',
            cursor: 'pointer',
            ':hover': {
              transform: 'scale(1.05)',
            }
          }}>
            <CardContent>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/admin/student-portal")} endIcon={<SendIcon />} variant="contained" color="success" size="small">Öğrenci Paneli</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Outlet />
    </div>
  );
}
export default DashBoard;