import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import './LineChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
  
  export  function LineChart({sisu, curso, campus, siglaIes}) {
  
    return(
      <div className="grafico-line">
        <Line
          className="line"
          data = {{
            labels: sisu.map((value) => value.ano),
            datasets: [
              {       
                label: `Concorrência por Ano ao Longo dos Anos`,
                data: sisu.map((value) => value.quantidade),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
              legend: {
              position: "top",
              },
              title: {
              display: true,
              text: `Concorrência no Curso de ${curso} da ${siglaIes} - ${campus} ao Longo dos Anos`,
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