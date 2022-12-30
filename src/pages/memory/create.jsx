import React, { useEffect } from 'react';

import {
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { useMemories } from '../../libs/hooks/memory';
import { useForm } from 'react-hook-form';
import { useCategories } from '../../libs/hooks/category';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreateMemory() {
  const { handleSubmit, register, setValue, watch } = useForm();

  const [categoryOption, setCategory] = React.useState("");

  const { data: categories } = useCategories();

  const { onAdd, loading } = useMemories();

  useEffect(() => {
    register("body", { required: true });
  }, [register]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const onSubmit = (data) => {
    onAdd(data);
  };

  const onBodyChange = (editorState) => {
    setValue("body", editorState)
  }
  const bodyState = watch("body");


  return (
    <React.Fragment>
        <Card key="create" sx={{ width: '100%', mb: 2}}>
          <Box
            role="presentation"
            sx={{
              py: 4,
              px: 2,
              width: 500,
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new memory
            </Typography>
            <div></div>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                sx={{ mb: 2 }}
                id="standard-required"
                label="Title"
                fullWidth
                name="title"
                variant="standard"
                {...register('title')}
              />
              <div></div>
              <TextField
                id="standard-select-currency"
                select
                fullWidth
                label="Category"
                value={categoryOption}
                onChange={handleChange}
                variant="standard"
                inputProps={register('category_id', {
                  required: 'Please enter category',
                })}
                sx={{ mb: 4 }}
              >
                {categories?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <div></div>
             <Box sx={{mb: 2}}>
              <ReactQuill
                  theme="snow"
                  placeholder='write memory...'
                  value={bodyState}
                  onChange={onBodyChange}
                />
              </Box>
              <div></div>
              <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
                {loading ? (
                  <Button
                    loading={loading.toString()}
                    loadingPosition="start"
                    style={{ width: '100%' }}
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    style={{ width: '100%' }}
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Card>
    </React.Fragment>
  );
}
