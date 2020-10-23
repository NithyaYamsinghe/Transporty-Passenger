// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import clsx from "clsx";
import SendIcon from "@material-ui/icons/Send";
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

class ComplaintForm extends Component {
  static contextType = PassengerContext;
  state = {
    routeNo: "",
    vehicleNo: "",
    complaint: "",
    Date: "",
    uiLoading: false,
    buttonLoading: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    const { routeNo, vehicleNo, complaint, date } = this.state;
    try {
      this.context.sendComplaints(routeNo, vehicleNo, complaint, date);
      this.setState({ routeNo: "", vehicleNo: "", complaint: "", date: "" });
    } catch (error) {}
  };

  render() {
    const {
      uiLoading,
      routeNo,
      vehicleNo,
      complaint,
      date,
      buttonLoading,
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
                      label="Route Number"
                      margin="dense"
                      name="routeNo"
                      variant="outlined"
                      value={routeNo}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Vehicle Number"
                      margin="dense"
                      name="vehicleNo"
                      type="text"
                      variant="outlined"
                      value={vehicleNo}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      margin="dense"
                      name="date"
                      variant="outlined"
                      value={date}
                      type="date"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      id="outlined-multiline-static"
                      label="Complaint"
                      margin="dense"
                      name="complaint"
                      variant="outlined"
                      value={complaint}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions />
            </form>
          </Card>
          <br />
          <Button
            type="submit"
            className={classes.submitButton}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={this.updateFormValues}
            disabled={buttonLoading}
          >
            Send
            {buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </main>
      );
    }
  }
}
export default withStyles(styles)(ComplaintForm);
