// IT18233704 - N.R Yamasinghe Version-01
import React, { Component } from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";
import moment from "moment";
import Swal from "sweetalert2";
import firebaseApp from "./../firebase/firebase";

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
    emailVerified: false,
    journeys: [],
    sortedJourneys: [],
    payments: [],
    sortedPayments: [],
    journeysOnGoing: [],
    bookings: [],
    myBookings: [],
    timeTable: [],
    sortedTimeTable: [],
    complaints: [],
    sortedComplaints: [],
    bookingSnapshot: {},
    bookingValue: 0,
    progress: 0,
    bookingId: "",
    day: "",
    driverName: "",
    endTime: "",
    routeNo: "",
    startTime: "",
    vehicleNo: "",
    search: "",
    loading: true,
    progressVisible: false,
    renderJourney: false,
    renderHome: true,
    renderAccount: false,
    renderTopUpAccount: false,
    renderReport: false,
    renderPayment: false,
    renderBooking: false,
  };

  // log out method
  logoutHandler = () => {
    firebaseApp.auth().signOut();
    window.location = "/login";
  };

  // load recharge page
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

  // load account page
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

  // load home page
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

  // load journey page
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

  // load payment page
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

  // load report page
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

  // load booking page
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

  // send complaints
  sendComplaints = (routeNo, vehicleNo, complaint, date) => {
    const { id } = this.state;
    const rechargeData = {
      userId: id,

      routeNo: routeNo,
      vehicleNo: vehicleNo,
      complaint: complaint,
      date: date,
    };
    firebaseApp
      .database()
      .ref()
      .child("complaints")
      .push(rechargeData, (err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "complaint has been sent succussfully",
            showConfirmButton: true,
            timer: 1500,
          });
        }
      });
  };

  // forgot password
  forgotPassword = (email) => {
    var auth = firebaseApp.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loading: false });
        Swal.fire({
          icon: "success",
          title: "Email sent successfully",
          text: "please check your email",
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          window.location = "/login";
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "something went wrong",
        });
        window.location = "/resetPassword";
      });
  };

  passwordReset = (password, confirmPassword) => {
    if (password === confirmPassword) {
      var user = firebaseApp.auth().currentUser;
      user
        .updatePassword(password)
        .then(() => {
          console.log("updated");
          Swal.fire({
            icon: "success",
            title: "password updated succussfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    } else {
    }

    this.loadAccountPage();
  };

  // update account
  updateAccount = (firstName, lastName, username, phoneNumber) => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      var id = user.uid;

      var query = firebaseApp
        .database()
        .ref("passengers")
        .orderByChild("userId")
        .equalTo(id);
      query
        .once("child_added", (snapshot) => {
          snapshot.ref.update({
            firstName: firstName,
            lastName: lastName,
            username: username,
            phoneNumber: phoneNumber,
          });
        })
        .then(() => {});
    });
    Swal.fire({
      icon: "success",
      title: "profile updated succussfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.loadAccountPage();
    });
  };

  // update profile picture
  updateProfilePicture = (image) => {
    const uploadTask = firebaseApp
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        this.setState({ progressVisible: true });
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress, progressVisible: true });
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebaseApp
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firebaseApp.auth().onAuthStateChanged((user) => {
              var id = user.uid;
              var query = firebaseApp
                .database()
                .ref("passengers")
                .orderByChild("userId")
                .equalTo(id);
              query.once("child_added", (snapshot) => {
                snapshot.ref.update({ image: url });
              });
            });
          });
        this.setState({ progressVisible: false, image: "" });
      }
    );
  };

  // recharge account
  rechargeAccount = (rechargeData) => {
    firebaseApp
      .database()
      .ref()
      .child("payment")
      .push(rechargeData, (err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "account has been recharged succussfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // recharge account using coupon
  rechargeAccountCoupon = (rechargeData) => {
    firebaseApp
      .database()
      .ref()
      .child("paymentCoupon")
      .push(rechargeData, (err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "account has been recharged succussfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // delete journey
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

  // delete payment
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

  // delete complaint
  deleteComplaint = (id) => {
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
            .child(`complaints/${id}`)
            .remove((err) => {
              if (err) console.log(err);
            });
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "complaint has been deleted successfully",
            showConfirmButton: true,
            timer: 1500,
          });
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  // update account balance
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

  // booking bus method
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
        const bookingId = id;

        this.setState({
          bookingValue: booking,
          day: day,
          driverName: driverName,
          endTime: endTime,
          routeNo: routeNo,
          startTime: startTime,
          vehicleNo: vehicleNo,
          bookingId: bookingId,
        });
        Swal.fire({
          icon: "success",
          title: "seat has been booked successfully",
          showConfirmButton: false,
          timer: 1500,
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
        bookingId,
      } = this.state;
      const newBookingData = {
        day: day,
        driverName: driverName,
        endTime: endTime,
        routeNo: routeNo,
        startTime: startTime,
        vehicleNo: vehicleNo,
        userId: user.uid,
        bookingId: bookingId,
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
    this.setState({ journeys: [], payments: [], bookings: [], complaints: [] });
    firebaseApp.auth().onAuthStateChanged((user) => {
      var id = user.uid;
      this.setState({ id });
      var refJournies = firebaseApp.database().ref("journeys");
      refJournies.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.passengerId === id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let journeys = [...this.state.journeys];
            journeys.push(data);
            this.setState({ journeys, sortedJourneys: journeys });
          }
        });
      });

      var refBookings = firebaseApp.database().ref("booking");
      refBookings.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let bookings = [...this.state.bookings];
            bookings.push(data);
            this.setState({ bookings });
          }
        });
      });

      var refComplaints = firebaseApp.database().ref("complaints");
      refComplaints.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let complaints = [...this.state.complaints];
            complaints.push(data);
            this.setState({ complaints, sortedComplaints: complaints });
          }
        });
      });
      var refPassengers = firebaseApp.database().ref("passengers");
      refPassengers.on("value", (snapshot) => {
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

      var refPayment = firebaseApp.database().ref("payment");
      refPayment.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          if (childData.userId === this.state.id) {
            var data = childData;
            var key = childSnapshot.key;
            data.key = key;
            let payments = [...this.state.payments];
            payments.push(data);
            this.setState({ payments, sortedPayments: payments });
          }
        });
      });
    });

    firebaseApp
      .database()
      .ref()
      .child("ctbTimetable")
      .on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          var data = childData;
          var key = childSnapshot.key;
          data.key = key;
          let timeTable = [...this.state.timeTable];
          timeTable.push(data);

          this.setState({
            timeTable,
            sortedTimeTable: timeTable,
          });
        });
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
      })
      .catch(() => {});
  };

  // generate payment pdf
  generatePaymentPdf = () => {
    const { email, username, payments } = this.state;
    var doc = new jsPDF("p", "pt");
    doc.rect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    doc.setTextColor(47, 167, 217);
    doc.setFontSize(32);
    doc.text(30, 55, "Transporty");
    doc.setFontSize(12);
    doc.text(415, 40, "Email: admin@transporty.lk");
    doc.text(440, 60, "Call Us: 077 714 5020");
    doc.line(20, 70, 575, 70);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFontType("bold");
    doc.text(190, 140, "Payment Analysis");

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    var time =
      +" " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(40, 190, "Email: " + email);
    doc.text(40, 205, "Username: " + username);
    doc.text(40, 220, "Date: " + date);
    doc.text(40, 235, "Time: " + time);

    doc.setFontSize(15);
    const headers = [
      [
        "Date",
        "Time",
        "Card Name",
        "Card Number",
        "Amount",
        "First Name",
        "Last Name",
      ],
    ];

    const data = Object.keys(payments).map((id) => [
      moment(payments[id].date).format("YYYY-MM-DD"),
      moment(payments[id].date).format("hh:mm:ss a"),
      payments[id].cardName,
      payments[id].cardNumber,
      payments[id].amount,
      payments[id].firstName,
      payments[id].lastName,
    ]);

    let content = {
      startY: 270,
      head: headers,
      body: data,
    };

    doc.autoTable(content);

    var totalPayment = 0;

    Object.keys(payments).map(
      (id) => (totalPayment = totalPayment + parseFloat(payments[id].amount))
    );

    doc.setFontSize(12);
    let finalY = doc.lastAutoTable.finalY;
    doc.text(41, finalY + 50, "Total Payment: Rs." + totalPayment);
    doc.text(
      41,
      finalY + 80,
      "Total number of transactions: " + payments.length
    );
    doc.save("Transporty Payment Analysis.pdf");
  };

  // generate journey pdf
  generateJourneyPdf = () => {
    const { email, username, journeys } = this.state;
    var doc = new jsPDF("p", "pt");
    doc.rect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    doc.setTextColor(47, 167, 217);
    doc.setFontSize(32);
    doc.text(30, 55, "Transporty");
    doc.setFontSize(12);
    doc.text(415, 40, "Email: admin@transporty.lk");
    doc.text(440, 60, "Call Us: 077 714 5020");
    doc.line(20, 70, 575, 70);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFontType("bold");
    doc.text(190, 140, "Journey Analysis");

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    var time =
      +" " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(40, 190, "Email: " + email);
    doc.text(40, 205, "Username: " + username);
    doc.text(40, 220, "Date: " + date);
    doc.text(40, 235, "Time: " + time);

    doc.setFontSize(15);
    const headers = [
      [
        "Date",
        "Time",
        "Cost",
        "Distance",
        "Destination",
        "Route Number",
        "Starting Point",
      ],
    ];

    const data = Object.keys(journeys).map((id) => [
      moment(journeys[id].date).format("YYYY-MM-DD"),
      moment(journeys[id].date).format("hh:mm:ss a"),
      journeys[id].cost,
      journeys[id].distanceTravelled,
      journeys[id].routeTaken.destination,
      journeys[id].routeTaken.routeNo,
      journeys[id].routeTaken.startingPoint,
    ]);

    let content = {
      startY: 270,
      head: headers,
      body: data,
    };

    doc.autoTable(content);

    var totalPayment = 0;

    Object.keys(journeys).map(
      (id) => (totalPayment = totalPayment + parseFloat(journeys[id].cost))
    );

    doc.setFontSize(12);
    let finalY = doc.lastAutoTable.finalY;
    doc.text(41, finalY + 50, "Total Payment: Rs." + totalPayment);
    doc.text(41, finalY + 80, "Total number of journeys: " + journeys.length);
    doc.save("Transporty Journey Analysis.pdf");
  };

  // generate booking pdf
  generateBookingPdf = () => {
    const { email, username, bookings } = this.state;
    var doc = new jsPDF("p", "pt");
    doc.rect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    doc.setTextColor(47, 167, 217);
    doc.setFontSize(32);
    doc.text(30, 55, "Transporty");
    doc.setFontSize(12);
    doc.text(415, 40, "Email: admin@transporty.lk");
    doc.text(440, 60, "Call Us: 077 714 5020");
    doc.line(20, 70, 575, 70);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFontType("bold");
    doc.text(190, 140, "Booking Analysis");

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    var time =
      +" " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(40, 190, "Email: " + email);
    doc.text(40, 205, "Username: " + username);
    doc.text(40, 220, "Date: " + date);
    doc.text(40, 235, "Time: " + time);

    doc.setFontSize(15);
    const headers = [
      [
        "Day",
        "Driver Name",
        "End Time",
        "Route Number",
        "Start Time",
        "Vehicle Number",
      ],
    ];

    const data = Object.keys(bookings).map((id) => [
      bookings[id].day,
      bookings[id].driverName,
      bookings[id].endTime,
      bookings[id].routeNo,
      bookings[id].startTime,
      bookings[id].vehicleNo,
    ]);

    let content = {
      startY: 270,
      head: headers,
      body: data,
    };

    doc.autoTable(content);
    doc.setFontSize(12);
    let finalY = doc.lastAutoTable.finalY;

    doc.text(41, finalY + 80, "Total number of bookings: " + bookings.length);
    doc.save("Transporty Booking Analysis.pdf");
  };

  // handle booking change
  handleBookingChange = (event) => {
    const name = event.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value,
      },

      this.sortBoookingData
    );
  };

  // sort booking data
  sortBoookingData = () => {
    const { timeTable, search } = this.state;
    let tempBookings = [...timeTable];

    if (search.length > 0) {
      tempBookings = tempBookings.filter((item) => {
        let tempSearch = search.toLowerCase();
        let tempBooking1 = item.driverName
          .toLowerCase()
          .slice(0, search.length);
        let tempBooking2 = item.day.toLowerCase().slice(0, search.length);
        let tempBooking3 = item.endTime.toLowerCase().slice(0, search.length);
        let tempBooking4 = item.routeNo.toLowerCase().slice(0, search.length);
        let tempBooking5 = item.startTime.toLowerCase().slice(0, search.length);
        let tempBooking6 = item.vehicleNo.toLowerCase().slice(0, search.length);
        if (tempSearch === tempBooking1) {
          return item;
        }
        if (tempSearch === tempBooking2) {
          return item;
        }
        if (tempSearch === tempBooking3) {
          return item;
        }
        if (tempSearch === tempBooking4) {
          return item;
        }
        if (tempSearch === tempBooking5) {
          return item;
        }
        if (tempSearch === tempBooking6) {
          return item;
        }

        return null;
      });
    }
    this.setState({
      sortedTimeTable: tempBookings,
    });
  };

  // handle journey change
  handleJourneyChange = (event) => {
    const name = event.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value,
      },

      this.sortJourneyData
    );
  };

  // sort journey data
  sortJourneyData = () => {
    const { journeys, search } = this.state;
    let tempJourneys = [...journeys];

    if (search.length > 0) {
      tempJourneys = tempJourneys.filter((item) => {
        let tempSearch = search.toLowerCase();

        let tempJourney1 = item.routeTaken.destination
          .toLowerCase()
          .slice(0, search.length);

        let tempJourney2 = item.routeTaken.startingPoint
          .toLowerCase()
          .slice(0, search.length);

        if (tempSearch === tempJourney1) {
          return item;
        }

        if (tempSearch === tempJourney2) {
          return item;
        }

        return null;
      });
    }
    this.setState({
      sortedJourneys: tempJourneys,
    });
  };

  // handle payment change
  handlePaymentChange = (event) => {
    const name = event.target.name;

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value,
      },

      this.sortPaymentData
    );
  };

  // sort payment data
  sortPaymentData = () => {
    const { payments, search } = this.state;
    let tempPayments = [...payments];
    if (search.length > 0) {
      tempPayments = tempPayments.filter((item) => {
        let tempSearch = search.toLowerCase();
        let tempPayment1 = item.cardName.toLowerCase().slice(0, search.length);
        let tempPayment2 = item.firstName.toLowerCase().slice(0, search.length);
        let tempPayment3 = item.lastName.toLowerCase().slice(0, search.length);
        if (tempSearch === tempPayment1) {
          return item;
        }
        if (tempSearch === tempPayment2) {
          return item;
        }
        if (tempSearch === tempPayment3) {
          return item;
        }

        return null;
      });
    }
    this.setState({
      sortedPayments: tempPayments,
    });
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
          updateAccount: this.updateAccount,
          updateProfilePicture: this.updateProfilePicture,
          passwordReset: this.passwordReset,
          forgotPassword: this.forgotPassword,
          generatePaymentPdf: this.generatePaymentPdf,
          generateJourneyPdf: this.generateJourneyPdf,
          generateBookingPdf: this.generateBookingPdf,
          handleBookingChange: this.handleBookingChange,
          handleJourneyChange: this.handleJourneyChange,
          handlePaymentChange: this.handlePaymentChange,
          sendComplaints: this.sendComplaints,
          deleteComplaint: this.deleteComplaint,
        }}
      >
        {this.props.children}
      </PassengerContext.Provider>
    );
  }
}

const PassengerConsumer = PassengerContext.Consumer;
export { PassengerProvider, PassengerConsumer, PassengerContext };
