import React from "react";
import "./components.css";

export default function TableRow(props) {
  // need to do a bit of formatting to get the duration of each row correct.
  // duration enters as a string in the format: "PT9H30M
  var ptduration = props.Duration;
  let hours = "00";
  let minutes = "00";
  let seconds = "00";
  let positionH = 0;
  let positionM = 0;
  let positionS = 0;
  if (ptduration.includes("H")) {
    while (positionH < ptduration.length) {
      if (ptduration[positionH] === "H") {
        break;
      } else {
        positionH++;
      }
    }
  }
  if (ptduration.includes("M")) {
    while (positionM < ptduration.length) {
      if (ptduration[positionM] === "M") {
        break;
      } else {
        positionM++;
      }
    }
  }
  if (ptduration.includes("S")) {
    // with seconds there can also be a decimal point
    if (ptduration.includes(".")) {
      while (positionS < ptduration.length) {
        if (ptduration[positionS] === ".") {
          break;
        } else {
          positionS++;
        }
      }
    } else {
      while (positionS < ptduration.length) {
        if (ptduration[positionS] === "S") {
          break;
        } else {
          positionS++;
        }
      }
    }
  }

  // now need to update the hours, minutes, seconds variables
  if (positionH === 0) {
    hours = "00";
  } else if (ptduration[positionH - 2] === "T") {
    hours = "0" + ptduration[positionH - 1];
  } else {
    hours = "" + ptduration[positionH - 2] + ptduration[positionH - 1];
  }

  if (positionM === 0) {
    minutes = "00";
  } else if (
    ptduration[positionM - 2] === "H" ||
    ptduration[positionM - 2] === "T"
  ) {
    minutes = "0" + ptduration[positionM - 1];
  } else {
    minutes = "" + ptduration[positionM - 2] + ptduration[positionM - 1];
  }

  if (positionS === 0) {
    seconds = "00";
  } else if (
    ptduration[positionS - 2] === "M" ||
    ptduration[positionS - 2] === "H" ||
    ptduration[positionS - 2] === "T"
  ) {
    seconds = "0" + ptduration[positionS - 1];
  } else {
    seconds = "" + ptduration[positionS - 2] + ptduration[positionS - 1];
  }

  let finalDuration = hours + ":" + minutes + ":" + seconds;

  return (
    <tr key={props.Id}>
      <th scope="row">{props.Id}</th>
      <td>{props.ClockIn}</td>
      <td>{props.ClockOut}</td>
      <td>{finalDuration}</td>
    </tr>
  );
}
