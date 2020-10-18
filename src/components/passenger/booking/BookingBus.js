import React, { useContext } from "react";
import { PassengerContext } from "./../../../context/PassengerContext";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const BookingBus = () => {
  const { timeTable, bookingBus } = useContext(PassengerContext);
  console.log(timeTable);
  return (
    <table className="table table-stripped responsive">
      <thead className="thead-light ">
        <tr>
          <th>Day</th>
          <th>Driver Name</th>
          <th>End Time</th>
          <th>Route Number</th>
          <th>Start Time</th>
          <th>Vehicle Number</th>
          <th>Booking</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(timeTable).map((id) => {
          return (
            <tr key={id}>
              <td>{timeTable[id].day}</td>
              <td>{timeTable[id].driverName}</td>
              <td>{timeTable[id].endTime}</td>
              <td>{timeTable[id].routeNo}</td>
              <td>{timeTable[id].startTime}</td>
              <td>{timeTable[id].vehicleNo}</td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    bookingBus(id);
                  }}
                >
                  Book Now
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookingBus;
