import { parsePins, Pin } from "./utils";

describe("parsePins", () => {
  it("should parse coordinates and region names correctly", () => {
    const input = `47.497N_19.040E_Budapest
28.614N_77.209E_NewDelhi
21.028N_105.854E_Hanoi`;

    const expected: Pin[] = [
      { lat: 47.497, lng: 19.04, regionName: "Budapest" },
      { lat: 28.614, lng: 77.209, regionName: "NewDelhi" },
      { lat: 21.028, lng: 105.854, regionName: "Hanoi" },
    ];

    expect(parsePins(input)).toEqual(expected);
  });

  it("should handle empty input", () => {
    expect(parsePins("")).toEqual([]);
  });

  it("should handle invalid format", () => {
    const input = "invalid_format";
    expect(parsePins(input)).toEqual([]);
  });

  it("should handle multiple valid and invalid entries", () => {
    const input = `47.497N_19.040E_Budapest
invalid_line
28.614N_77.209E_NewDelhi`;

    const expected: Pin[] = [
      { lat: 47.497, lng: 19.04, regionName: "Budapest" },
      { lat: 28.614, lng: 77.209, regionName: "NewDelhi" },
    ];

    expect(parsePins(input)).toEqual(expected);
  });

  it("should extract region name with special characters", () => {
    const input = "47.497N_19.040E_New-York";
    const expected: Pin[] = [
      { lat: 47.497, lng: 19.04, regionName: "New-York" },
    ];

    expect(parsePins(input)).toEqual(expected);
  });

  it("should handle region names with spaces", () => {
    const input = "47.497N_19.040E_New York";
    const expected: Pin[] = [
      { lat: 47.497, lng: 19.04, regionName: "New York" },
    ];

    expect(parsePins(input)).toEqual(expected);
  });
});
