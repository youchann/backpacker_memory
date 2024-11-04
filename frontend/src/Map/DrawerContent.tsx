import { CircularProgress } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Gallery, Image as ImageType } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  isLoading: boolean;
  imageUrls: string[];
}

const Component: FC<Props> = ({ isLoading, imageUrls }) => {
  const [index, setIndex] = useState(-1);
  const images: ImageType[] = useMemo<ImageType[]>(() => {
    return imageUrls.map((url) => ({
      src: url,
      width: 0,
      height: 0,
    }));
  }, [imageUrls]);
  const handleClick = (index: number) => setIndex(index);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Gallery images={images} onClick={handleClick} />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default Component;
