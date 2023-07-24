import path from "path";
import { readCSVFile } from "../utils/readEventCsv";
import { APIResponse, CSVReturn, PointOfInterest } from "../types";

import { getDistanceBetweenPoints } from "../utils/getDistanceBetweenPoints";

const headers = ["lat", "lon", "event_type"];
const csvFilePath = path.resolve(__dirname, "../data/events.csv");

const getDetails = async (POI: PointOfInterest[]): Promise<APIResponse> => {
  const eventsArr: CSVReturn[] = await readCSVFile(csvFilePath, headers);
  let result: APIResponse = {};

  for (let i = 1; i < eventsArr.length; i++) {
    let closestPoint: PointOfInterest | undefined;
    let refDistance: number | undefined;

    for (const point of POI) {
      const distance = getDistanceBetweenPoints(point, {
        ...eventsArr[i],
        lat: Number(eventsArr[i].lat),
        lon: Number(eventsArr[i].lon),
      });
      if (!refDistance || distance < refDistance) {
        refDistance = distance;
        closestPoint = point;
      }
    }
    if (closestPoint) {
      if (!result[closestPoint.name]) {
        result[closestPoint.name] = {
          ...closestPoint,
          clicks: 0,
          impressions: 0,
        };
      }

      if (eventsArr[i].event_type === "click") {
        result[closestPoint.name].clicks += 1;
      } else {
        result[closestPoint.name].impressions += 1;
      }
    }
  }
  return result;
};

export default getDetails;
