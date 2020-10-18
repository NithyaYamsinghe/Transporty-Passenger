import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import JourneyTable from "./JourneyTable";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

class Journey extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <Paper>
            <JourneyTable />
          </Paper>
        </Typography>
      </main>
    );
  }
}

export default withStyles(styles)(Journey);
