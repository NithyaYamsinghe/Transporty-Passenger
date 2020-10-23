// IT18233704 - N.R Yamasinghe Version-01
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { PassengerContext } from "../../../context/PassengerContext";

const ComplaintTable = () => {
  const { sortedComplaints, deleteComplaint } = useContext(PassengerContext);

  return (
    <React.Fragment>
      <table className="table table-stripped responsive">
        <thead className="thead-light ">
          <tr>
            <th>Date</th>
            <th>Route No</th>
            <th>Vehicle No</th>
            <th>Complaint</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(sortedComplaints).map((id) => {
            return (
              <tr key={id}>
                <td>{sortedComplaints[id].date}</td>
                <td>{sortedComplaints[id].routeNo}</td>
                <td>{sortedComplaints[id].vehicleNo}</td>
                <td>{sortedComplaints[id].complaint}</td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      deleteComplaint(sortedComplaints[id].key);
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

export default ComplaintTable;
