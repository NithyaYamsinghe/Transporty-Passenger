import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgressWithLabel from "@material-ui/core/LinearProgress";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import PasswordReset from "./PasswordReset";
import firebaseApp from "./../../../firebase/firebase";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  locationText: {
    paddingLeft: "15px",
  },
  buttonProperty: {
    position: "absolute",
    top: "50%",
  },
  uiProgess: {
    position: "fixed",
    zIndex: "1000",
    height: "31px",
    width: "31px",
    left: "50%",
    top: "35%",
  },
  progess: {
    position: "absolute",
  },
  uploadButton: {
    marginLeft: "8px",
    margin: theme.spacing(1),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  submitButton: {
    marginTop: "10px",
  },
});

class Account extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    NIC: "",
    profilePicture: "",
    uiLoading: true,
    buttonLoading: false,
    imageError: "",
    balance: 0,
    progress: 0,
    progressVisible: false,
  };

  componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      var id = user.uid;
      var ref = firebaseApp.database().ref("passengers");
      ref.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === id) {
            var data = childData;
            console.log(data);
            this.setState({
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              NIC: data.NIC,
              balance: data.balance,
            });
          }
        });
      });
    });
    this.setState({ uiLoading: false });
  };

  // componentWillMount = () => {
  //   this.setState({
  //     uiLoading: false,
  //   });
  // };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImageChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  profilePictureHandler = (event) => {
    event.preventDefault();
    this.setState({
      uiLoading: true,
    });
    const { image } = this.state;
    const uploadTask = firebaseApp
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        this.setState({ progressVisible: true });
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress, progressVisible: true });
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebaseApp
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firebaseApp.auth().onAuthStateChanged((user) => {
              var id = user.uid;
              var query = firebaseApp
                .database()
                .ref("passengers")
                .orderByChild("userId")
                .equalTo(id);
              query.once("child_added", (snapshot) => {
                snapshot.ref.update({ image: url });
              });
            });
          });
        this.setState({ progressVisible: false, image: "" });
      }
    );
    this.setState({
      uiLoading: false,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({ buttonLoading: true });
    firebaseApp.auth().onAuthStateChanged((user) => {
      var id = user.uid;

      var query = firebaseApp
        .database()
        .ref("passengers")
        .orderByChild("userId")
        .equalTo(id);
      query
        .once("child_added", (snapshot) => {
          snapshot.ref.update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            phoneNumber: this.state.phoneNumber,
          });
        })
        .then(() => {});
    });
    this.setState({ buttonLoading: false });
  };

  render() {
    const { progress, progressVisible } = this.state;
    const { classes, ...rest } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <CardContent>
              <div className={classes.details}>
                <div>
                  <Typography
                    className={classes.locationText}
                    gutterBottom
                    variant="h4"
                  >
                    {this.state.firstName} {this.state.lastName}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    size="small"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}
                    onClick={this.profilePictureHandler}
                  >
                    Upload Photo
                  </Button>
                  <input type="file" onChange={this.handleImageChange} />
                  {progressVisible && (
                    <LinearProgressWithLabel value={progress} />
                  )}
                  {this.state.imageError ? (
                    <div className={classes.customError}>
                      Wrong Image Format || Supported Format are PNG and JPG
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
            <Divider />
          </Card>{" "}
          <br />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <form
              autoComplete="off"
              noValidate
              onSubmit={this.updateFormValues}
            >
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="First name"
                      margin="dense"
                      name="firstName"
                      variant="outlined"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      margin="dense"
                      name="lastName"
                      variant="outlined"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="User Name"
                      margin="dense"
                      name="username"
                      variant="outlined"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      margin="dense"
                      name="phoneNumber"
                      type="number"
                      variant="outlined"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      margin="dense"
                      name="email"
                      disabled={true}
                      variant="outlined"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="NIC"
                      margin="dense"
                      name="country"
                      variant="outlined"
                      disabled={true}
                      value={this.state.NIC}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions />
            </form>
          </Card>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitButton}
            onClick={this.updateFormValues}
            disabled={this.state.buttonLoading}
          >
            Save details
            {this.state.buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
          <br />
          <br />
          <PasswordReset />
        </main>
      );
    }
  }
}
export default withStyles(styles)(Account);
