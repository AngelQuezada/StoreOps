// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
// import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
// import '../inventory.css';

// const drawerWidth = 350;


// export default function MiniDrawer() {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <Box 

//     > 
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <IconButton  style={{
//       backgroundColor:"transparent",
//       background: "transparent",
//       boxShadow: "none",
//       textShadow: "none !important",
//       boxShadow: "none !important",
//       height: "50px", // Set a fixed height
//       display: "flex",
//       alignItems: "center", // Align items vertically center
//       justifyContent: "start" // Align items horizontally start
//     }}
//         onClick={() => setOpen(!open)}
//         >
//           <MenuIcon />
//           <span className="no-shadow"  style={{ marginLeft: '30px', textShadow: 'none', boxShadow: 'none', fontSize:"60px", paddingTop:"1px", color:"#1fa636", fontFamily:"sans-serif" }}>StoreOps</span>
//         </IconButton>
//       </Box>
//       <MuiDrawer 
//         variant="temporary"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: {
//             width: drawerWidth,
//             transition: 'width 0.3s', // This line adds the smooth transition
//           },
//         }}
//       > 
//         <IconButton style={{
//       backgroundColor:"transparent",
//       background: "transparent",
//       boxShadow: "none",
//       textShadow: "none !important",
//       boxShadow: "none !important"
//     }}
//           onClick={() => setOpen(!open)}

//         > 
//           {open ? (
//             <span className="no-shadow"  style={{ textShadow: 'none', fontSize:"60px", fontFamily:"sans-serif", boxShadow: 'none', color:"#1fa636"}}>StoreOps</span>
//           ) : (
//             <MenuIcon /> 
//           )}
//         </IconButton>
//         <Divider />
//                   <List>
//             {[
//               { text: 'Home', icon: <DashboardCustomizeRoundedIcon />, path: '/' },
//               { text: 'Purchase to Sale', icon: <AttachMoneyRoundedIcon />, path: '/purchase-to-sale' },
//               { text: 'Inventory', icon: <InventoryRoundedIcon />, path: '/inventory' },
//             ].map((item, index) => (
//               <ListItem key={item.text} disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to={item.path}
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: 'center',
//                     px: 2.5,
//                     textDecoration: 'none',
//                     color: 'black',
//                   }}
//                 >
//                   <ListItemIcon>
//                     {item.icon}
//                   </ListItemIcon>
//                   {open && <ListItemText primary={item.text} />}
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//       </MuiDrawer>
//     </Box>
//   );
// }

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const OffcanvasDrawer = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IconButton 
        onClick={handleShow}
        style={{ marginLeft: '30px', backgroundColor:"transparent"}}
      >
        <MenuIcon />
        <span style={{ marginLeft: '50px', fontSize: "60px", paddingTop: "1px", color: "#1fa636", fontFamily: "sans-serif" }}>StoreOps</span>
      </IconButton>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ marginLeft: '20px', fontSize: "60px", paddingTop: "1px", color: "#1fa636", fontFamily: "sans-serif" }}>StoreOps</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <List style={{ marginLeft: '20px'}}>
  {[
    { text: 'Home', icon: <DashboardCustomizeRoundedIcon />, path: '/' },
    { text: 'Purchase to Sale', icon: <AttachMoneyRoundedIcon />, path: '/purchase-to-sale' },
    { text: 'Inventory', icon: <InventoryRoundedIcon />, path: '/inventory' },
  ].map((item, index) => (
    <ListItem key={item.text} disablePadding>
        <ListItemButton 
          component={Link} 
          to={item.path} 
          onClick={handleClose} 
        >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} primaryTypographyProps={{ style: { fontSize: '20px' } }} />
        </ListItemButton>
    </ListItem>
  ))}
</List>


        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasDrawer;
