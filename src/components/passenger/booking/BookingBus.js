// IT18233704 - N.R Yamasinghe Version-01
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { PassengerContext } from "./../../../context/PassengerContext";

const BookingBus = () => {
  const { timeTable, sortedTimeTable, bookingBus, bookings } = useContext(
    PassengerContext
  );
  console.log(timeTable);
  return (
    <React.Fragment>
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
          {Object.keys(sortedTimeTable).map((id) => {
            let booked = bookings.find(
              (item) => item.bookingId === sortedTimeTable[id].key
            );
            return (
              <tr key={id}>
                <td>{sortedTimeTable[id].day}</td>
                <td>{sortedTimeTable[id].driverName}</td>
                <td>{sortedTimeTable[id].endTime}</td>
                <td>{sortedTimeTable[id].routeNo}</td>
                <td>{sortedTimeTable[id].startTime}</td>
                <td>{sortedTimeTable[id].vehicleNo}</td>
                <td>
                  {booked ? (
                    <Button variant="contained" disabled>
                      Booked
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        bookingBus(sortedTimeTable[id].key);
                      }}
                    >
                      Book Now
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default BookingBus;
