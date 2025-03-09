import { Chart, registerables, ChartConfiguration, ChartItem } from 'chart.js';
import { createCanvas } from 'canvas';

const generateChartImage = (width: number, height: number) => {
  // Registrar módulos de Chart.js
  Chart.register(...registerables);

  // Crear el lienzo
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Configuración del gráfico
  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [
        {
          label: 'Ventas',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      devicePixelRatio: 2, // Importante
      animation: false,
      maintainAspectRatio: false,
    },
  };

  new Chart(ctx as unknown as ChartItem, config);

  return canvas.toBuffer('image/png').toString('base64');
};

export const getChartReport = () => {
  const [width, height] = [200, 200];
  const chartBase64 = generateChartImage(width, height);

  return {
    content: [
      {
        width,
        height,
        image: `data:image/png;base64,${chartBase64}`,
      },
    ],
  };
};
