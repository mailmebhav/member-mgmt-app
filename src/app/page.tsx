"use client";
import * as React from "react";
import HomeContent from "@/components/HomeContent";
import Header from "@/components/Header";
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

export default function Page() {
  const [isClient , setIsClient] = React.useState(false)
  React.useEffect(()=> {
    setIsClient(true)
  },[])
  const router = useRouter()
  const [token, ] = useLocalStorage("token")
  return (
    isClient &&  ( token ? (
    <>
      <Header />
      <HomeContent />
    </>
    ) : router.push('/login')
  )
)
}
