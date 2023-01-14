import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  import faker from 'faker';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Bookings previous month',
    },
  },
};
const date = moment();

const labels = [0,7,14,21,28].map(day => (
    moment().subtract(day, 'day').format('DD/MM')
)).reverse();


export const data = {
  labels,
  datasets: [
    {
      label: 'count',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: 'rgba(194, 255, 0, 0.8)',
      backgroundColor: 'rgba(194, 255, 0, 0.4)',
    },
  ],
};

export default function BookingChart() {
    const date = moment();
    return <Line options={options} data={data} height={400} width={600} />;
}
