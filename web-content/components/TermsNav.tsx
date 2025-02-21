import  Link  from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function TermsNav() {
    const {pathname} = useRouter()
    
  return (
    <div className="flex items-center gap-[20px] flex-wrap lg:mx-10 my-12">
     
    <Link className={`${pathname === "/user-guide" ? "text-cs-purple-500 border-b-[3px] border-solid border-cs-purple-500 font-bold" : "font-normal"} py-3 text-sm text-cs-grey-800 inline-block`} href="/user-guide">
      User Guide
    </Link>
    <Link className={`${pathname === "/terms-of-service" ?"text-cs-purple-500 border-b-[3px] border-solid  border-cs-purple-500 font-bold" : "font-normal"} py-3 text-sm text-cs-grey-800 inline-block`} href="/terms-of-service">
      Terms Of Service
    </Link>
    <Link className={`${pathname === "/privacy-policy"?"text-cs-purple-500 border-b-[3px] border-solid  border-cs-purple-500 font-bold" : "font-normal"} py-3 text-sm text-cs-grey-800 inline-block`} href="/privacy-policy">
      Privacy Policy
    </Link>
    <Link className={`${pathname === "/acceptance-policy"?"text-cs-purple-500 border-b-[3px] border-solid  border-cs-purple-500 font-bold" : "font-normal"} py-3 text-sm text-cs-grey-800 inline-block`} href="/acceptance-policy">
      Acceptable Use Policy
    </Link>
  </div>  )
}
