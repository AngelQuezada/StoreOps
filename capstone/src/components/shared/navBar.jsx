import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import '../inventory.css';

const drawerWidth = 350;


export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box 

    > 
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <IconButton  style={{
      backgroundColor:"transparent",
      background: "transparent",
      boxShadow: "none",
      textShadow: "none !important",
      boxShadow: "none !important",
      height: "50px", // Set a fixed height
      display: "flex",
      alignItems: "center", // Align items vertically center
      justifyContent: "start" // Align items horizontally start
    }}
        onClick={() => setOpen(!open)}
        >
          <MenuIcon />
          <span className="no-shadow"  style={{ marginLeft: '30px', textShadow: 'none', boxShadow: 'none', fontSize:"60px", paddingTop:"1px", color:"#1fa636", fontFamily:"sans-serif" }}>StoreOps</span>
        </IconButton>
      </Box>
      <MuiDrawer 
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: drawerWidth,
            transition: 'width 0.3s', // This line adds the smooth transition
          },
        }}
      > 
        <IconButton style={{
      backgroundColor:"transparent",
      background: "transparent",
      boxShadow: "none",
      textShadow: "none !important",
      boxShadow: "none !important"
    }}
          onClick={() => setOpen(!open)}

        > 
          {open ? (
            <span className="no-shadow"  style={{ textShadow: 'none', fontSize:"60px", fontFamily:"sans-serif", boxShadow: 'none', color:"#1fa636"}}>StoreOps</span>
          ) : (
            <MenuIcon /> 
          )}
        </IconButton>
        <Divider />
                  <List>
            {[
              { text: 'Home', icon: <DashboardCustomizeRoundedIcon />, path: '/' },
              { text: 'Purchase to Sale', icon: <AttachMoneyRoundedIcon />, path: '/purchase-to-sale' },
              { text: 'Inventory', icon: <InventoryRoundedIcon />, path: '/inventory' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

      </MuiDrawer>
    </Box>
  );
}
