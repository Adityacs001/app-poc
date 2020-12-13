import { useRouter } from "next/router";
import React from "react";

export default function useRouterScroll() {
  const router = useRouter();
  React.useEffect(() => {
    const handler = () => {
      window.scrollTo(0, 0);
    };
    router.events.on("routeChangeComplete", handler);
    return () => {
      router.events.off("routerChangeComplete", handler);
    };
  });
}
