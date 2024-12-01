import { useState, useEffect } from 'react'; // Para usar hooks de estado e efeito
import Title from './Components/Title'; // Importando o componente Title
import './App.css'; // Importando o CSS para o estilo
import Counter from './Components/Counter';

function App() {
  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const [eventoData, setEventoData] = useState("2025-01-01T00:00:00Z"); // Data de evento padrão
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date(eventoData); // Usando a data personalizada
      const currentDate = new Date();
      const diff = targetDate - currentDate;

      // Calculando dias, horas, minutos e segundos restantes
      const diasRestantes = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horasRestantes = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutosRestantes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundosRestantes = Math.floor((diff % (1000 * 60)) / 1000);

      // Atualizando o estado com os valores calculados
      setDias(diasRestantes);
      setHoras(horasRestantes);
      setMinutos(minutosRestantes);
      setSegundos(segundosRestantes);

      // Limpar o intervalo quando a contagem regressiva chegar a zero
      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000); // Atualiza a cada segundo

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [eventoData]); // Executa o efeito sempre que a data do evento mudar

  const handleDateChange = (event) => {
    setCustomDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (customDate) {
      setEventoData(customDate);
    }
  };

  return (
    <div className="App" style={{ backgroundImage: 'url(/img/fogos.jpg)' }}>
      <div className="Container">
        <Title title="Contagem regressiva para o evento" />

        {/* Formulário para personalizar a data do evento */}
        <div className="Formulario">
          <form onSubmit={handleSubmit}>
            <label>
              Data e Hora do Evento:
              <input
                type="datetime-local"
                value={customDate}
                onChange={handleDateChange}
              />
            </label>
            <button type="submit">Atualizar Data</button>
          </form>
        </div>

        {/* Exibição da contagem regressiva */}
        <div className="Cronometro">
          <Counter title="Dias" number={dias} />
          <Counter title="Horas" number={horas} />
          <Counter title="Minutos" number={minutos} />
          <Counter title="Segundos" number={segundos} />
        </div>
      </div>
    </div>
  );
}

export default App;
