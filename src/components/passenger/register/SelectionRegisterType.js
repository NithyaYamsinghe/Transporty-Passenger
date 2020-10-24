import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Button from "./../../common/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SelectionRegisterType() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <center>
        <div div className={classes.root} style={{ marginTop: "300px" }}>
          <Link to="/registerForeigner" style={{ textDecoration: "none" }}>
            {/* <Button variant="contained" color="primary"> */}
            <Button label={"Foreign Passenger"}> Foreign Passenger</Button>

            {/* </Button> */}
          </Link>

          <Link to="/register" style={{ textDecoration: "none" }}>
            {/* <Button variant="contained" color="primary">
              Local
            </Button> */}
            <Button label={"Local Passenger"}>Local Passenger</Button>
          </Link>
        </div>
      </center>
    </React.Fragment>
  );
}
