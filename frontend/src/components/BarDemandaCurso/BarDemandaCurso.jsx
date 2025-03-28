import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import './BarDemandaCurso.css'
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

export function BarDemandaCurso({demandaCurso, aprovadoCurso, ano, curso, campus, siglaIes}){
    return(
        <div className="grafico-demandaCurso">
            <Bar
                className="barDemandaCurso"
                data = {{
                labels: ['Total de Candidatos X Total de Vagas'],
                datasets: [
                    {
                        label: `Total de Candidatos`,
                        data: demandaCurso.map((value) => value.quantidade),
                        backgroundColor: "#3498db",
                        borderColor: "#2980b9",
                        borderWidth: 1,
                    },
                    {
                        label: `Total de Vagas`,
                        data: aprovadoCurso.map((value) => value.quantidade),
                        backgroundColor: "#34db3f",
                        borderColor: "#069c30",
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
                    text: `Total de Inscritos e Vagas no curso de ${curso} da ${siglaIes} - ${campus} no SISU ${ano}`,
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

BarDemandaCurso.propTypes = {
    demandaCurso: PropTypes.array.isRequired,
    aprovadoCurso: PropTypes.string.isRequired,
    ano: PropTypes.string.isRequired,
    curso: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    siglaIes: PropTypes.string.isRequired,
}