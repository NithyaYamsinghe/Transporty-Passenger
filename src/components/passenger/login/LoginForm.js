// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import firebaseApp from "./../../../firebase/firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progess: {
    position: "absolute",
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      user: "",
      errors: [{ email: "" }, { password: "" }],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function () {
        window.location = "/home";
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            this.setState({
              errors: { email: err.message },
              loading: false,
            });
            break;
          case "auth/user-disabled":
            this.setState({
              errors: { email: err.message },
              loading: false,
            });
            break;
          case "auth/user-not-found":
            this.setState({
              errors: { email: err.message },
              loading: false,
            });
            break;
          case "auth/wrong-password":
            this.setState({
              errors: { password: err.message },
              loading: false,
            });
            break;
          default:
            this.setState({
              loading: false,
            });
        }
      });
  };

  authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user);
      } else {
        this.setState({ user: "" });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading || !this.state.email || !this.state.password}
            >
              Sign In
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  style={{ textDecoration: "none" }}
                  href="register"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid container>
                <Link
                  style={{ textDecoration: "none" }}
                  href="resetPassword"
                  variant="body2"
                >
                  {"Forgot Password? Reset"}
                </Link>
              </Grid>
            </Grid>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles)(LoginForm);
