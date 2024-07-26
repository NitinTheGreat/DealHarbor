"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute(Component: any) {
  return function ProtectedRoute(props: any) {
    const router  = useRouter();
    useEffect(() => {
      const user = localStorage.getItem("token");
     
      if (!user) {
      router.push("/Login");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Component {...props}/>;
};
}