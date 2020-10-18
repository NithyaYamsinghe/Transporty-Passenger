import React, { useContext } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { PassengerContext } from "../../../context/PassengerContext";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Journeys() {
  const { journeys } = useContext(PassengerContext);
  const classes = useStyles();
  function createData(
    dateString,
    costValue,
    distanceTravelledValue,
    destination,
    routeNo,
    startingPoint
  ) {
    var date = moment(dateString).format("YYYY-MM-DD");
    var time = moment(dateString).format("hh:mm:ss a");
    var cost = `${costValue}.00`;
    var distanceTravelled = `${distanceTravelledValue} Km`;
    return {
      date,
      cost,
      destination,
      routeNo,
      startingPoint,
    };
  }

  const rows = [];

  journeys.forEach((journey) => {
    if (journeys && journey) {
      rows.push(
        createData(
          journey.date,
          journey.cost,
          journey.distanceTravelled,
          journey.routeTaken.destination,
          journey.routeTaken.routeNo,
          journey.routeTaken.startingPoint
        )
      );
    }
  });

  var newRows = [];
  newRows = rows.slice(0, 6);

  return (
    <React.Fragment>
      <Title>Recent Journeys</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Route No</TableCell>
            <TableCell>Starting Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newRows.map((row) => (
            <TableRow>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.cost}</TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>{row.routeNo}</TableCell>
              <TableCell>{row.startingPoint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}
