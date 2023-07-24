import { CustomEvent, PointOfInterest } from "../types";

export const getDistanceBetweenPoints = (
  pointA: PointOfInterest,
  pointB: CustomEvent
) => {
  const R = 6371e3;
  const latARad = (pointA.lat * Math.PI) / 180;
  const latBRad = (pointB.lat * Math.PI) / 180;
  const diffLat = ((pointB.lat - pointA.lat) * Math.PI) / 180;
  const diffLon = ((pointB.lon - pointA.lon) * Math.PI) / 180;

  const a =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(latARad) *
      Math.cos(latBRad) *
      Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
