// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import PaymentIcon from "@material-ui/icons/Payment";
import NoteIcon from "@material-ui/icons/Note";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import { PassengerContext } from "./../../../context/PassengerContext";

class ListItems extends Component {
  static contextType = PassengerContext;
  render() {
    const {
      loadHomePage,
      loadAccountPage,
      loadJourneyPage,
      loadtopUpaccountPage,
      logoutHandler,
      loadPaymentPage,
      loadReportPage,
      loadBookingPage,
    } = this.context;
    return (
      <div>
        <List>
          <div>
            <ListItem button key="Dashboard" onClick={loadHomePage}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key="Account" onClick={loadAccountPage}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
            <ListItem button key="Journey" onClick={loadJourneyPage}>
              <ListItemIcon>
                <DirectionsBus />
              </ListItemIcon>
              <ListItemText primary="Journey" />
            </ListItem>
            <ListItem button key="Booking" onClick={loadBookingPage}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <div>
          <List>
            <ListItem
              button
              key="Recharge Account"
              onClick={loadtopUpaccountPage}
            >
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Recharge" />
            </ListItem>
            <ListItem button key="Complaints" onClick={loadReportPage}>
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="Complaints" />
            </ListItem>
            <ListItem button key="Payments" onClick={loadPaymentPage}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItem>
            <ListItem button key="Logout" onClick={logoutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}
export default ListItems;
