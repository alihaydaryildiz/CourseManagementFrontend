import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import {List, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Drawer, IconButton, AppBar, Box, } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { HomeOutlined } from '@mui/icons-material';
import { red } from '@mui/material/colors';


const drawerWidth = 200;

const TeacherDashboardMenu = (props) => {
  const userId = localStorage.getItem("userId")
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    navigate("/")

  };
  const navigate = useNavigate();


  const drawer = (
    <div>
      <Toolbar />
      <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/teacher/teacher-calendar")}>
            <ListItemIcon>
              <HomeOutlined  sx={{ color: red[500] }}/>
            </ListItemIcon>
            <ListItemText primary={"Anasayfa"} />
          </ListItemButton>
        </ListItem>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/teacher/teacher-c-s")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Ders Programı"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>navigate('/teacher/exam')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sınıf Yönetimi"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Akedemik Sınav Takvimi"} />
          </ListItemButton>
        </ListItem>
      
      </List>
      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
          <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >

          {drawer}
          <Button onClick={() => handlelogout()} variant="contained" color="success" size="small">Logout</Button>
        </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
        </Box>
      </Box>

  );
}
export default TeacherDashboardMenu;
