import React from 'react';
import Moment from 'moment';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { blueGrey, red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { useCategory } from '../../libs/hooks/category';
import { useMemory } from '../../libs/hooks/memory';

export default function Home() {
  const { data: categories } = useCategory();
  const { data: memories } = useMemory();

  const drawerWidth = 240;

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
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={data.title}
                subheader={Moment(data.created_at).format('MMMM DD, YYYY')}
              />
              <CardMedia
                component="img"
                height="194"
                image={data.photo}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.body}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </React.Fragment>
        })}
      </Container>
    </React.Fragment>
  );
}
