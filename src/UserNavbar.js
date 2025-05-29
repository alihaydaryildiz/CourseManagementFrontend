import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
const UserNavbar = () => {

    return (
        <>
            <Box s  sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
                
                        <Grid> <Link to={"/signup"} variant="body2 ">
                  {"Don't have an account? Sign Up"}
                </Link> 
                       </Grid>
                     
            </Box>
        </>
    )
}

export default UserNavbar;