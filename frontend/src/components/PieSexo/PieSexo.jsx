import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './PieSexo.css'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);

export function PieSexo({sexo, ano, curso}){
    return(
      <div className='grafico-sexo'>
        <Pie
            className='pieSexo'
            data={{
                labels: ['FEMININO', 'MASCULINO'], 
                datasets: [
                  {
                    label: 'Concorrência por sexo', 
                    data: sexo.map((sexo) => sexo.quantidade),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                    ], 
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ], 
                    borderWidth: 1,
                  },
                ],
              }}
            options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Proporção de Candidatos Masculinos e Femininos no SISU ${ano} – Curso de ${curso}`
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${percentage}%`;
                      },
                    },
                  },
                  datalabels: {
                    formatter: (value, context) => {
                      const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                      const percentage = ((value / total) * 100).toFixed(2);
                      return `${percentage}%`;
                    },
                    color: '#000000',
                  },
                },
            }}
        />
      </div>
    )
}