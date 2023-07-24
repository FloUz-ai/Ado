export type CustomEvent = {
  lat: number;
  lon: number;
  event_type: "imp" | "click";
};

export type CSVReturn = {
  lat: number;
  lon: number;
  event_type: "imp" | "click";
};

export type PointOfInterest = {
  lat: number;
  lon: number;
  name: string;
};

export type APIResponse = {
  [key: string]: PointOfInterest & { impressions: number; clicks: number };
};
