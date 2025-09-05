import MenuBar from "@/components/MenuBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MenuBar />
      <Image
        alt="Hero Image"
        src="https://cdn.galaxycine.vn/media/2025/8/28/click-to-pay-visa-6_1756349838815.jpg"
        className="w-full h-auto object-cover container mx-auto rounded-2xl border border-gray-200"
        width={1756}
        height={584}
      />
    </>
  );
}
