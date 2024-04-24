"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import userBg from "@/public/assets/images/userBG.png"
import crabBg from "@/public/assets/images/crabBg.png"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  // ${pathname !=== "/auth/login" || pathname !== "/auth/signup" ? "" : ""}

  return (

    <main className=" py-8  relative bg-cs-grey-60-light min-h-dvh">

      <h1 className=" text-3xl text-cs-purple-650 font-bold text-center">CecureStream</h1>
      <div className={` max-w-[510px] mx-auto mt-10 p-6 bg-white rounded-[10px] relative z-10`}>
        <div className={` flex bg-cs-grey-60-light border border-solid border-cs-grey-60 p-1 gap-x-1 rounded-md mb-3 ${pathname !== "/auth/login" && pathname !== "/auth/signup" ? "hidden" : ""}`}>
          <Link href={"/auth/login"} className={` ${pathname === "/auth/login" ? " text-cs-grey-50 bg-cs-purple-650" : " text-cs-grey-400 bg-transparent"}  rounded-[4px] py-3 px-4 font-medium max-h-[52px] w-full text-center`}>Sign in</Link>
          <Link href={"/auth/signup"} className={` ${pathname === "/auth/signup" ? " text-cs-grey-50 bg-cs-purple-650" : " text-cs-grey-400 bg-transparent"} rounded-[4px] py-3 px-4 font-medium max-h-[52px] w-full text-center`}>Sign up</Link>
        </div>
        {children}
      </div>
      <Image src={userBg} alt="bg" className="absolute top-[110px] left-[24%] w-[220px] h-[220px]" />
      <Image src={crabBg} alt="bg" className="absolute top-[250px] right-[25.9%] w-[220px] h-[220px]" />
    </main >
  );
}