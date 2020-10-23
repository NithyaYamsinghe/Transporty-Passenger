// IT18233704 - N.R Yamasinghe Version-01
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

class PasswordReset extends Component {
  static contextType = PassengerContext;
  state = {
    password: "................",
    confirmPassword: "...................",
    uiLoading: true,
    buttonLoading: false,
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
    const { password, confirmPassword } = this.state;
    this.context.passwordReset(password, confirmPassword);
  };

  render() {
    const { classes, ...rest } = this.props;
    const { uiLoading, password, confirmPassword, buttonLoading } = this.state;
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
                      value={password}
                      onChange={this.handleChange}
                      type="password"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      margin="dense"
                      name="confirmPassword"
                      variant="outlined"
                      value={confirmPassword}
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
            disabled={buttonLoading}
          >
            Save details
            {buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(PasswordReset);
