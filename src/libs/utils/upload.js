import api from './api';

const uploadImage = async (file) => {
  if (!file) {
    throw Error('[uploadImage.js] File is required!');
  }

  const formData = new FormData();
  formData.append('file', file);

  const { data: res } = await api.post('/cms/upload', formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
  return res.data;
};

export default uploadImage;
