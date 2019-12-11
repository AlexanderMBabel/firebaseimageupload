import React, { useState } from 'react';
import axios from 'axios';
import fileBase from 'react-file-base64';
// import { fireBase } from ' ./firebase-config';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './App.css';

const defaultImage = 'https://picsum.image/300';
const apiUrl = 'http://localhost:4000';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    alignContent: 'center'
  },
  center: {
    textAlign: 'center'
  }
});

function App() {
  const [multerImage, setMulterImage] = useState(defaultImage);
  const [firebaseImage, setFirebaseImage] = useState(defaultImage);
  const [baseImage, setBaseImage] = useState(defaultImage);

  const classes = useStyles();
  // upload image

  const uploadImage = (e, method) => {
    console.log('hit');
    let imageObj = {};
    //upload via multer
    if (method === 'multer') {
      let imageFormObj = new FormData();
      imageFormObj.append('imageName', 'multer-image-' + Date.now());
      imageFormObj.append('imageData', e.target.files[0]);

      setMulterImage(URL.createObjectURL(e.target.files[0]));

      axios
        .post(`${apiUrl}/api/imageupload/uploadmulter`, imageFormObj)
        .then(data => {
          if (data.data.success) {
            alert('Imagehas been successfully uploaded using multer');
            setMulterImage(defaultImage);
          }
        })
        .catch(err => {
          alert('Error while uploading image using multer');
          setMulterImage(defaultImage);
        });
    }
  };
  return (
    <div>
      <Container>
        <Card className={classes.card}>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ height: '30vh' }}
          >
            <Grid item xs={3}>
              <Typography variant='h4' component='h4'>
                Upload an Image via Multer
              </Typography>
              <FormControl onSubmit={uploadImage('multer')}>
                <InputLabel htmlFor='add-multer-image'>Add an image</InputLabel>
                <Input
                  id='add-multer-image'
                  type='file'
                  onChange={e => uploadImage(e, 'multer')}
                ></Input>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  style={{
                    margin: 10
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}

export default App;
