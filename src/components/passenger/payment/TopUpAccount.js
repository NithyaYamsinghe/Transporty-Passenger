import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Checkout from "./Checkout";
import Coupon from "./Coupon";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class TopUpAccount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <br />
        <Typography paragraph>
          <Checkout />
          <Coupon />
        </Typography>
      </main>
    );
  }
}

export default withStyles(styles)(TopUpAccount);
