"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BaseUrl from "@/utils/url";
import { useCardContext } from "@/context/caredcontext";
import {toast} from 'react-toastify' 
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const {addToken}=useCardContext();
 const router=useRouter()



  const handleSubmit =async (e:React.FormEvent) => {
    e.preventDefault();  
    try {
      const res=await axios.post(`${BaseUrl.login}`, { email, password })
      if (typeof window !== 'undefined') {
      localStorage.setItem('fooduser',JSON.stringify(res.data.data._doc))
      }
       console.log(res.data);
       
    console.log("Logging in with:", { email, password });
    setEmail('')
    setPassword('') 
      toast.success('User Registered Successfully')
      addToken(res.data.data.token)
      router.push('/home')
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || "error");
      } else {
        toast.error("An unexpected error occurred");
      }
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
        
             <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
