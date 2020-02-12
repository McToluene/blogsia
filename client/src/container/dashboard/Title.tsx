import React, { FC } from "react";
import { Typography } from "@material-ui/core";

interface ITitleProps {
  children: any;
}

const Title: FC<ITitleProps> = props => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
};
export default Title;
