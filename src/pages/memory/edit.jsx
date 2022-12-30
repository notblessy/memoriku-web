import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Card,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

import { useMemory } from '../../libs/hooks/memory';


export default function EditMemory() {
  const params = useParams()

  const { data: memory } = useMemory(params.memoryID);

  return (
    <React.Fragment>
        <Card key={memory.id} sx={{ width: '100%', mb: 2}}>
            <Box sx={{px: '16px'}}>
                <Typography variant='h5' sx={{pt: 2, pb: 1, color: grey[700]}}>{memory.title}</Typography>
            </Box>
        </Card>
    </React.Fragment>
  );
}
