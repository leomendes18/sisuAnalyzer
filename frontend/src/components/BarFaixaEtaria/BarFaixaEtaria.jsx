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
import './BarFaixaEtaria.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  
  export  function BarFaixaEtaria({faixaEtaria, ano, curso, campus, siglaIes}) {
  
    return(
      <div className="grafico-faixaEtaria">
        <Bar
          className="barFaixaEtaria"
          data = {{
            labels: faixaEtaria.map((value) => value.faixa_etaria),
            datasets: [
              {
                label: `FAIXA ETÁRIA`,
                data: faixaEtaria.map((value) => value.total_faixaetaria),
                backgroundColor: "#3498db",
                borderColor: "#2980b9",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            indexAxis: "x",
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Distribuição por Faixa Etária dos Candidatos do SISU ${ano} no Curso ${curso} da ${siglaIes} - ${campus}`,
              },
              datalabels: {
                color: '#000000'
              }
            },
          }}
        />
      </div>
    )
  }

  BarFaixaEtaria.propTypes = {
    faixaEtaria: PropTypes.array.isRequired,
    ano: PropTypes.string.isRequired,
    curso: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    siglaIes: PropTypes.string.isRequired,
  }