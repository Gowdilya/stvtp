// this file is the get data service.
import React from "react";
import { data } from "../pages/Insights/tableDataSet";
import { buildInsightsOneBuilding } from "./mockDataService";

export function buildEventsAllBuildings(numberOfDays) {
  var output = [];
  for (var buildingIndex = 0; buildingIndex < data.length; buildingIndex++) {
    const buildingId = data[buildingIndex].buildingId;
    const oneBuildingAllUnits = buildEventsOneBuilding(
      buildingId,
      numberOfDays
    );
    let oneBuildingSum = {
      buildingId: data[buildingIndex].buildingId, // buildingId
      address: data[buildingIndex].address, // address
      NumberOfSessions: sumOfSessions(oneBuildingAllUnits), // sum of thisBuildingsInsights[apartmentIndex].NumberOfSessions,  // number of sessions
      AvgSessionLength: 0, // may calculate?
      fire: sumOfFire(oneBuildingAllUnits), // fire
      tooHot: sumOfTooHot(oneBuildingAllUnits), // too Hot
      openBurner: sumOfopenBurner(oneBuildingAllUnits), // openBurner
      powerCut: sumOfpowerCut(oneBuildingAllUnits),
      energyUsed: Math.round(sumOfEnergyUsed(oneBuildingAllUnits)),
      sensor1: Math.round(sumOfSensor1(oneBuildingAllUnits)),
    };
    oneBuildingSum.AvgSessionLength =
      oneBuildingSum.NumberOfSessions == 0
        ? 0
        : Math.round(
            sumSessionLengths(oneBuildingAllUnits) /
              oneBuildingSum.NumberOfSessions /
              60
          ); // display in minutes

    output = output.concat(oneBuildingSum);
  }
  return output;
}

function sumOfpowerCut(myArray) {
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].powerCut;
  }
  return sum;
}
function sumOfopenBurner(myArray) {
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].openBurner;
  }
  return sum;
}
function sumOfTooHot(myArray) {
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].tooHot;
  }
  return sum;
}
function sumOfFire(myArray) {
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].fire;
  }
  return sum;
}

function sumOfEnergyUsed(myArray)
{
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].energyUsed;
  }
  return sum;
}
function sumOfSensor1(myArray)
{
  var sum = 0;
  for (var index = 0; index < myArray.length; index++) {
    sum = sum + myArray[index].sensor1;
  }
  return sum;
}


export function sumOfSessions(myArray) {
  var NumberOfSessions = 0;
  for (var index = 0; index < myArray.length; index++) {
    NumberOfSessions = NumberOfSessions + myArray[index].NumberOfSessions;
  }
  return NumberOfSessions;
}
export function sumSessionLengths(myArray) {
  var sumSessionLength = 0;
  for (var index = 0; index < myArray.length; index++) {
    sumSessionLength =
      sumSessionLength +
      myArray[index].AvgSessionLength * myArray[index].NumberOfSessions;
  }
  return sumSessionLength;
}
export function getNumberOfUnitsPerFloor(numberOfAppartments, rng) {
  if (numberOfAppartments == 50) {
    if (rng() > 0.5) return 10;
    return 5;
  }
  const possibleUnits = [10, 20, 25];
  return possibleUnits[Math.round(0 + rng() * (2 - 0))];
}

export function getBuildingIndex(buildingId) {
  var dataBuildingIndex = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].buildingId === buildingId) {
      dataBuildingIndex = i;
      break;
    }
  }
  return dataBuildingIndex;
}

export function getNumberOfUnitsPerBuilding(buildingId) {
  const possibleUnits = [50, 110, 160, 250];
  return possibleUnits[buildingId % 4];
}

