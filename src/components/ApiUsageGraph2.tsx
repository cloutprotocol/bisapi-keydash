import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface UsageData {
  month_limit: number;
  day_limit: number;
  min_limit: number;
  monthly_used_cnt: number;
  daily_used_cnt: number;
  minute_used_cnt: number;
  monthly_usage: number[]; // Assuming this is an array of monthly usages
  daily_usage: number[];   // Assuming this is an array of daily usages
  minute_usage: number[];  // Assuming this is an array of minute usages
}

interface UsageChartProps {
  data: UsageData;
  granularity: 'monthly' | 'daily' | 'minute'; // Adjusted granularities
}

const UsageChart: React.FC<UsageChartProps> = ({ data, granularity }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Determine labels and data based on the selected granularity
      let labels;
      let chartData;
      let limit;
      switch (granularity) {
        case 'monthly':
          labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
          chartData = data.monthly_usage;
          limit = data.month_limit;
          break;
        case 'daily':
          labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
          chartData = data.daily_usage;
          limit = data.day_limit;
          break;
        case 'minute':
          labels = Array.from({ length: 60 }, (_, i) => `${i} min`); // Assuming minute granularity is per minute for an hour
          chartData = data.minute_usage;
          limit = data.min_limit;
          break;
      }

      const chartConfig = {
        labels: labels,
        datasets: [
          {
            label: `${granularity.charAt(0).toUpperCase() + granularity.slice(1)} Usage`, // Capitalize the first letter of granularity
            data: chartData,
            fill: false,
            borderColor: '#3498db',
            tension: 0.1
          },
          {
            label: 'Limit',
            data: Array(labels.length).fill(limit), // Line indicating the limit
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
            }
          }
        }
      });
    }
  }, [data, granularity]);

  return <canvas className="usage" ref={chartRef}></canvas>;
};

export default UsageChart;