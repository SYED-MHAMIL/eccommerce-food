"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import {toast} from 'react-toastify'
import BackendUrl from "../../utils/url";
import { getCookie, setCookie } from 'cookies-next'
import  {useRouter}  from 'next/navigation'
import { useCardContext } from "../../context/caredcontext";
export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  const {addToken}=useCardContext()

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
      const result= await axios.post(`${BackendUrl}/auth/register`, {name, email, password })
    setEmail('')
    setPassword('') 
    setName('')   
  toast.success('User Registered Successfully')
  addToken(result.data.data.token)
  localStorage.setItem('fooduser',JSON.stringify(result.data.data))
  if(result.data.data.role === 'admin'){
    router.push('/')

  }else{
    router.push('/home')
  }
  

} catch (error) {

  toast.error('User Registration Failed')
}
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
          <Input
              type="name"
              placeholder="Enter The Name   "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
