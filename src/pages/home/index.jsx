import React from 'react';
import Moment from 'moment';

import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

import { useMemories } from '../../libs/hooks/memory';

export default function Home() {
  const { data: memories } = useMemories();
  console.log(memories)

  return (
    memories?.records?.map(data => {
      return <React.Fragment>
        <Card key={data.id} sx={{ width: '100%', mb: 2}}>
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
              <Link href={data.id} color='inherit' underline='hover'>read more</Link>
            </Typography>
          </CardContent>
        </Card>
        
      </React.Fragment>
    })
  );
}
