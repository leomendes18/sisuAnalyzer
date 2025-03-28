import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import './Barchart.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
  
  export  function BarChart({sisu, ano, estado, municipio, campus, tipoAnalise, siglaIes}) {
  
    const filterSisu = sisu.slice(0,20)
    return(
      <div className="grafico-demanda">
        <Bar
          className="barDemanda"
          data = {{
            labels: filterSisu.map((value) => value.nome_curso),
            datasets: [
              {
                label: `Concorrência por Curso`,
                data: filterSisu.map((value) => value.quantidade),
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
                text: tipoAnalise === 'maisConcorrido' ? `Cursos Mais Concorridos do SISU ${ano} ${municipio} ${estado} ${siglaIes} ${campus}` : `Cursos Menos Concorridos do SISU ${ano} ${municipio} ${estado} ${siglaIes} ${campus}`,
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

  BarChart.propTypes = {
    sisu: PropTypes.array.isRequired,
    ano: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    municipio: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    tipoAnalise: PropTypes.string.isRequired,
    siglaIes: PropTypes.string.isRequired,
  }