import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useRef, useState } from "react";
import Drawer from "./Drawer";

/**
 * 画像が存在するピンの座標群（モック）
 */
const pinsMock = [
  { lat: 52.52, lng: 13.405 }, // ドイツ（ベルリン）
  { lat: 50.075, lng: 14.437 }, // チェコ（プラハ）
  { lat: 47.497, lng: 19.04 }, // ハンガリー（ブダペスト）
  { lat: 42.697, lng: 23.321 }, // ブルガリア（ソフィア）
  { lat: 39.933, lng: 32.859 }, // トルコ（アンカラ）
  { lat: 41.716, lng: 44.783 }, // ジョージア（トビリシ）
  { lat: 51.16, lng: 71.47 }, // カザフスタン（ヌルスルタン）
  { lat: 41.299, lng: 69.24 }, // ウズベキスタン（タシケント）
  { lat: 28.614, lng: 77.209 }, // インド（ニューデリー）
  { lat: 21.028, lng: 105.854 }, // ベトナム（ハノイ）
];

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} Loading</h3>;
  if (status === Status.FAILURE) return <h3>{status} Failure</h3>;
  return <div />; // MEMO: 型の都合上書いているだけなので実際は使われない
};

const MyMapComponent = (ops: google.maps.MapOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, ops);
    for (const pin of pinsMock) {
      // MEMO: google.maps.MarkerはDeprecatedだが代替となるgoogle.maps.marker.AdvancedMarkerElementが使えないため一旦このままで
      const marker = new window.google.maps.Marker({
        map,
        position: pin,
        title: `${pin.lat}:${pin.lng}`,
      });
      marker.addListener("click", () => {
        // TODO: 画像一覧を出力する
        console.log(pin);
      });
    }
  });

  return <div ref={ref} id="map" />;
};

const Component = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // TODO: 初期位置は要調整
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 3;
  return (
    <>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_API_KEY}
        render={render}
      >
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
      {/* <Drawer open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>hoge</div>
      </Drawer> */}
    </>
  );
};

export default Component;
