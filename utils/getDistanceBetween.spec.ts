import { getDistanceBetweenPoints } from "./getDistanceBetweenPoints";

describe("Unit test: getDistanceBetween", () => {
  it("Should return a distance between two point", async () => {
    const result = getDistanceBetweenPoints(
      {
        lat: 48.8759992,
        lon: 2.3481253,
        name: "Arc de triomphe",
      },
      {
        lat: 48.82094216189432,
        lon: 2.4049238868200975,
        event_type: "imp",
      }
    );
    expect(typeof result).toBe("number");
  });
});
