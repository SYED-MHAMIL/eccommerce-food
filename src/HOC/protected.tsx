// "use client";

// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";

// type ProtectedRoutesTypes = {
//   children: ReactNode;
// };

// export default function ProtectedRoutes({ children }: ProtectedRoutesTypes) {
//     const router = useRouter();
//   const isAuth = () => {
//     return !!localStorage.getItem("token");
//   };

//   useEffect(() => {
//     if (!isAuth()) {
//       router.push("/login"); // Redirect user to login page
//     }
//   }, []);

//   return <>{children}</>;
// }
