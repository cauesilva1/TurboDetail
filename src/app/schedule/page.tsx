"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast/toast";

// Função para gerar os dias do mês
const generateDaysInMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Estado para gerenciar a mensagem do toast
  const [showToast, setShowToast] = useState(false); // Estado para gerenciar se o toast deve ser exibido
  const router = useRouter();

  // Função para alterar o mês
  const changeMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const daysInMonth = generateDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null); // Reset time when selecting a new date
    setShowConfirmButton(false); // Hide confirm button until both date and time are selected
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setShowConfirmButton(true); // Show confirm button once both date and time are selected
  };

  const handleBooking = () => {
    // Exibe o Toast de sucesso
    setToastMessage(`Agendamento realizado com sucesso! Você agendou para ${selectedDate?.toLocaleDateString()} às ${selectedTime}`);
    setShowToast(true); // Exibe o Toast

    console.log("Agendamento realizado com sucesso!");

    // Redireciona para a página inicial após o agendamento
    setTimeout(() => {
      router.push("/"); // Redireciona para a página inicial
    }, 3000); // Tempo para o toast desaparecer antes do redirecionamento
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black py-6 px-6">
      {/* Título da Página */}
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Agende seu Serviço</h1>

      {/* Navegação entre meses */}
      <div className="flex justify-between items-center w-full max-w-md mb-6">
        <Button onClick={() => changeMonth(-1)} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Anterior
        </Button>
        <h2 className="text-2xl text-white">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <Button onClick={() => changeMonth(1)} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Próximo
        </Button>
      </div>

      {/* Calendário Customizado */}
      <div className="w-full max-w-md mb-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
            <div key={index} className="text-center text-white font-semibold text-sm">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 text-center rounded-lg text-sm ${selectedDate?.toDateString() === day.toDateString() ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-blue-500"}`}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Selecione o horário - Botões de horário */}
      {selectedDate && (
        <div className="w-full max-w-md mb-6">
          <h2 className="text-lg font-bold text-white mb-4 text-center">Escolha o Horário</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Exemplo de horários */}
            {["09:00", "11:00", "13:00", "15:00", "17:00"].map((time) => (
              <Button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`w-full py-3 text-lg font-medium rounded-lg ${selectedTime === time ? "bg-blue-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"} shadow-md transform transition-all duration-200`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Confirmar Agendamento */}
      {showConfirmButton && selectedDate && selectedTime && (
        <Button onClick={handleBooking} className="w-full max-w-md bg-green-600 text-white py-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
          Confirmar Agendamento
        </Button>
      )}

      {/* Exibindo o Toast */}
      {showToast && toastMessage && (
        <Toast message={toastMessage} duration={3000} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
