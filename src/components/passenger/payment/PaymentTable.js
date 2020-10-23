// IT18233704 - N.R Yamasinghe Version-01
import React, { useContext } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { PassengerContext } from "./../../../context/PassengerContext";

const PaymentTable = () => {
  const { sortedPayments, deletePayment } = useContext(PassengerContext);
  return (
    <React.Fragment>
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
          {Object.keys(sortedPayments).map((id) => {
            return (
              <tr key={id}>
                <td>{moment(sortedPayments[id].date).format("YYYY-MM-DD")}</td>
                <td>{moment(sortedPayments[id].date).format("hh:mm:ss a")}</td>
                <td>{sortedPayments[id].cardName}</td>
                <td>{sortedPayments[id].cardNumber}</td>
                <td>{sortedPayments[id].amount}</td>
                <td>{sortedPayments[id].firstName}</td>
                <td>{sortedPayments[id].lastName}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      deletePayment(sortedPayments[id].key);
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
    </React.Fragment>
  );
};
export default PaymentTable;
