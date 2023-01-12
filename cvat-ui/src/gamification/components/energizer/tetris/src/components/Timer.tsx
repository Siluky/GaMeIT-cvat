import React from "react";
import { Context } from "../context";
import Constants from "../constants";

export default function Timer(): JSX.Element {
  const { startTime } = React.useContext(Context);

  var delta = Date.now() - startTime;
  var time = Constants.TIME_LIMIT - delta;

  time = Math.round(time / 1000);

  return (
    <div className={"timer"} id="timer">
      Time: {time}
    </div>
  );
}
