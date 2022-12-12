import React from 'react';
import Moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import {
  Card,
  CardContent,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { blueGrey, grey } from '@mui/material/colors';

import { useMemories } from '../../libs/hooks/memory';
import { useEffect } from 'react';

export default function Home() {
  const { data: memories, onChangePage, paging, loading } = useMemories();

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight &&
      !paging.hasNext && paging.page !== 0
    ) {
      onChangePage(paging.page + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  })

  return <React.Fragment>
    {
      memories?.map(data => {
        return <React.Fragment key={data.id} >
          <Card sx={{ width: '100%', mb: 2}}>
            <Box sx={{px: '16px'}}>
              <Typography variant='h5' sx={{pt: 2, pb: 1, color: grey[700]}}>
                  <Link href={data.id} underline='hover' color="inherit">{data.title}</Link>
              </Typography>
              <Typography variant='caption'  sx={{ background: grey[500], p: '5px', color: '#FFF', fontSize: 10}}>{Moment(data.created_at).format('MMMM DD, YYYY')}</Typography>
            </Box>
            <CardContent sx={{pt: 0}}>
              <Typography variant="caption" color="text.secondary">
                {data.body?.length > 150 ?
                  <p dangerouslySetInnerHTML={{ __html: data.body?.slice(0, 250) + "..." }}></p>
                :
                  <p dangerouslySetInnerHTML={{ __html: data.body}}></p>
                }
                <Link href={data.id} color={grey[800]} underline='hover'>read more</Link>
              </Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      })
    }
    {
      !paging.hasNext && paging.page === 0 ?
        <Typography align="center" variant="caption" display="block" sx={{color: blueGrey[700]}} gutterBottom>
          no more data
        </Typography>
      : null
    }
    {
      loading ? 
        <Stack justifyContent="center" sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress size={20} color="inherit" />
        </Stack>
      : null
    }
  </React.Fragment>
}
