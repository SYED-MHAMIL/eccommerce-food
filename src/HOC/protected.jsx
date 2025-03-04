// "use client";

// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";
// // import { json } from "stream/consumers";

// // type ProtectedRoutesTypes = {
// //   children: ReactNode;
// // };

// export default function ProtectedRoutes({ children }) {
//     const router = useRouter();


//   useEffect(() => {
     
//       const user = localStorage.getItem("fooduser");
//        const json = JSON.parse(user);
//        console.log("json",json);

      
//     if (json?.role === "user") {
//       router.push("/home"); // Redirect user to login page
//     }else if(json?.role === "admin"){
//         router.push("/"); // Redirect admin to admin login page
//     }else{
//         router.push("/home"); // Redirect user to login page
//     }
//   }, []);

//   return <>{children}</>;
// }





















"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoutes({ children }) {
    const router = useRouter();
    const pathname = usePathname(); // Current route ka pata karne ke liye

    // Ye pages public hain, jo guest (bina login) bhi dekh sakta hai
    const publicRoutes = [ "/home", "/login", "/register",];

    useEffect(() => {
        const user = localStorage.getItem("fooduser");
        const json = user ? JSON.parse(user) : null; // Handle null case
       
        console.log("json", json);

        if (!json) {
            // Agar user login nahi hai aur page public nahi hai, toh login page bhejo
            if (!publicRoutes.includes(pathname)) {
                router.push("/home");
            }
        }
       
        else if (json?.role !== "admin" && (pathname.startsWith("/admin") || pathname.startsWith("/") )) {
            // Agar user "admin" pages par jaye to usko home bhejo
            router.push("/home");
        }
    }, [pathname]);

    return <>{children}</>;
}
