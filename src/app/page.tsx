"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  // Função para converter a imagem em Base64
  const getBase64Image = (imgUrl: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Permite carregar imagens de domínios externos
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg")); // Converte a imagem para Base64 (formato JPEG)
      };
      img.onerror = (error) => reject(error);
      img.src = "/logoTurbo.jpg"; // Caminho para a nova imagem
    });
  };

  // Efeito para carregar a imagem em Base64 quando o componente for montado
  useEffect(() => {
    getBase64Image("/logoTurbo.jpg").then((base64) => {
      setBase64Image(base64 as string);
    });
  }, []);

  // Função para gerar o vCard
  const generateVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Turbo Detail
ORG:Turbo Detail
TEL:+1-519-918-6506
EMAIL:cauecatonesilva@gmail.com
URL:https://turbo-detail.vercel.app
PHOTO;ENCODING=BASE64;TYPE=JPEG:${base64Image}
NOTE:Premium Auto Detailing Services in Toronto, ON.
END:VCARD
    `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "TurboDetail.vcf"; // Nome do arquivo vCard
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Imagem ocupando 100% da largura com suavização */}
      <img
        src="/logoTurbo.jpg"
        alt="Turbo Detail Logo"
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
        <Button
          onClick={generateVCard}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-lg sm:text-xl font-semibold rounded-sm shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Save Contact
        </Button>
      </div>
    </div>
  );
}