export function buildEventsOneBuilding(buildingId, numberOfDays) {
  //change to generate events based on build score give initial data
  const thisBuildingsInsights = buildInsightsOneBuilding(
    buildingId,
    numberOfDays
  );

  //console.log("inside buildEventsOneBuilding="+buildingId);
  var seedrandom = require("seedrandom");
  var rng = seedrandom(buildingId);
  //console.log(rng());

  const numberOfAppartments = getNumberOfUnitsPerBuilding(buildingId);
  const numberOfUnitsPerFloor = getNumberOfUnitsPerFloor(
    numberOfAppartments,
    rng
  );

  // by unit number, count number of sessions, averageSession length, count Too Hot Event, count 	Open Burner Event, count openBurner Event
  var output = [];
  for (
    var apartmentIndex = 0;
    apartmentIndex < numberOfAppartments;
    apartmentIndex++
  ) {
    let apartment = {
      buildingId: thisBuildingsInsights[apartmentIndex].buildingId, // buildingId
      address: thisBuildingsInsights[apartmentIndex].address, // address
      UnitNumber: calcUnitId(numberOfUnitsPerFloor, apartmentIndex), // unit Id, could get fancy with making apartment addresses look nicer with a nice formula (unitsPerfloor)
      NumberOfSessions: thisBuildingsInsights[apartmentIndex].NumberOfSessions, // number of sessions
      AvgSessionLength: thisBuildingsInsights[apartmentIndex].AvgSessionLength, // average session length
      fire: 0, // fire
      tooHot: 0, // too Hot
      openBurner: 0, // openBurner
      powerCut: 0, // cooking session frequency: number of sessions per day or per week
      energyUsed: 0,
      sensor1: ''
    };
    output = output.concat(apartment);
  }

  //console.log(output);
  const totalSessions = sumOfSessions(output);
  //console.log("totalSessions: "+totalSessions);
  const totalSessionLength = sumSessionLengths(output);
  //console.log("totalSessionLength (h): "+totalSessionLength/3600);
  const normalizedSession = Math.round(totalSessionLength / 3600);
  // distrubute X,Y,Z events over numberOfAppartments
  for (
    var unitIndexTmp = 0;
    unitIndexTmp < numberOfAppartments;
    unitIndexTmp++
  ) {
    const thisUnitsTotalSessionLengths =
      (thisBuildingsInsights[unitIndexTmp].NumberOfSessions *
        thisBuildingsInsights[unitIndexTmp].AvgSessionLength) /
      3600;
    const numberOfFires = Math.round(
      ((thisBuildingsInsights[unitIndexTmp].intensity / 100) *
        thisUnitsTotalSessionLengths) /
        100
    );
    output[unitIndexTmp].fire = numberOfFires;
    output[unitIndexTmp].powerCut = numberOfFires; // fire always cuts power
    // console.log(" intensity:"+ thisBuildingsInsights[unitIndexTmp].intensity
    //          +" Sessions: "+ thisBuildingsInsights[unitIndexTmp].NumberOfSessions
    //        +" numberOfFires:"+numberOfFires);
    //console.log("days: "+numberOfDays+" number of sessions"+thisBuildingsInsights[unitIndexTmp].NumberOfSessions);
    //console.log("sessionspersday: "+thisBuildingsInsights[unitIndexTmp].NumberOfSessions/numberOfDays);

    const manyTooHot = Math.round(
      (thisBuildingsInsights[unitIndexTmp].distraction / 100) *
        thisUnitsTotalSessionLengths
    );
    //console.log("hot= "+ manyTooHot +"  distraction= "+thisBuildingsInsights[unitIndexTmp].distraction);
    output[unitIndexTmp].tooHot = manyTooHot;
    const manyOpen = Math.round(
      (thisBuildingsInsights[unitIndexTmp].forgetfulness / 100) *
        thisUnitsTotalSessionLengths
    );
    output[unitIndexTmp].openBurner = manyOpen;
    for (
      var badEvents = 0;
      badEvents < manyOpen + manyTooHot;
      badEvents++ //other events may cut power
    ) {
      chanceIncrementPowerCut(unitIndexTmp);
    }

    output[unitIndexTmp].energyUsed = Math.round( (thisUnitsTotalSessionLengths) * (1000 + rng() * 2000) /1000  )   ; // (kW-H)- 2 decimal places
    output[unitIndexTmp].sensor1 = Math.round( rng() * ((thisBuildingsInsights[unitIndexTmp].distraction / 100) *     thisUnitsTotalSessionLengths) /  100 ); 
  }

  return output;

  function chanceIncrementPowerCut(apartmentIndex) {
    const chanceNoPowerOff = 0.98;
    if (rng() > chanceNoPowerOff) {
      output[apartmentIndex].powerCut += 1;
    }
  }
}

