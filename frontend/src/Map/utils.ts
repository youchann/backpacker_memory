export interface Pin extends google.maps.LatLngLiteral {
  regionName: string;
}

/**
 * ディレクトリ名から座標情報と地域名を抽出し、構造体の配列に変換する関数
 *
 * @param pins ディレクトリ名の配列
 * @returns 座標情報と地域名の配列
 * @example
 * Input: ["47.497N_19.040E_Budapest"]
 * Output: [{ lat: 47.497, lng: 19.040, regionName: "Budapest" }]
 */
export const parsePins = (pins: string[]): Pin[] =>
  pins
    .filter((line) => line.trim() !== "")
    .map((filename) => {
      const match = filename.match(/^(\d+\.\d+)N_(\d+\.\d+)E_(.+)$/);
      if (!match) return null;
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      const regionName = match[3];
      if (isNaN(lat) || isNaN(lng)) return null;
      return { lat, lng, regionName };
    })
    .filter((pin): pin is Pin => pin !== null);

/**
 * Pin オブジェクトから座標文字列を生成する関数
 *
 * @param pin 座標と地域名を含むPinオブジェクト
 * @returns 形式化された座標文字列
 * @example
 * Input: { lat: 47.497, lng: 19.040, regionName: "Budapest" }
 * Output: "47.497N_19.040E_Budapest"
 */
export const formatPin = (pin: Pin | null): string => {
  if (pin === null) return "";
  const lat = pin.lat.toFixed(3);
  const lng = pin.lng.toFixed(3);
  return `${lat}N_${lng}E_${pin.regionName}`;
};
