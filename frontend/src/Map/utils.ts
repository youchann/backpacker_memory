export interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * ファイル名から座標情報を抽出し、構造体の配列に変換する関数
 *
 * @param text 改行区切りのファイル名テキスト
 * @returns 座標情報の配列
 */
export const parseCoordinates = (text: string): Coordinate[] =>
  text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((filename) => {
      const match = filename.match(/^(\d+\.\d+)N_(\d+\.\d+)E/);
      if (!match) return null;

      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);

      if (isNaN(lat) || isNaN(lng)) return null;

      return { lat, lng };
    })
    .filter((coord): coord is Coordinate => coord !== null);
