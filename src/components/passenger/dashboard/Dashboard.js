import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/avatar";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./ListItems";
import Copyright from "./Copyright";
import Account from "./../account/Account";
import Journey from "./../journey/Journey";
import TopUpAccount from "./../payment/TopUpAccount";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Journeys from "./Journeys";
import PaymentHistory from "./../payment/PaymentHistory";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PassengerContext } from "./../../../context/PassengerContext";
import CardStatistic from "./CardStatistic";
import Chart from "./Chart";
import Booking from "./../booking/Booking";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 380,
  },
  avatar: {
    height: 110,
    width: 105,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20,
  },
  uiProgess: {
    position: "fixed",
    zIndex: "1000",
    height: "31px",
    width: "31px",
    left: "50%",
    top: "35%",
  },
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const {
    image,
    username,
    balance,
    payments,
    journeys,
    emailVerified,
    reSendEmailVerification,
    journeysOnGoing,
    renderJourney,
    renderHome,
    renderAccount,
    renderTopUpAccount,
    renderReport,
    renderPayment,
    renderBooking,
    loading,
  } = useContext(PassengerContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={journeysOnGoing.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <br />
        <center>
          {open && <Avatar className={classes.avatar} src={image} />}
          {!open && <Avatar src={image} />}
          {open && <p>{username}</p>}
        </center>
        <br />
        <Divider />
        <ListItems />
      </Drawer>

      <main className={classes.content}>
        {renderHome && (
          <div>
            <div className={classes.appBarSpacer} />
            {!emailVerified && (
              <Link
                style={{ textDecoration: "none" }}
                onClick={reSendEmailVerification}
              >
                <Alert severity="warning">
                  Please verify your email address to resend email click here!
                </Alert>
              </Link>
            )}
            {balance === 0 && (
              <Alert severity="info">Please recharge your account</Alert>
            )}
            {loading && <CircularProgress />}
            {!loading && (
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <CardStatistic
                      data={balance}
                      title={"Total Balance"}
                      info={"View Balance"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CardStatistic
                      data={journeys.length}
                      title={"Total Journeys"}
                      info={"View Journeys"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CardStatistic
                      data={`${journeysOnGoing.length}`}
                      title={"Current Journeys"}
                      info={"View Current Journeys"}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CardStatistic
                      data={payments.length}
                      title={"Total Recharges"}
                      info={"View Recharges"}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                      <Chart />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={fixedHeightPaper}>
                      <Journeys />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            )}
          </div>
        )}
        {renderAccount && <Account />}
        {renderJourney && <Journey />}
        {renderTopUpAccount && <TopUpAccount />}
        {renderPayment && <PaymentHistory />}
        {renderBooking && <Booking />}

        <Copyright />
      </main>
    </div>
  );
}
