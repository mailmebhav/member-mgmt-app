"use client"
import * as React from "react";
import HomeContent from "@/components/HomeContent";
import Header from "@/components/Header";
import Copyright from "@/components/Copyright";
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [value, ] = useLocalStorage("token")
  if(value)
  {
  return (
    <>
      <Header />
      <HomeContent />
      <Copyright />
    </>
  );
  }
  else
  {
      router.push('/login')
  }
}
