import React, { useEffect } from 'react';

import {
  Card,
  CardMedia,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMemories } from '../../libs/hooks/memory';
import { useForm } from 'react-hook-form';
import { useCategories } from '../../libs/hooks/category';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadImage from '../../libs/utils/upload';
import useToast from '../../libs/contexts/toast';


export default function CreateMemory() {
  const { handleSubmit, register, setValue, watch } = useForm();

  const [categoryOption, setCategory] = React.useState("");
  const [isUploading, setUploadStatus] = React.useState(false);
  const [picturePreview, setPreview] = React.useState('');

  const toast = useToast()

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

  const fileInput = React.useRef();

  const handleUpload = ({ target }) => {
    setUploadStatus(true);
    uploadImage(target.files[0])
      .then((res) => {
        setValue('photo', res);
        setPreview(res);
      })
      .catch(() => {
        toast('error', 'Gagal menunggah foto!');
      })
      .finally(() => {
        setUploadStatus(false);
      });
  };

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
              <LoadingButton
                loading={isUploading ? isUploading : false}
                style={{ width: '100%' }}
                variant="outlined"
                size="medium"
                color="inherit"
                onClick={()=>fileInput.current.click()}
              >
                Upload Photo
              </LoadingButton>
              <input 
                ref={fileInput} 
                type="file" 
                style={{ display: 'none' }}
                onChange={handleUpload}
                onClick={(e) => (e.target.value = null)}
              />
              <div></div>   
              {
                picturePreview ?
                  <CardMedia
                    component="img"
                    height="194"
                    image={picturePreview}
                    alt="Paella dish"
                    sx={{my: 3}}
                  />
                : null
              }

              <div></div>
              <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
                <LoadingButton
                  loading={loading ? loading : false}
                  style={{ width: '100%' }}
                  variant="outlined"
                  size="medium"
                  color="inherit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Card>
    </React.Fragment>
  );
}
