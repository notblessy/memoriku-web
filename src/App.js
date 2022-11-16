import { Route, Routes } from 'react-router-dom';

import {
  AppBar,
  Box,
  Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material'
import { GuestOnly, Protector } from './components';
import { useCategory } from './libs/hooks/category';
import React from 'react';
import { blueGrey, red } from '@mui/material/colors';
import Home from './pages/home';

function App() {
  const drawerWidth = 240;

  return (
    <div className="App">
      <header className="App-header">
      <Box sx={{ display: 'flex', background: blueGrey[100] }}>
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
        <Routes>
            <Route element={<Protector />}>
              <Route path="/wallets" element="" />
              <Route path="/profile" element="" />
              <Route path="/budgets" element="" />
            </Route>
            <Route element={<GuestOnly />}>
              <Route path="/auth" element="" />
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
      </Box>
      </header>
    </div>
  );
}

export default App;
