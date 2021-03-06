// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PassengerContext } from "./../../../context/PassengerContext";
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

class Coupon extends Component {
  static contextType = PassengerContext;
  state = {
    couponNo: "",
    amount: "",
    uiLoading: false,
    buttonLoading: false,
    imageError: "",
    balance: 0,
    progress: 0,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    const { amount, couponNo } = this.state;
    const amountFloat = parseFloat(amount);
    const rechargeData = {
      amount: amountFloat,
      couponNo: couponNo,
    };
    this.context.rechargeAccountCoupon(rechargeData);
    this.context.updateBalance(amount, this.context.id);
  };

  render() {
    const { classes, ...rest } = this.props;
    const { uiLoading, couponNo, amount, buttonLoading } = this.state;
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
                      label="Coupon Number"
                      margin="dense"
                      name="couponNo"
                      variant="outlined"
                      value={couponNo}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Amount"
                      margin="dense"
                      name="amount"
                      variant="outlined"
                      value={amount}
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
            disabled={
              this.state.buttonLoading ||
              !this.state.amount ||
              !this.state.couponNo
            }
          >
            Recharge
            {buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Coupon);
