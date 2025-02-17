import { useEffect } from 'react';

type ToastProps = {
  message: string;
  duration: number; // Duração do toast em milissegundos
  onClose: () => void; // Função chamada quando o toast fecha
};

export const Toast = ({ message, duration, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Fecha o toast após a duração
    }, duration);

    // Limpar o timer ao desmontar o componente
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className="fixed top-4 right-4 p-4 bg-green-600 text-white rounded-md shadow-lg z-50">
      <p>{message}</p>
    </div>
  );
};
