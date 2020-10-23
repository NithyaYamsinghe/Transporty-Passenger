// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import JourneyTable from "./JourneyTable";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchBox from "./../../common/SearchBox";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { PassengerContext } from "./../../../context/PassengerContext";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

class Journey extends Component {
  static contextType = PassengerContext;
  render() {
    const {
      generateJourneyPdf,
      handleJourneyChange,
      search,
      sortedJourneys,
    } = this.context;
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          {sortedJourneys.length !== 0 ? (
            <Button
              variant="contained"
              color="primary"
              endIcon={<PictureAsPdfIcon />}
              style={{ float: "right" }}
              onClick={generateJourneyPdf}
            >
              Generate
            </Button>
          ) : (
            <div></div>
          )}
          <br />
          <br />

          <SearchBox
            handleChange={handleJourneyChange}
            search={search}
            placeholder="Search"
          />
          <br />
          <br />
          {sortedJourneys.length === 0 ? (
            <div
              className="col  text-color-ash text-center "
              style={{
                fontSize: "20px",
                marginTop: "20px",
                marginBottom: "500px",
              }}
            >
              sorry, no items matched your search
            </div>
          ) : (
            <Paper>
              <JourneyTable />
            </Paper>
          )}
        </Typography>
      </main>
    );
  }
}
export default withStyles(styles)(Journey);
