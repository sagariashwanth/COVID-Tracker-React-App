import React from "react"; //type 'rfce' for react functional component
import { Card, CardContent, Typography } from "@material-ui/core";

function infobox({ title, cases, total }) {
  //title,cases and total are props
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography className="infoBox_total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default infobox;
