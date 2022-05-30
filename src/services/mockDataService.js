// this file is the get data service.
import React from "react";
import { data } from "../pages/Insights/tableDataSet";
import {
  getNumberOfUnitsPerBuilding,
  getBuildingIndex,
  calcUnitId,
  getNumberOfUnitsPerFloor,
  sumSessionLengths,
  sumOfSessions,
} from "./eventsMockService";

export function buildInsightsAll() {
  return data;
}

export function buildInsightsOneBuilding(buildingId, numberOfDays) {
  //buildingId: "2463", // building Id
  //address: "116  Morningside", //address

  var seedrandom = require("seedrandom");
  var rng = seedrandom(buildingId);
  //console.log(rng());

  const dataBuildingIndex = getBuildingIndex(buildingId);
  const numberOfApartments = getNumberOfUnitsPerBuilding(buildingId);
  const numberOfUnitsPerFloor = getNumberOfUnitsPerFloor(
    numberOfApartments,
    rng
  );

  //make an array of
  var output = [];

  for (
    var apartmentIndex = 0;
    apartmentIndex < numberOfApartments;
    apartmentIndex++
  ) {
    let appartment = {
      buildingId: data[dataBuildingIndex].buildingId, // buildingId
      address: data[dataBuildingIndex].address, // address
      UnitNumber: calcUnitId(numberOfUnitsPerFloor, apartmentIndex),
      NumberOfSessions: Math.round(
        numberOfDays + rng() * (2 - 0) * numberOfDays
      ), // number of sessions
      AvgSessionLength: Math.round(Math.round(300 + rng() * (2700 - 1500))), // average session length, must be in seconds
      intensity: 0, //too hot
      distraction: 0, // open burner
      forgetfulness: 0, // forgetfulness
    };
    output = output.concat(appartment);
  }
  //console.log(output);

  // distrubute insights over numberOfApartments; this is to make the average the same.
  var intenseSum = 0;
  var distractSum = 0;
  var forgetSum = 0;
  for (var unitIndex = 0; unitIndex < numberOfApartments; unitIndex++) {
    output[unitIndex].intensity = Math.floor(
      0 + rng() * (data[dataBuildingIndex].intensity * 2 - 0)
    );

    output[unitIndex].distraction = Math.floor(
      0 + rng() * (data[dataBuildingIndex].distraction * 2 - 0)
    );

    output[unitIndex].forgetfulness = Math.floor(
      0 + rng() * (data[dataBuildingIndex].forgetfulness * 2 - 0)
    );

    intenseSum += output[unitIndex].intensity;
    distractSum += output[unitIndex].distraction;
    forgetSum += output[unitIndex].forgetfulness;
  }
  // reasonableness checking
  // console.log(" intense avg = "+ (intenseSum/numberOfApartments))
  // console.log(" distract avg = "+ (distractSum/numberOfApartments))
  // console.log(" forget avg = "+ (forgetSum/numberOfApartments))

  return output;
}
/*
export function buildEvents(
  buildingId,
  appartmentNumber,
  sessionTimestamp,
  numberOfDays,
  intensityTotal,
  distractionTotal,
  forgetfulnessTotal
) {
  // take in 1 appartmentNumber, buildingId, sessionTimestamp, NumberOfDays
  // sumOf intensity, distraction, forgetfulnesss

  // %chance insertBreakfast session   (session length, appartmentNumber, buildingId, sessionTimestamp, NumberOfDays initialize event counts to 0)
  // %chance insertLunch session
  // %chance insertDinner session
  //    //  for numberOfDays
  console.log("build events called");
  console.log(
    "with " +
      buildingId +
      " " +
      appartmentNumber +
      " " +
      sessionTimestamp +
      " " +
      numberOfDays +
      " " +
      intensityTotal +
      " " +
      distractionTotal +
      " " +
      forgetfulnessTotal
  );
  var output = [];
  for (var day = 0; day < numberOfDays; day++) {
    let breakfast = {
      buildingId: buildingId,
      appartmentNumber: appartmentNumber,
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 8 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      intensity: 0, //too hot
      distraction: 0, // open burner
      forgetfulness: 0, // forgetfulness
    };
    if (rng() < 0.5) {
      console.log("added breakfast");
      output = output.concat(breakfast);
    }
  }
  for (var day = 0; day < numberOfDays; day++) {
    let lunch = {
      buildingId: buildingId,
      appartmentNumber: appartmentNumber, // appartmentNumber
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 12 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      intensity: 0, //too hot
      distraction: 0, // open burner
      forgetfulness: 0, // forgetfulness
    };
    if (rng() < 0.3) {
      console.log("added lunch");
      output = output.concat(lunch);
    }
  }
  for (var day = 0; day < numberOfDays; day++) {
    let dinner = {
      buildingId: buildingId,
      appartmentNumber: appartmentNumber, // appartmentNumber
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 18 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      intensity: 0, //too hot
      distraction: 0, // open burner
      forgetfulness: 0, // forgetfulness
    };

    if (rng() < 0.95) {
      console.log("added dinner");
      output = output.concat(dinner);
    }
  }
  console.log("count is " + output.length);

  for (var intensity = 0; intensity < intensityTotal; intensity++) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    console.log("apparment index " + apartmentIndex);
    output[apartmentIndex].intensity += 1;
  }

  for (var distraction = 0; distraction < distractionTotal; distraction++) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    output[apartmentIndex].distraction += 1;
    console.log("apparment index " + apartmentIndex);
  }
  for (
    var forgetfulness = 0;
    forgetfulness < forgetfulnessTotal;
    forgetfulness++
  ) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    output[apartmentIndex].forgetfulness += 1;
    console.log("apparment index " + apartmentIndex);
  }
  return output;
}*/
