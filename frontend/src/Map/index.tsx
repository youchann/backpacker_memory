import { useCallback, useState } from "react";
import Drawer from "./Drawer";
import GoogleMap from "./GoogleMap";
import { Box, Skeleton } from "@mui/material";
import theme from "../theme";

const Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleClickPin = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);
  return (
    <>
      <GoogleMap onClickPin={handleClickPin} />
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
