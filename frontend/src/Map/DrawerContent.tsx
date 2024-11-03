import { Box, Skeleton } from "@mui/material";
import { FC } from "react";
import { Image } from "@unpic/react";
import theme from "../theme";

interface Props {
  isLoading: boolean;
  imageUrls: string[];
}

const Component: FC<Props> = ({ isLoading, imageUrls }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: theme.spacing(1),
        width: "100%",
      }}
    >
      {isLoading
        ? [...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={100}
              height={100}
              sx={{ flexShrink: 0 }}
            />
          ))
        : imageUrls.map((url, index) => (
            <Image
              key={index}
              layout="constrained"
              src={url}
              alt={`Image ${index}`}
              width={100}
              height={100}
            />
          ))}
    </Box>
  );
};

export default Component;
