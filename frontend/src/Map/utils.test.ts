import { parseCoordinates } from "./utils";

describe("parseCoordinates", () => {
  it("should parse valid coordinate strings correctly", () => {
    const input = `47.497N_19.040E_Budapest.txt
28.614N_77.209E_NewDelhi.txt
21.028N_105.854E_Hanoi.txt`;
    const expected = [
      { lat: 47.497, lng: 19.04 },
      { lat: 28.614, lng: 77.209 },
      { lat: 21.028, lng: 105.854 },
    ];
    expect(parseCoordinates(input)).toEqual(expected);
  });

  it("should parse a single coordinate string", () => {
    const input = "47.497N_19.040E_Budapest.txt";
    const expected = [{ lat: 47.497, lng: 19.04 }];
    expect(parseCoordinates(input)).toEqual(expected);
  });

  it("should return empty array for empty string", () => {
    expect(parseCoordinates("")).toEqual([]);
  });

  it("should ignore empty lines", () => {
    const input = `
47.497N_19.040E_Budapest.txt

28.614N_77.209E_NewDelhi.txt
`;
    const expected = [
      { lat: 47.497, lng: 19.04 },
      { lat: 28.614, lng: 77.209 },
    ];
    expect(parseCoordinates(input)).toEqual(expected);
  });

  it("should ignore invalid format lines", () => {
    const input = `47.497N_19.040E_Budapest.txt
invalid_line
28.614N_77.209E_NewDelhi.txt`;
    const expected = [
      { lat: 47.497, lng: 19.04 },
      { lat: 28.614, lng: 77.209 },
    ];
    expect(parseCoordinates(input)).toEqual(expected);
  });

  // 数値の精度テスト
  it("should maintain coordinate precision", () => {
    const input = "47.497123N_19.040456E_Budapest.txt";
    const expected = [{ lat: 47.497123, lng: 19.040456 }];
    expect(parseCoordinates(input)).toEqual(expected);
  });

  it("should return coordinates with number types", () => {
    const input = "47.497N_19.040E_Budapest.txt";
    const coordinates = parseCoordinates(input);

    expect(typeof coordinates[0].lat).toBe("number");
    expect(typeof coordinates[0].lng).toBe("number");
  });
});
