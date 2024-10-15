import { useCallback, useState } from "react";
import Drawer from "./Drawer";
import GoogleMap from "./GoogleMap";

const Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleClickPin = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);
  return (
    <>
      <GoogleMap onClickPin={handleClickPin} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div>hoge</div>
      </Drawer>
    </>
  );
};

export default Component;
