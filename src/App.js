import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Protector } from './components';

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputBase,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors';

import Home from './pages/home';
import Memory from './pages/memory';

import { useMemories } from './libs/hooks/memory';
import Auth from './pages/auth';
import { useCookies } from 'react-cookie';
import { useAuth } from './libs/contexts/auth';

function App() {
  const [cookies] = useCookies()

  const { onLogout } = useAuth()
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
            <Grid container spacing={2}>
              <Grid item xs={10}>
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
              </Grid>
              <Grid item xs={2}>
                  {
                    cookies.accessToken ?
                      <Link
                        color="inherit"
                        component="button"
                        underline="hover"
                        variant="body2"
                        sx={{ml: 10, pt: '5px'}}
                        onClick={() => onLogout()}
                      >
                        Logout
                    </Link>
                    : null
                  }
              </Grid>
            </Grid>
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
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/:memoryID" element={<Memory />} />
            </Routes>
          </Container>
        </React.Fragment>
      </Box>
      </header>
    </div>
  );
}

export default App;
