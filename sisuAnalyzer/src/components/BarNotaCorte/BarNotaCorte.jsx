import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './BarNotaCorte.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarNotaCorte({notaCorte, curso, type, modConcorrencia}){
    const filterNotaCorte = notaCorte.slice(0,20)
    const brevModConcorrencia =  modConcorrencia.length >= 100 ? modConcorrencia.slice(0, 100) + '...' : modConcorrencia

    return (
      <div className="grafico-notaCorte">
          <Bar
            className="barCorte"
            data = {{
              labels: filterNotaCorte.map((value) => value.sigla_ies + ' - ' + value.nome_campus),
              datasets: [
                {
                  label: `${type} no curso de ${curso} em todo o Brasil`,
                  data: filterNotaCorte.map((value) => value.nota_corte),
                  backgroundColor: "#3498db",
                  borderColor: "#2980b9",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              indexAxis: "y",
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `${type} em ${curso} na cota ${brevModConcorrencia}`,
                },
                datalabels: {
                  color: '#fff'
                }
              },
            }}
        />
      </div>
    )
}

BarNotaCorte.propTypes = {
  notaCorte: PropTypes.array.isRequired,
  curso: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  modConcorrencia: PropTypes.string.isRequired,
}