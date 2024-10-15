import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import MUIDrawer from "@mui/material/Drawer";
import { FC, ReactNode } from "react";

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <MUIDrawer anchor="bottom" open={isOpen} onClose={onClose}>
      <StyledBox sx={{ p: 2, height: "80vh" }}>{children}</StyledBox>
    </MUIDrawer>
  );
};

export default Drawer;
