"use client"
import { useSession } from "next-auth/react";
import { Appbar } from "../components/app_components/Appbar";
import BlogList from "./blogs/page";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <Appbar />
      <div className="flex flex-col h-screen my-auto items-center font-sans">
        <h1 className="px-5 text-3xl font-extrabold">Blogs</h1>
        <BlogList username={session.data?.user?.email} />
      </div>
    </div>
  );
}