export function calcUnitId(numberOfUnitsPerFloor, apartmentIndex) {
  const floorIndex = Math.floor(apartmentIndex / numberOfUnitsPerFloor) + 1;
  const unitIndex = apartmentIndex % numberOfUnitsPerFloor;
  return floorIndex * 100 + unitIndex + 1;
}
/*
export function buildSensorEvents( buildingId, apartmentNumber, sessionTimestamp, numberOfDays, numberOfSessions, fireTotal, tooHotTotal, 
    openBurnerTotal, powerCutTotal)
{
    // take in 1 apartmentNumber, buildingId, sessionTimestamp, NumberOfDays
    // sumOf fire, tooHot, forgetfulnesss
  // %chance insertBreakfast session   (session length, apartmentNumber, buildingId, sessionTimestamp, NumberOfDays initialize event counts to 0)
  // %chance insertLunch session
  // %chance insertDinner session
  //    //  for numberOfDays
  console.log("build events called");
  console.log(
    "with " +
      buildingId +
      " " +
      apartmentNumber +
      " " +
      sessionTimestamp +
      " " +
      numberOfDays +
      " " +
      fireTotal +
      " " +
      tooHotTotal +
      " " +
      openBurnerTotal
  );
  var output = [];
  const avgSessionsPerDay = numberOfSessions / numberOfDays;
  console.log(
    "numberOfSessions" + numberOfSessions + ", numberOfDays" + numberOfDays
  );
  for (var day = 0; day < numberOfDays; day++) {
    let breakfast = {
      buildingId: buildingId,
      apartmentNumber: apartmentNumber,
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 8 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      fire: 0, // fire
      tooHot: 0, // too Hot
      openBurner: 0, // openBurner
      powerCut: 0, //    safet
    };
    if (rng() + 0.1 < avgSessionsPerDay / 3) {
      //console.log("added breakfast");
      output = output.concat(breakfast);
    }
  }
  for (var day = 0; day < numberOfDays; day++) {
    let lunch = {
      buildingId: buildingId,
      apartmentNumber: apartmentNumber, // apartmentNumber
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 12 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      fire: 0, // fire
      tooHot: 0, // too Hot
      openBurner: 0, // openBurner
      powerCut: 0,
    };
    if (rng() + 0.1 < avgSessionsPerDay / 3) {
      //  console.log("added lunch");
      output = output.concat(lunch);
    }
  }
  for (var day = 0; day < numberOfDays; day++) {
    let dinner = {
      buildingId: buildingId,
      apartmentNumber: apartmentNumber, // apartmentNumber
      sessionStartTime: sessionTimestamp + day * (60 * 60 * 24) + 18 * 60 * 60,
      sessionLength: Math.round(300 + rng() * (2800 - 300)), // session length
      fire: 0, // fire
      tooHot: 0, // too Hot
      openBurner: 0, // openBurner
      powerCut: 0,
    };
    if (rng() - 0.2 < avgSessionsPerDay / 3) {
      //console.log("added dinner");
      output = output.concat(dinner);
    }
  }
  console.log("count is " + output.length);

  for (var fire = 0; fire < fireTotal; fire++) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    console.log("apparment index " + apartmentIndex);
    output[apartmentIndex].fire += 1;
  }

  for (var tooHot = 0; tooHot < tooHotTotal; tooHot++) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    output[apartmentIndex].tooHot += 1;
    // console.log("apparment index "+apartmentIndex);
  }
  for (var openBurner = 0; openBurner < openBurnerTotal; openBurner++) {
    let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
    output[apartmentIndex].openBurner += 1;
    // console.log("apparment index "+apartmentIndex);
  }
  for (var cut = 0; cut < powerCutTotal; cut++) {
    let allocatedPowerCut = false;
    while (allocatedPowerCut === false) {
      let apartmentIndex = Math.floor(0 + rng() * (output.length - 0));
      if (
        output[apartmentIndex].openBurner > 0 ||
        output[apartmentIndex].fire > 0 ||
        output[apartmentIndex].tooHot > 0
      );
      {
        output[apartmentIndex].powerCut += 1;
        allocatedPowerCut = true;
        console.log("cut power apparment index " + apartmentIndex);
      }
    }
  }
  return output;
}

*/
