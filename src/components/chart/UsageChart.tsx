import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';

interface UsageEntry {
  date: string;
  query_count: number;
}

interface UsageChartProps {
  usages: UsageEntry[];
}

const UsageChart: React.FC<UsageChartProps> = ({ usages }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const labels = usages.map(entry => {
        const momentDate = moment(entry.date, 'MM/DD/YYYY H:mm'); // Adjust the format as needed
        return momentDate.format();
      });
      const chartData = usages.map(entry => entry.query_count);
      const ctx = chartRef.current.getContext('2d');
      const gradient = ctx?.createLinearGradient(0, 0, 0, 800);
      if (gradient) {
        gradient.addColorStop(0, 'rgba(247,147,27,0.5)');
        gradient.addColorStop(1, 'rgba(247,147,27,0)');
      }
      const chartConfig = {
        labels: labels,
        datasets: [
          {
            label: 'Hourly Usage',
            fill: true,
            data: chartData,
            backgroundColor: gradient,
            borderColor: '#F7931B',
            tension: 0.1,
            pointBackgroundColor: '#F7931B',
          }
        ]
      };
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartConfig,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'MMM D, hA'
                }
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                autoSkip: true,
                maxTicksLimit: 20
              }
            }
          }
        }
      });      
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [usages]);
  return <canvas className="usage" ref={chartRef}></canvas>;
};

// For standalone testing /////////////////
// const UsagePage = () => {
//   const [usages, setUsages] = useState<UsageEntry[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     setIsLoading(true);
//     axios.get('/api/a7df2ae5-fe39-423a-b31d-bcd6c21cdc68/apikey/usage?keyname=ordinalOS')
//       .then(response => {
//         const data = response.data.data;
//         if (data && Array.isArray(data.usages)) {
//           setUsages(data.usages);
//         } else {
//           setUsages([]);
//         }
//         setIsLoading(false);
//       })
//       .catch(error => {
//         setError(JSON.stringify(error, null, 2));
//         setIsLoading(false);
//       });
//   }, []);
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return (
//     <div>
//       <h1>Usage Data</h1>
//       {Array.isArray(usages) && <UsageChart usages={usages} />}
//     </div>
//   );
// };

export default UsageChart;