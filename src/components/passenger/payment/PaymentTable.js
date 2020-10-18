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

// import { PassengerContext } from "./../../../context/PassengerContext";

// const columns = [
//   {
//     id: "cardName",
//     label: "Card Name",
//     minWidth: 170,
//   },
//   {
//     id: "cardNumber",
//     label: "Card Number",
//     minWidth: 170,
//   },

//   { id: "amount", label: "Amount", minWidth: 100 },
//   {
//     id: "firstName",
//     label: "First Name",
//     minWidth: 170,
//   },
//   {
//     id: "lastName",
//     label: "Last Name",
//     minWidth: 170,

//     format: (value) => value.toLocaleString("en-US"),
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

// export default function PaymentTable() {
//   const { payments } = useContext(PassengerContext);
//   function createData(cardName, cardNumber, amountValue, firstName, lastName) {
//     var amount = `${amountValue}.00`;

//     return {
//       cardName,
//       cardNumber,
//       amount,
//       firstName,
//       lastName,
//     };
//   }
//   const rows = [];

//   payments.forEach((payment) => {
//     if (payments && payment) {
//       rows.push(
//         createData(
//           payment.cardName,
//           payment.cardNumber,
//           payment.amount,
//           payment.firstName,
//           payment.lastName
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

const PaymentTable = () => {
  const { payments, deletePayment } = useContext(PassengerContext);
  console.log(payments);
  return (
    <table className="table table-stripped responsive">
      <thead className="thead-light ">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Card Name</th>
          <th>Card Number</th>
          <th>Amount</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(payments).map((id) => {
          return (
            <tr key={id}>
              <td>{moment(payments[id].date).format("YYYY-MM-DD")}</td>
              <td>{moment(payments[id].date).format("hh:mm:ss a")}</td>
              <td>{payments[id].cardName}</td>
              <td>{payments[id].cardNumber}</td>
              <td>{payments[id].amount}</td>
              <td>{payments[id].firstName}</td>
              <td>{payments[id].lastName}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deletePayment(payments[id].key);
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

export default PaymentTable;
