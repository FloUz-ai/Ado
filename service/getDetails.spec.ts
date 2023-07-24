import getDetails from "./getDetails";
import POI from "../data/points-of-interest.json";
import * as utils from "../utils/readEventCsv";
import { CustomEvent } from "../types";

describe("Unit test: getDetails", () => {
  beforeAll(() => {
    jest.spyOn(utils, "readCSVFile").mockResolvedValue([
      {
        lat: "lat",
        lon: "lon",
        event_type: "event_type",
      },
      {
        lat: 48.82094216189432,
        lon: 2.4049238868200975,
        event_type: "imp",
      },
    ] as CustomEvent[]);
  });
  it("Should return an empty object if no point of interest is received", async () => {
    const result = await getDetails([]);
    expect(result).toEqual({});
  });
  it("Should return an object containing the point of interest with the amounts of click and impression", async () => {
    const result = await getDetails(POI);
    const firstValues = Object.values(result)[0];

    expect(firstValues).toHaveProperty("lat");
    expect(firstValues).toHaveProperty("lon");
    expect(firstValues).toHaveProperty("name");
    expect(firstValues).toHaveProperty("clicks");
    expect(firstValues).toHaveProperty("impressions");
  });
});
