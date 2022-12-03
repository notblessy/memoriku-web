import React, { useState } from 'react';
import Moment from 'moment';

import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { blueGrey, grey } from '@mui/material/colors';

import { useCategory } from '../../libs/hooks/category';
import { useMemory } from '../../libs/hooks/memory';

export default function Home() {
  const { data: categories } = useCategory();
  const { data: memories } = useMemory();

  const drawerWidth = 240;

  const [isRead, setRead] = useState(false);

  const handleReadMore = () => setRead();

  return (
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
      
      <Container maxWidth="sm" sx={{minWidth: '300px', margin: '8% auto'}}>
        {memories?.records?.map(data => {
          return <React.Fragment>
            <Card sx={{ width: '100%', mb: 2}}>
              <Box sx={{px: '16px'}}>
                <Typography variant='h5' sx={{pt: 2, pb: 1, color: grey[700]}}>{data.title}</Typography>
                <Typography variant='caption'  sx={{ background: grey[500], p: '5px', color: '#FFF', fontSize: 10}}>{Moment(data.created_at).format('MMMM DD, YYYY')}</Typography>
              </Box>
              <CardContent sx={{pt: 0}}>
                <Typography variant="caption" color="text.secondary">
                  {data.body?.length > 150 ?
                    <p dangerouslySetInnerHTML={{ __html: data.body?.slice(0, 250) + "..." }}></p>
                  :
                    <p dangerouslySetInnerHTML={{ __html: data.body}}></p>
                  }
                  <Button variant="text" color='inherit' size='small' sx={{borderRadius: 0, border: '1px'}} onClick={setRead}>read more</Button>
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        })}
      </Container>
    </React.Fragment>
  );
}
