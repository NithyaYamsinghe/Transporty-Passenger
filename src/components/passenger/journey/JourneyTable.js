// IT18233704 - N.R Yamasinghe Version-01
import React, { useContext } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { PassengerContext } from "./../../../context/PassengerContext";

const JourneyTable = () => {
  const { sortedJourneys, deleteJourney } = useContext(PassengerContext);

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
        {Object.keys(sortedJourneys).map((id) => {
          return (
            <tr key={id}>
              <td>{moment(sortedJourneys[id].date).format("YYYY-MM-DD")}</td>
              <td>{moment(sortedJourneys[id].date).format("hh:mm:ss a")}</td>
              <td>{sortedJourneys[id].cost}</td>
              <td>{sortedJourneys[id].distanceTravelled}</td>
              <td>{sortedJourneys[id].routeTaken.destination}</td>
              <td>{sortedJourneys[id].routeTaken.routeNo}</td>
              <td>{sortedJourneys[id].routeTaken.startingPoint}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deleteJourney(sortedJourneys[id].key);
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
