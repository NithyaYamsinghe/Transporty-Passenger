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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: "absolute",
  },
});

class ForeignerRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      passportNo: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
      loading: false,
      emailError: "",
      passwordError: "",
      balance: 0,
      userId: "",
      image: "",
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
    const { password, confirmPassword } = this.state;
    this.setState({ loading: true });
    if (password === confirmPassword) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          var user = firebaseApp.auth().currentUser;
          user
            .sendEmailVerification()
            .then(() => {
              console.log("Email sent");
            })
            .catch(() => {});
          var uid = firebaseApp.auth().currentUser.uid;
          const newPassengerData = {
            userId: uid,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            NIC: "",
            username: this.state.username,
            email: this.state.email,
            balance: this.state.balance,
            image: this.state.image,
            passportNo: this.state.passportNo,
            isForeigner: true,
          };
          firebaseApp
            .database()
            .ref()
            .child("passengers")
            .push(newPassengerData, (err) => {
              if (err) console.log(err);
              else window.location = "/home";
            });
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              this.setState({
                errors: { email: err.message },
                loading: false,
              });
              break;
            case "auth/invalid-email":
              this.setState({
                errors: { email: err.message },
                loading: false,
              });
              break;
            case "auth/weak-password":
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
    } else {
      this.setState({
        errors: { password: "passwords are not matching" },
        loading: false,
      });
    }
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  helperText={errors.firstName}
                  error={errors.firstName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  helperText={errors.lastName}
                  error={errors.lastName ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  helperText={errors.username}
                  error={errors.username ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  pattern="[7-9]{1}[0-9]{9}"
                  helperText={errors.phoneNumber}
                  error={errors.phoneNumber ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="passportNo"
                  label="Passport No"
                  name="passportNo"
                  autoComplete="passportNo"
                  helperText={errors.passportNo}
                  error={errors.passportNo ? true : false}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={
                loading ||
                !this.state.email ||
                !this.state.password ||
                !this.state.firstName ||
                !this.state.lastName ||
                !this.state.passportNo ||
                !this.state.username ||
                !this.state.phoneNumber ||
                !this.state.password ||
                !this.state.confirmPassword
              }
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles)(ForeignerRegisterForm);
