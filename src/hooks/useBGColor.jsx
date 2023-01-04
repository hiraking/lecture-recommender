import { useRouter } from "next/router";

const { useEffect, useMemo } = require("react");

export const useBGColor = () => {
  const router = useRouter();
  console.log(router);

  const bgColor = useMemo(() => {
    return router.pathname === "/" ? "lightblue" : "tomato";
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [bgColor]);
};
