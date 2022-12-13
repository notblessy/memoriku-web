import * as React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../libs/contexts/auth';
import { InputBase } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export default function Auth() {
  const { handleSubmit, register } = useForm();

  const { onLogin } = useAuth();
  const onSubmit = (data) => onLogin(data);

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 400, margin: '20vh auto', padding: 2 }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        login memoriku
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <InputBase
            sx={{
              mb: 2,
              px: 1,
              py: '3px',
              fontSize: 14,
              color: blueGrey[800],
              border: 1,
              borderColor: blueGrey[200],
              borderRadius: '3px'
            }}
            label="Email"
            fullWidth
            name="email"
            placeholder='Email'
            {...register('email')}
        />
        <div></div>
        <InputBase
            sx={{
              mb: 2,
              px: 1,
              py: '3px',
              fontSize: 14,
              color: blueGrey[800],
              border: 1,
              borderColor: blueGrey[200],
              borderRadius: '3px'
            }}
            label="Password"
            fullWidth
            name="password"
            type="password"
            placeholder='Password'
            {...register('password')}
        />
        <div></div>
        <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
          <Button
            style={{ width: '100%' }}
            variant="outlined"
            size="medium"
            color="inherit"
            sx={{borderColor: blueGrey[400], color: blueGrey[400]}}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
