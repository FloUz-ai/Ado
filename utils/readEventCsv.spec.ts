import fs from "fs";
import { readCSVFile } from "./readEventCsv";
import { CSVReturn, CustomEvent } from "../types";

const data = `lat,lon,event_type
48.82094216189432,2.4049238868200975,imp
48.5,2.3,imp`;
const testFile = "./data/test.csv";
const header = ["lat", "lon", "event_type"];

describe("Unit test: readCsv", () => {
  beforeEach(() => {
    fs.writeFileSync(testFile, data, "utf-8");
  });

  afterAll(() => {
    fs.unlinkSync(testFile);
  });
  it("Should read a CSV event and return an array with the expected property", async () => {
    const result = await readCSVFile<CSVReturn>(testFile, header);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result[1]).toHaveProperty("lat");
    expect(result[1]).toHaveProperty("lon");
    expect(result[1]).toHaveProperty("event_type");
  });
});
