import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Imagem ocupando 100% da largura com suavização */}
      <img
        src="/turbodetail.jpg"
        alt="Car Detailing"
        className="w-full h-[45vh] object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-700"
      />

      {/* Container centralizado para as informações da empresa */}
      <div className="flex flex-col items-center justify-center h-[55vh] space-y-6 px-6 sm:px-8 py-6 text-center bg-black bg-opacity-70 rounded-tl-xl rounded-tr-xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
          Turbo Detail
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Premium Auto Detailing Services in Toronto, ON. Elevating your car to its best, providing a spotless finish with every detail.
        </p>
        <p className="text-gray-400 text-sm sm:text-base">
          📍 Toronto, ON | 📞 (519) 918-6506 | 📧 cauecatonesilva@gmail.com
        </p>
        <Button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
          <Link href={`/schedule`}> Book a Service</Link>
        </Button>
      </div>
    </div>
  );
}
