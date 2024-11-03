import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { FC, memo, ReactElement, useEffect, useRef } from "react";
import { Pin } from "./utils";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} Loading</h3>;
  if (status === Status.FAILURE) return <h3>{status} Failure</h3>;
  return <div />; // MEMO: 型の都合上書いているだけなので実際は使われない
};

const MyMapComponent: FC<{
  options: google.maps.MapOptions;
  onClickPin: (pin: Pin) => void;
  pins: Pin[];
}> = ({ options, onClickPin, pins }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, options);
    for (const pin of pins) {
      // MEMO: google.maps.MarkerはDeprecatedだが代替となるgoogle.maps.marker.AdvancedMarkerElementが使えないため一旦このままで
      const marker = new window.google.maps.Marker({
        map,
        position: pin,
        title: pin.regionName,
      });
      marker.addListener("click", () => {
        // TODO: 画像一覧を出力する
        onClickPin(pin);
      });
    }
  });

  return <div ref={ref} id="map" />;
};

const Component: FC<{ onClickPin: (pin: Pin) => void; pins: Pin[] }> = memo(
  ({ onClickPin, pins }) => {
    const center = { lat: 41.3775, lng: 64.5853 };
    const zoom = 3;
    return (
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_API_KEY}
        render={render}
      >
        <MyMapComponent
          options={{ center, zoom }}
          onClickPin={onClickPin}
          pins={pins}
        />
      </Wrapper>
    );
  },
);

export default Component;
