import React from "react"; //type 'rfce' for react functional component
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

// ...props means it includes/spreads whatever props we pass(ie;onClick from App.js infoBox section)
function infobox({ title, cases, isRed, active, total, ...props }) {
  //title,cases and total are props
  return (
    <Card
      onClick={props.onClick}
      // if active then add infoBox--selected is the meaning for code below
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox_total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default infobox;
