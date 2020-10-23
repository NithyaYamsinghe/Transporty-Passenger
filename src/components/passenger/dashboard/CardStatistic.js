// IT18233704 - N.R Yamasinghe Version-01
import React from "react";
import Title from "./Title";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Title>{props.title}</Title>
        <Typography component="p" variant="h4">
          {props.data}
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.depositContext}
        ></Typography>
        <div>
          <Link color="primary" href="#">
            {props.info}
          </Link>
        </div>
      </CardContent>
      <CardActions>
        <Link color="primary" href="#">
          <OpenInNewIcon />
        </Link>
      </CardActions>
    </Card>
  );
}
