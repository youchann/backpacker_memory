import { useCallback, useState } from "react";
import Drawer from "./Drawer";
import GoogleMap from "./GoogleMap";
import { Box, Skeleton } from "@mui/material";
import theme from "../theme";
import { URL_GET_JOURNEY_PLOT } from "../const";
import { useFetcher } from "../hooks/fetcher";
import { parseCoordinates } from "./utils";

const Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data, error, isLoading } = useFetcher(URL_GET_JOURNEY_PLOT);
  const handleClickPin = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <GoogleMap onClickPin={handleClickPin} pins={parseCoordinates(data)} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(1),
            width: "100%",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={100}
              height={100}
              sx={{ flexShrink: 0 }}
            />
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Component;
