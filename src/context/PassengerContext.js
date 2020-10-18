import React, { Component } from "react";
import firebaseApp from "./../firebase/firebase";
import Swal from "sweetalert2";

const PassengerContext = React.createContext();
class PassengerProvider extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    NIC: "",
    balance: 0,
    image: "",
    journeys: [],
    payments: [],
    timeTable: {},
    emailVerified: false,
    bookingSnapshot: {},
    bookingValue: 0,
    day: "",
    driverName: "",
    endTime: "",
    routeNo: "",
    startTime: "",
    vehicleNo: "",
    journeysOnGoing: [],
    renderJourney: false,
    renderHome: true,
    renderAccount: false,
    renderTopUpAccount: false,
    renderReport: false,
    renderPayment: false,
    renderBooking: false,
    loading: true,
  };

  logoutHandler = () => {
    firebaseApp.auth().signOut();
    window.location = "/login";
  };
  loadtopUpaccountPage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: false,
      renderHome: false,
      renderJourney: false,
      renderPayment: false,
      renderTopUpAccount: true,
      renderReport: false,
    });
  };

  loadAccountPage = () => {
    this.setState({
      renderAccount: true,
      renderBooking: false,
      renderHome: false,
      renderJourney: false,
      renderPayment: false,
      renderTopUpAccount: false,
      renderReport: false,
    });
  };

  loadHomePage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: false,
      renderHome: true,
      renderJourney: false,
      renderPayment: false,
      renderTopUpAccount: false,
      renderReport: false,
    });
  };

  loadJourneyPage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: false,
      renderHome: false,
      renderJourney: true,
      renderPayment: false,
      renderTopUpAccount: false,
      renderReport: false,
    });
  };

  loadPaymentPage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: false,
      renderHome: false,
      renderJourney: false,
      renderPayment: true,
      renderTopUpAccount: false,
      renderReport: false,
    });
  };

  loadReportPage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: false,
      renderHome: false,
      renderJourney: false,
      renderPayment: false,
      renderTopUpAccount: false,
      renderReport: true,
    });
  };

  loadBookingPage = () => {
    this.setState({
      renderAccount: false,
      renderBooking: true,
      renderHome: false,
      renderJourney: false,
      renderPayment: false,
      renderTopUpAccount: false,
      renderReport: false,
    });
  };

  rechargeAccount = (rechargeData) => {
    firebaseApp
      .database()
      .ref()
      .child("payment")
      .push(rechargeData, (err) => {
        if (err) console.log(err);
        else;
      });
  };

  rechargeAccountCoupon = (rechargeData) => {
    firebaseApp
      .database()
      .ref()
      .child("paymentCoupon")
      .push(rechargeData, (err) => {
        if (err) console.log(err);
        else;
      });
  };

  deleteJourney = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    })
      .then((result) => {
        if (result.value) {
          firebaseApp
            .database()
            .ref()
            .child(`journeys/${id}`)
            .remove((err) => {
              if (err) console.log(err);
            });
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "journey has been deleted successfully",
            showConfirmButton: true,
            timer: 1500,
          });
        }
      })
      .then(() => {
        this.loadJourneyPage();
      });
  };

  deletePayment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    })
      .then((result) => {
        if (result.value) {
          firebaseApp
            .database()
            .ref()
            .child(`payment/${id}`)
            .remove((err) => {
              if (err) console.log(err);
            });
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "payment has been deleted successfully",
            showConfirmButton: true,
            timer: 1500,
          });
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  updateBalance = (amount, id) => {
    const balanceFloat = parseFloat(this.state.balance);
    const amountFloat = parseFloat(amount);
    var total = amountFloat + balanceFloat;
    var query = firebaseApp
      .database()
      .ref("passengers")
      .orderByChild("userId")
      .equalTo(id);

    query.once("child_added", (snapshot) => {
      snapshot.ref.update({ balance: total });
    });
  };

  bookingBus = (id) => {
    var ref = firebaseApp.database().ref("ctbTimetable");
    ref.child(id).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        const booking = snapshot.val().booking;
        const day = snapshot.val().day;
        const driverName = snapshot.val().driverName;
        const endTime = snapshot.val().endTime;
        const routeNo = snapshot.val().routeNo;
        const startTime = snapshot.val().startTime;
        const vehicleNo = snapshot.val().vehicleNo;

        this.setState({
          bookingValue: booking,
          day: day,
          driverName: driverName,
          endTime: endTime,
          routeNo: routeNo,
          startTime: startTime,
          vehicleNo: vehicleNo,
        });
      }
    });

    const { bookingValue } = this.state;

    firebaseApp
      .database()
      .ref()
      .child(`ctbTimetable/${id}`)
      .update({
        booking: bookingValue + 1,
      });

    firebaseApp.auth().onAuthStateChanged((user) => {
      const {
        day,
        driverName,
        endTime,
        routeNo,
        startTime,
        vehicleNo,
      } = this.state;
      const newBookingData = {
        day: day,
        driverName: driverName,
        endTime: endTime,
        routeNo: routeNo,
        startTime: startTime,
        vehicleNo: vehicleNo,
        userId: user.uid,
      };
      firebaseApp
        .database()
        .ref()
        .child("booking")
        .push(newBookingData, (err) => {
          if (err) console.log(err);
        });
    });
  };

  componentDidMount() {
    this.setState({ journeys: [], payments: [] });
    firebaseApp.auth().onAuthStateChanged((user) => {
      var id = user.uid;
      this.setState({ id });
      var refjournies = firebaseApp.database().ref("journeys");
      refjournies.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.passengerId === id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let journeys = [...this.state.journeys];
            journeys.push(data);
            this.setState({ journeys });
          }
        });
      });

      var ref = firebaseApp.database().ref("passengers");
      ref.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === this.state.id) {
            var data = childData;
            this.setState({
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber,
              NIC: data.NIC,
              balance: data.balance,
              image: data.image,
            });
          }
        });
      });

      var ref = firebaseApp.database().ref("journeysOnGoing");
      ref.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childSnapshot.key === this.state.id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let journeysOnGoing = [...this.state.journeysOnGoing];
            journeysOnGoing.push(data);
            this.setState({ journeysOnGoing });
          }
        });
      });

      var ref = firebaseApp.database().ref("payment");
      ref.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === this.state.id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let payments = [...this.state.payments];
            payments.push(data);
            this.setState({ payments });
          }
        });
      });
    });
    firebaseApp
      .database()
      .ref()
      .child("ctbTimetable")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.setState({ timeTable: snapshot.val() });
        }
      });

    var user = firebaseApp.auth().currentUser;
    var emailVerified;
    if (user != null) {
      emailVerified = user.emailVerified;
      this.setState({ emailVerified });
    }

    this.setState({ loading: false });
  }

  reSendEmailVerification = () => {
    var user = firebaseApp.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        console.log("Email sent");
        // window.location = "/home";
      })
      .catch(function (error) {});
  };

  render() {
    return (
      <PassengerContext.Provider
        value={{
          ...this.state,
          rechargeAccount: this.rechargeAccount,
          updateBalance: this.updateBalance,
          reSendEmailVerification: this.reSendEmailVerification,
          bookingBus: this.bookingBus,
          deletePayment: this.deletePayment,
          deleteJourney: this.deleteJourney,
          rechargeAccountCoupon: this.rechargeAccountCoupon,
          logoutHandler: this.logoutHandler,
          loadAccountPage: this.loadAccountPage,
          loadBookingPage: this.loadBookingPage,
          loadHomePage: this.loadHomePage,
          loadJourneyPage: this.loadJourneyPage,
          loadPaymentPage: this.loadPaymentPage,
          loadReportPage: this.loadReportPage,
          loadtopUpaccountPage: this.loadtopUpaccountPage,
        }}
      >
        {this.props.children}
      </PassengerContext.Provider>
    );
  }
}

const PassengerConsumer = PassengerContext.Consumer;
export { PassengerProvider, PassengerConsumer, PassengerContext };
