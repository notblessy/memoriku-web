import { Route, Routes } from 'react-router-dom';

import {
  AppBar,
  Box,
  Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material'
import { GuestOnly, Protector } from './components';
import { useCategory } from './libs/hooks/category';
import React from 'react';
import { blueGrey } from '@mui/material/colors';

const drawerWidth = 240;

function App() {
  const { data: categories } = useCategory()

  return (
    <div className="App">
      <header className="App-header">
      <Container maxWidth="xs" sx={{ px: 1, pb: 20 }}>
          <Routes>
            <Route element={<Protector />}>
              <Route path="/wallets" element="" />
              <Route path="/profile" element="" />
              <Route path="/budgets" element="" />
            </Route>
            <Route element={<GuestOnly />}>
              <Route path="auth" element="" />
            </Route>
          </Routes>
        </Container>
        <Box sx={{ display: 'flex' }}>
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
    </Box>
      </header>
    </div>
  );
}

export default App;
