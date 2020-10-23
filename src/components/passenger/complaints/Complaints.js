// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import ComplaintForm from "./ComplaintForm";
import ComplaintTable from "./ComplaintTable";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

class Complaints extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <ComplaintForm />
          <Paper>
            <ComplaintTable />
          </Paper>
        </Typography>
      </main>
    );
  }
}

export default withStyles(styles)(Complaints);
