// import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import moment from "moment";
// import { PassengerContext } from "./../../../context/PassengerContext";

// const columns = [
//   {
//     id: "date",
//     label: "Date",
//     minWidth: 170,
//   },
//   {
//     id: "time",
//     label: "Time",
//     minWidth: 170,
//   },

//   { id: "cost", label: "Cost", minWidth: 100 },
//   {
//     id: "distanceTravelled",
//     label: "Distance Travelled",
//     minWidth: 170,
//   },
//   {
//     id: "destination",
//     label: "Destination",
//     minWidth: 170,

//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "routeNo",
//     label: "Route No",
//     minWidth: 170,

//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: "startingPoint",
//     label: "Starting Point",
//     minWidth: 170,

//     format: (value) => value.toFixed(2),
//   },
// ];

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

// export default function JourneyTable() {
//   const { journeys } = useContext(PassengerContext);
//   function createData(
//     dateString,
//     costValue,
//     distanceTravelledValue,
//     destination,
//     routeNo,
//     startingPoint
//   ) {
//     var date = moment(dateString).format("YYYY-MM-DD");
//     var time = moment(dateString).format("hh:mm:ss a");
//     var cost = `${costValue}.00`;
//     var distanceTravelled = `${distanceTravelledValue} Km`;
//     return {
//       date,
//       time,
//       cost,
//       distanceTravelled,
//       destination,
//       routeNo,
//       startingPoint,
//     };
//   }
//   const rows = [];

//   journeys.forEach((journey) => {
//     if (journeys && journey) {
//       rows.push(
//         createData(
//           journey.date,
//           journey.cost,
//           journey.distanceTravelled,
//           journey.routeTaken.destination,
//           journey.routeTaken.routeNo,
//           journey.routeTaken.startingPoint
//         )
//       );
//     }
//   });

//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === "number"
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

import React, { useContext } from "react";
import { PassengerContext } from "./../../../context/PassengerContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import moment from "moment";

const JourneyTable = () => {
  const { timeTable, journeys, deleteJourney } = useContext(PassengerContext);
  console.log(timeTable);
  return (
    <table className="table table-stripped responsive">
      <thead className="thead-light ">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Cost</th>
          <th>Distance</th>
          <th>Destination</th>
          <th>Route Number</th>
          <th>Starting Point</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(journeys).map((id) => {
          return (
            <tr key={id}>
              <td>{moment(journeys[id].date).format("YYYY-MM-DD")}</td>
              <td>{moment(journeys[id].date).format("hh:mm:ss a")}</td>
              <td>{journeys[id].cost}</td>
              <td>{journeys[id].distanceTravelled}</td>
              <td>{journeys[id].routeTaken.destination}</td>
              <td>{journeys[id].routeTaken.routeNo}</td>
              <td>{journeys[id].routeTaken.startingPoint}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deleteJourney(journeys[id].key);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default JourneyTable;
