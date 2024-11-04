import { useCallback, useState } from "react";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import GoogleMap from "./GoogleMap";
import { URL_GET_IMAGE_URLS, URL_GET_JOURNEY_PINS } from "../const";
import { useFetcher } from "../hooks/fetcher";
import { formatPin, parsePins, Pin } from "./utils";

const Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activePin, setActivePin] = useState<Pin | null>(null);

  const {
    data: pinData,
    error: journeyPinsError,
    isLoading: isJourneyPinsLoading,
  } = useFetcher(URL_GET_JOURNEY_PINS);
  const { data: imageURLsData, isLoading: isImageUrlsLoading } = useFetcher(
    activePin ? `${URL_GET_IMAGE_URLS}/${formatPin(activePin)}.txt` : null,
  );

  const handleClickPin = useCallback((pin: Pin) => {
    setActivePin(pin);
    setIsDrawerOpen(true);
  }, []);

  if (journeyPinsError) return <div>failed to load</div>;
  if (isJourneyPinsLoading) return <div>loading...</div>;

  return (
    <>
      <GoogleMap onClickPin={handleClickPin} pins={parsePins(pinData)} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent
          isLoading={isImageUrlsLoading}
          imageUrls={imageURLsData ? imageURLsData.split("\n") : []}
        />
      </Drawer>
    </>
  );
};

export default Component;
