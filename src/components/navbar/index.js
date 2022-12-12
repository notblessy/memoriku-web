import React from 'react';
import { Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useCategory } from '../../libs/hooks/category';
import { useMemories } from '../../libs/hooks/memory';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  const drawerWidth = 240;

  const navigate = useNavigate()
  const { data: categories } = useCategory();
  const { onFilter } = useMemories()

  return <React.Fragment>
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
        <Link component="button" onClick={() => navigate('/')} underline="none">
            <Toolbar 
                sx={{ bgcolor: blueGrey[700] }}
            >
                <Typography variant="h6"  sx={{ color: blueGrey[50] }} noWrap component="div">memoriku</Typography>

            </Toolbar>
        </Link>
        <Divider />
        {categories?.map(data => {
            return <React.Fragment key={data.group_id} > 
            <List sx={{ bgcolor: blueGrey[50] }}>
                <Typography variant="button" align="left" component="div" sx={{ ml: 2 }}>
                {data.group_id}
                </Typography>
            </List>
            <Divider />
            {data.categories?.map(cat => {
            return  <List key={cat.value} sx={{p: 0}}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => onFilter(cat.value)}>
                        <ListItemText primary={cat.label}/>
                    </ListItemButton>
                </ListItem>
            </List>
            })}

            <Divider />
        </React.Fragment>
        })}
    </Drawer>  
  </React.Fragment>
}

export default Navbar;

 