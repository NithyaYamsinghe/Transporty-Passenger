import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
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

class PasswordReset extends Component {
  state = {
    password: "................",
    confirmPassword: "...................",
    uiLoading: true,
    buttonLoading: false,
    imageError: "",
    balance: 0,
    progress: 0,
  };

  componentWillMount = () => {
    this.setState({
      uiLoading: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({ buttonLoading: true });
    const { password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      var user = firebaseApp.auth().currentUser;
      user
        .updatePassword(password)
        .then(function () {
          console.log("password updated");
        })
        .catch(function (error) {
          // An error happened.
        });
    } else {
    }
  };

  render() {
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
        <div>
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
                      label="Password"
                      margin="dense"
                      name="password"
                      variant="outlined"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      margin="dense"
                      name="confirmPassword"
                      variant="outlined"
                      value={this.state.confirmPassword}
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
            disabled={!this.state.buttonLoading}
          >
            Save details
            {this.state.buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(PasswordReset);
