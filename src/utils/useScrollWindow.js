import { useEffect, useState } from "react";

export const useScrollWindow = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    window.onscroll = () => {
      setScrollY(window.scrollY);
    };
  }, [scrollY]);

  return scrollY;
};
