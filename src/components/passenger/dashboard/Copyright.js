// IT18233704 - N.R Yamasinghe Version-01
import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Transporty
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
