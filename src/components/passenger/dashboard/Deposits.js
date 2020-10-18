import React, { useContext } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { PassengerContext } from "./../../../context/PassengerContext";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const { balance } = useContext(PassengerContext);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Account Balance</Title>
      <Typography component="p" variant="h4">
        Rs.{balance}
      </Typography>
      <Typography
        color="textSecondary"
        className={classes.depositContext}
      ></Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
