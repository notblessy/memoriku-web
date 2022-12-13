import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestOnly, Navbar, Protector } from './components';

import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  InputBase,
  Toolbar,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors';

import Home from './pages/home';
import Memory from './pages/memory';

import { useMemories } from './libs/hooks/memory';
import Auth from './pages/auth';

function App() {
  const { onSearch } = useMemories();
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
          <InputBase
            sx={{
              ml: 1,
              width: '20%',
              color: blueGrey[50],
              borderBottom: 1,
              borderColor: blueGrey[200]
            }}
            placeholder="find memory"
            onChange={(event) => {
              onSearch(event.target.value);
            }}
          />
          </Toolbar>
        </AppBar>
        <React.Fragment>
          <Navbar />
          <Container maxWidth="sm" sx={{minWidth: '300px', margin: '0 auto', minHeight: '81vh'}}>
            <Routes>
              <Route element={<Protector />}>
                <Route path="/protected/memory" element="" />
                <Route path="/protected/category" element="" />
              </Route>
              <Route element={<GuestOnly />}>
                <Route path="/auth" element={<Auth />} />
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
