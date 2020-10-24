// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
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
import { PassengerContext } from "./../../../context/PassengerContext";

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
  static contextType = PassengerContext;
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    NIC: "",
    passportNo: "",
    isForeigner: false,
    profilePicture: "",
    uiLoading: true,
    buttonLoading: false,
    imageError: "",
    balance: 0,
  };

  componentDidMount = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      NIC,
      balance,
      passportNo,
      isForeigner,
    } = this.context;

    this.setState({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      NIC: NIC,
      balance: balance,
      passportNo: passportNo,
      isForeigner: isForeigner,
    });

    this.setState({ uiLoading: false });
  };

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
    this.context.updateProfilePicture(image);
    this.setState({
      uiLoading: false,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    const { firstName, lastName, username, phoneNumber } = this.state;
    try {
      this.context.updateAccount(firstName, lastName, username, phoneNumber);
    } catch (error) {}
  };

  render() {
    const { progress, progressVisible } = this.context;
    const {
      uiLoading,
      firstName,
      lastName,
      username,
      email,
      NIC,
      phoneNumber,
      buttonLoading,
      passportNo,
      isForeigner,
    } = this.state;
    const { classes, ...rest } = this.props;
    if (uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card {...rest} className={clsx(classes.root, classes)}>
            {isForeigner && (
              <Alert severity="info">This is a temporay account</Alert>
            )}
            <CardContent>
              <div className={classes.details}>
                <div>
                  <Typography
                    className={classes.locationText}
                    gutterBottom
                    variant="h4"
                  >
                    {firstName} {lastName}
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
                      value={firstName}
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
                      value={lastName}
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
                      value={username}
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
                      value={phoneNumber}
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
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    {NIC !== "" ? (
                      <TextField
                        fullWidth
                        label="NIC"
                        margin="dense"
                        name="NIC"
                        variant="outlined"
                        disabled={true}
                        value={NIC}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        label="Passport No"
                        margin="dense"
                        name="passportNo"
                        variant="outlined"
                        disabled={true}
                        value={passportNo}
                        onChange={this.handleChange}
                      />
                    )}
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
            disabled={buttonLoading}
          >
            Save details
            {buttonLoading && (
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
