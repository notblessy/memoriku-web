import React from 'react';
import Moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

import { useMemory } from '../../libs/hooks/memory';

const itemStyles = {
    fontSize: 12,
    color: grey[700],
};

const listStyles = {
    paddingLeft: 20
};


export default function Memory() {
  const params = useParams()
  const navigateTo = useNavigate()

  const { data: memory } = useMemory(params.memoryID);

  return (
    <React.Fragment>
        <Button
            sx={{borderRadius: 0, p: 0, textTransform: 'lowercase', color: grey[700]}}
            onClick={() => navigateTo(-1)}
            size="small"
            color="inherit"
        >
            go back
        </Button>
        <Button
            sx={{borderRadius: 0, p: 0, textTransform: 'lowercase', color: grey[700]}}
            onClick={() => navigateTo(`/edit/${memory.id}`)}
            size="small"
            color="inherit"
        >
            edit
        </Button>
        <Card key={memory.id} sx={{ width: '100%', mb: 2}}>
            {memory.photo ? 
                <CardMedia
                    component="img"
                    height="194"
                    image={memory.photo}
                    alt="Paella dish"
                />
                :
                null
            }
            <Box sx={{px: '16px'}}>
                <Typography variant='h5' sx={{pt: 2, pb: 1, color: grey[700]}}>{memory.title}</Typography>
                <Typography variant='caption'  sx={{ background: grey[500], p: '5px', color: '#FFF', fontSize: 10}}>{Moment(memory.created_at).format('MMMM DD, YYYY')}</Typography>
            </Box>
            <CardContent sx={{pt: 0}}>
                <Typography variant="caption" color="text.secondary">
                    <div dangerouslySetInnerHTML={{ __html: memory.body }}></div>
                </Typography>
                {memory.memory_references !== [] ?
                    <Box>
                        <Typography variant="caption" color="text.secondary">references:</Typography>
                        <Typography>
                            <ul style={listStyles}>
                                {memory.memory_references?.map(ref => {
                                return <li style={itemStyles}><Link href={"https://" + ref.link} underline='hover' color='inherit' target="_blank" rel="noopener noreferrer">{ref.title}</Link></li>
                                })}
                            </ul>
                        </Typography>
                    </Box>
                    :
                    null
                }
                {memory.tags !== [] ?
                    <Box>
                        <Typography variant="caption" color="text.secondary">tags:</Typography>
                        <Box sx={{ mb: 2}}>
                            {memory.tags?.map(tag => {
                                return <Chip label={tag.name} variant="outlined" sx={{mr: 1, mt: 2}} />
                            })}
                        </Box>
                    </Box>
                    :
                    null
                }
            </CardContent>
        </Card>
    </React.Fragment>
  );
}
