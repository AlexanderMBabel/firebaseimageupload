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

const defaultImage = 'https://picsum.photos/300';
const apiUrl = 'http://localhost:4000';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
    margin: 35
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
      console.log(URL.createObjectURL(e.target.files[0]));
      setMulterImage(URL.createObjectURL(e.target.files[0]));

      axios
        .post(`${apiUrl}/api/imageupload/uploadmulter`, imageFormObj)
        .then(data => {
          if (data.data.success) {
            console.log(data.data.document.imageData);
            // setMulterImage(data.data.document.imageData);
          }
        })
        .catch(err => {
          alert('Error while uploading image using multer');
          setMulterImage(defaultImage);
        });
    }
    //  else if (method === 'firebase') {
    //   let currentImageName = 'firebase-image-' + Date.now();

    //   let uploadImage = storage
    //     .ref(`images/${currentImageName}`)
    //     .put(e.target.files[0]);

    //   uploadImage.on(
    //     'state_changed',
    //     snapshot => {},
    //     error => {
    //       alert(error);
    //     },
    //     () => {
    //       storage
    //         .ref('images')
    //         .child(currentImageName)
    //         .getDownloadURL()
    //         .then(url => {
    //           this.setState({
    //             firebaseImage: url
    //           });

    //           // store image object in the database
    //           imageObj = {
    //             imageName: currentImageName,
    //             imageData: url
    //           };

    //           axios
    //             .post(`${API_URL}/image/uploadbase`, imageObj)
    //             .then(data => {
    //               if (data.data.success) {
    //                 alert(
    //                   'Image has been successfully uploaded using firebase storage'
    //                 );
    //                 this.setDefaultImage('firebase');
    //               }
    //             })
    //             .catch(err => {
    //               alert('Error while uploading image using firebase storage');
    //               this.setDefaultImage('firebase');
    //             });
    //         });
    //     }
    //   );
    // }
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
            style={{ height: '50vh' }}
          >
            <Grid item xs={3}>
              <Typography variant='h4' component='h4'>
                Upload an Image via Multer
              </Typography>
              <FormControl>
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
              <img src={multerImage} alt='multer' style={{ width: 300 }} />
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.card}>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ height: '50vh' }}
          >
            <Grid item xs={3}>
              <Typography variant='h4' component='h4'>
                Upload an Image via Firebase
              </Typography>
              <FormControl>
                <InputLabel htmlFor='add-firebase-image'>
                  Add an image
                </InputLabel>
                <Input
                  id='add-firebase-image'
                  type='file'
                  onChange={e => uploadImage(e, 'firebase')}
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
              <img src={firebaseImage} alt='firebase' style={{ width: 300 }} />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}

export default App;
