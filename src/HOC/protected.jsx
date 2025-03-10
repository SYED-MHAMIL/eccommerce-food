
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProtectedRoutes({ children }) {
    const router = useRouter();
    const pathname = usePathname(); // Current route ka pata karne ke liye
    const [isClient, setIsClient] = useState(false);

    // Ye pages public hain, jo guest (bina login) bhi dekh sakta hai
    const publicRoutes = [ "/home", "/login", "/register",];

    useEffect(() => {
        setIsClient(true);
      }, []);

    useEffect(() => {
        if (isClient) {

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
    }
    }, [pathname,isClient]);

    if (!isClient) {
        return null;
      }
    


    return <>{children}</>;
}
