import { NavBar } from "@/components/global/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">Content</main>
    </div>
  );
}
