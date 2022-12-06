import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestOnly, Protector } from './components';

import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors';

import Home from './pages/home';
import Memory from './pages/memory';

import { useCategory } from './libs/hooks/category';

function App() {
  const { data: categories } = useCategory();
  const drawerWidth = 240;

  return (
    <div className="App">
      <header className="App-header">
      <Box sx={{ display: 'flex', background: blueGrey[100], height: '100%',pt: 12, pb: 5 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: blueGrey[700] }}
        >
          <Toolbar>
            {/* <Typography variant="h6" noWrap component="div">
              memoriku
            </Typography> */}
          </Toolbar>
        </AppBar>
        <React.Fragment>    
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar 
              sx={{ bgcolor: blueGrey[700] }}
            >
              <Typography variant="h6"  sx={{ color: blueGrey[50] }} noWrap component="div">
                memoriku
              </Typography>
            </Toolbar>
            <Divider />
            {categories?.map(data => {
              return <React.Fragment>
                <List sx={{ bgcolor: blueGrey[50] }}>
                  <Typography variant="button" align="left" component="div" sx={{ ml: 2 }}>
                    {data.group_id}
                  </Typography>
                </List>
                <Divider />
              {data.categories?.map(cat => {
                return  <List sx={{p: 0}}>
                    <ListItem key={cat.value} disablePadding>
                      <ListItemButton>
                        {/* <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon> */}
                        <ListItemText primary={cat.label} />
                      </ListItemButton>
                    </ListItem>
                </List>
              })}

              <Divider />
              </React.Fragment>
            })}
          </Drawer>  
          <Container maxWidth="sm" sx={{minWidth: '300px', margin: '0 auto', minHeight: '81vh'}}>
            <Routes>
              <Route element={<Protector />}>
                <Route path="/protected/memory" element="" />
                <Route path="/protected/category" element="" />
              </Route>
              <Route element={<GuestOnly />}>
                <Route path="/auth" element="" />
                <Route path="/" element={<Home />} />
                <Route path="/:memoryID" element={<Memory />} />
              </Route>
            </Routes>
          </Container>
        </React.Fragment>
      </Box>
      </header>
    </div>
  );
}

export default App;
