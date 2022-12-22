import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./SideBar.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineHome } from "react-icons/ai"
import { HiMenuAlt4 } from "react-icons/hi"
import { RiAccountCircleFill } from "react-icons/ri"
import HomePage from '../HomePage/HomePage';
import logo1 from "../../Assets/logo1.png"
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import two from "../../Assets/2190989_user_circle_male_avatar_account_icon.png"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MyProject from '../MyProject/MyProject';
import MyProfile from '../my-profile/MyProfile';
import MindarViewer from '../../mindar-viewer';
import Preview from '../Preview/Preview';
import Publish from '../Publish/Publish';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiEdit } from "react-icons/fi"
import { MdSwitchAccount } from "react-icons/md"
import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { BACKEND_URI, LOCAL_URL } from "../../config/config"
import Hello from '../hello/Hello';
// import Popover from '@mui/material/Popover';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
const drawerWidth = 240;

interface Props {

  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props, { setData }) {
  let [projectName, setProjectName] = useState([])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isColor, setIsColor] = useState("Create AR Project")
  const [navColor, isNavColor] = useState("save")
  const { pathname } = useLocation();
  const [editData, setEditData] = useState("");
  let [totalProject, setTotalProject] = useState(0);

  let auth = localStorage.getItem("webar")

  let auths = JSON.parse(auth)
  console.log("auths", auths);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeRoute = () => {
    // console.log("pathname");
    if (pathname) {
      if (pathname == "/sidebar/HomePage") {
        setIsColor("Create AR Project")
      } else if (pathname == "/sidebar/myproject") {
        setIsColor("My Project")
      } else if (pathname == "/sidebar/myprofile") {
        setIsColor("View Miner")
      }
      else if (pathname == "/mindar") {
        setIsColor("WebAR")
      }
    }
  }
  const ChangeRouteTwo = () => {
    if (pathname) {
      if (pathname == "/sidebar/HomePage") {
        isNavColor("save")
      } else if (pathname == "/sidebar/preview") {
        isNavColor("Preview")
      } else if (pathname == "/sidebar/publish") {
        isNavColor("Publish")
      }
    }
  }

  // const StatusData = async () => {
  //   try {

  //     await axios.get(`${BACKEND_URI}/getdata`).then((resp) => {
  //       let statusShow = []
  //       let projectnames = []
  //       for (var i = 0; i < resp.data.length; i++) {
  //         console.log(resp.data[i]);
  //         if (resp.data[i].webardata.ids == auths.IdAddress) {
  //           console.log("res1", resp.data[i].webardata.editData);
  //           let statusData = resp.data[i]
            
  //           projectnames.push(resp.data[i].webardata.editData)
  //           statusShow.push(statusData)
  //         }
  //       }
  //       setTotalProject(statusShow.length)
  //       setProjectName(projectnames)
  //     })
  //   } catch (e) {
  //     console.log("e", e);
  //   }
  // }
  useEffect(() => {
    changeRoute();
    // StatusData();
  }, [])
  useEffect(() => {
    ChangeRouteTwo();
  }, [])
  // setData(editData);
  // console.log("editData", editData);

  const navigate = useNavigate()
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;


  const drawer = (
    <div className="stakenmsColor1" style={{ color: "white" }}>
      <Toolbar style={{ marginTop: "10px", }} className="text-start d-flex align-items-center justify-content-start">
        <img src={logo1} width="30px" />
        <p className="side-p mt-3 ms-2">AR Create Tool</p>
      </Toolbar>
      <br />
      <Divider />
      {
        auth ? <List>
          <Link to="/sidebar/Homepage" style={{ textDecoration: "none" }}>
            <ListItem button href="#deshborad" key="Dashboard"
              onClick={() => {
                setIsColor("Create AR Project");
                isNavColor("save")
              }}
              className={isColor == "Create AR Project" ? ' staking-btn_active' : 'staking-btn'}>
              <ListItemIcon >
                <AiOutlineHome color='blue' size={20} />
              </ListItemIcon>
              <ListItemText primary="Create AR Project" />
            </ListItem>
          </Link>
          <Link to="/sidebar/myproject" style={{ textDecoration: "none" }}>
            <ListItem button key="My Project"
              onClick={() => {
                setIsColor("My Project")
              }}
              className={isColor == "My Project" ? ' staking-btn_active' : 'staking-btn text-white'}>

              <ListItemIcon>
                <HiMenuAlt4 color='blue' size={20} />
              </ListItemIcon>
              <ListItemText primary="My Projects" />
            </ListItem>
          </Link>
          <Link to="/sidebar/myprofile" style={{ textDecoration: "none" }}>
            <ListItem button key="My Account"
              onClick={() => {
                setIsColor("View Miner")
              }}
              className={isColor == "View Miner" ? ' staking-btn_active' : 'staking-btn text-white'}
            >
              <ListItemIcon>
                <RiAccountCircleFill color='blue' size={20} />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
          </Link>

          {/* <Link to="/mindar" style={{ textDecoration: "none" }}>
            <ListItem button key="WebAR"
              onClick={() => {
                setIsColor("WebAR")
              }}
              className={isColor == "WebAR" ? ' staking-btn_active' : 'staking-btn text-white'}
            >
              <ListItemIcon>
                <RiAccountCircleFill color='blue' size={20} />
              </ListItemIcon>
              <ListItemText primary="WebAR" />
            </ListItem>
          </Link> */}
        </List> :
          <>
          </>
      }


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ backgroundColor: "#fff", width: '100%' }}>

          <Typography style={{ color: "white", display: "flex", width: '100%' }} >
            <div style={{ width: '100%' }} >
              <Navbar collapseOnSelect expand="lg" sticky="top" variant="light" style={{ width: "100%", backgroundColor: '#fff' }} >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon style={{ color: "black" }} />
                </IconButton>
                <Navbar.Brand href="#home" className="newProject-span d-flex" >
                  <div
                  id="projectName"
                    contentEditable
                    suppressContentEditableWarning="true"
                    onBlur={e => {
                      console.log(e.currentTarget.textContent);
                      setEditData(e.currentTarget.textContent);
                      document.getElementById("projectName").style.border = "1px solid white"
                    }}

                  >
                    New AR Project Name
                  </div>
                  &nbsp;<FiEdit className='mt-2' size={15} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                  <Nav className=" nav  d-flex justify-content-evenly nav-one-width" >

                    {/* <Nav.Link href="" className={navColor == "save" ? 'nav-text-active' : "nav-text"} id="save" onClick={() => {
                      isNavColor("save")
                     
                      }} on>
                      
                      Save
                     
                    </Nav.Link>
                    <Nav.Link href="" className={navColor == "Preview" ? 'nav-text-active' : "nav-text"} id="Preview" onClick={() => isNavColor("Preview")} >Preview</Nav.Link>
                    <Nav.Link href="" className={navColor == "Publish" ? 'nav-text-active' : "nav-text"} id="Publish" onClick={() => isNavColor("Publish")}>Publish</Nav.Link> */}
                  </Nav>
                  <Nav className=' d-flex align-items-center justify-content-start'>
                    {/* <Nav.Link className='nav-text'><EmailIcon style={{ color: '#0e1a35' }} /></Nav.Link> */}
                    <Nav.Link className='nav-text'>
                      <Hello/>
                     
                      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                        Open Popover
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                      </Popover> */}
                      {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popovers} ><Badge badgeContent={totalProject} color="primary"><NotificationsIcon style={{ color: '#0e1a35' }} /> </Badge></OverlayTrigger> */}
                    </Nav.Link>
                    <Nav.Link href=""><OverlayTrigger trigger="click" placement="bottom" overlay={popover}><Stack ><Avatar src={two} /></Stack></OverlayTrigger></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </Typography>
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
          onClose={handleDrawerToggle}
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
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        style={{ backgroundColor: "#ecf0fd" }}
      >
        <Toolbar />
        <Routes>
          <Route exact path='/Homepage' element={<HomePage editData={editData} isNavColor={isNavColor} />} >
          </Route>
          <Route path="preview" element={<Preview />} isNavColor={isNavColor} />
          <Route path="publish" element={<Publish setIsColor={setIsColor} />} />
          <Route exact path="/myproject" element={<MyProject />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
          <Route exact path="/mindar" element={<div className="container121"><MindarViewer /><video></video></div>} />
        </Routes>
      </Box>
    </Box>
  );
}

const popover = (
  <Popover id="popover-basic" style={{ zIndex: '1111', width: '170px' }}>
    <Popover.Body>
      <span className='setting-span'><Link to="/sidebar/myprofile" style={{ textDecoration: "none", color: "black" }} ><MdSwitchAccount size={25} />My Account</Link></span>
      <br />
      <div className='setting-span mt-3'><Link to="/" onClick={() => { localStorage.clear() }} style={{ textDecoration: "none", color: "black" }}><ExitToAppIcon />Logout</Link></div>
    </Popover.Body>
  </Popover>
)


// const popovers = ({ projectName }) => (
//   <Popover id="popover-basic" style={{ zIndex: '1111', width: '160px' }}>
//     <Popover.Body>
//       {
//         projectName.map((items) => {
//           return (
//             <div className='setting-span'>Message 1</div>
//           )
//         })
//       }

//     </Popover.Body>
//   </Popover>
// )