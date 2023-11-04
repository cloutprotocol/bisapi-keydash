import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface HourlyUsage {
  date: string;
  query_count: number;
}

interface UsageData {
  hour_limit: number;
  hourly_usage: HourlyUsage[];
}

interface UsageChartProps {
  data: UsageData;
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && Array.isArray(data.hourly_usage)) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Convert date strings into Date objects
      const labels = data.hourly_usage.map((usage: HourlyUsage) =>
        new Date(usage.date)
      );
      const chartData = data.hourly_usage.map((usage: HourlyUsage) => usage.query_count);
      const limit = data.hour_limit;

      const chartConfig = {
        labels: labels,
        datasets: [
          {
            label: 'Hourly Usage',
            data: chartData,
            fill: false,
            borderColor: '#3498db',
            tension: 0.1
          },
          {
            label: 'Limit',
            data: Array(labels.length).fill(limit),
            fill: false,
            borderColor: '#e74c3c',
            borderDash: [5, 5],
            tension: 0.1
          }
        ]
      };

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartConfig,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              type: 'time',
              time: {
                // Specify the time unit and format for the x-axis labels
                unit: 'hour',
                tooltipFormat: 'MMM D, hA', // Format for the tooltip
                displayFormats: {
                  hour: 'MMM D, hA'
                }
              },
              title: {
                display: true,
                text: 'Date and Time'
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              position: 'nearest'
            }
          }
        }
      });
    }
  }, [data]);

  return <canvas className="usage" ref={chartRef}></canvas>;
};

export default UsageChart;