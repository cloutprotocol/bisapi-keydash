import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Chart from 'chart.js/auto';

function ApiKeyDetails() {
  const { keyName } = useParams();
  const [usageData, setUsageData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const chartInstance = useRef<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `/api/a7df2ae5-fe39-423a-b31d-bcd6c21cdc68/apikey/usage?keyname=${keyName}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsageData(data.data);
        // Call a function to update the chart when data is available
        updateChart(data.data);
      })
      .catch((error) => {
        console.error(`Error fetching usage data for key name ${keyName}:`, error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyName]);

// Function to update the chart
const updateChart = (data: any) => {
  if (chartRef.current) {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: ['Usage'],
      datasets: [
        {
          label: 'Daily Usage',
          data: [data.daily_used_cnt],
          backgroundColor: '#3498db',
          yAxisID: 'y-daily',
        },
        {
          label: 'Monthly Usage',
          data: [data.monthly_used_cnt],
          backgroundColor: '#2ecc71',
          yAxisID: 'y-monthly',
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        'y-daily': {
          type: 'linear',
          beginAtZero: true,
          max: data.day_limit as number, // Ensure max is typed as number
          position: 'left' as const, // Use 'left' instead of string
          title: {
            display: true,
            text: 'Daily Limit',
          },
        },
        'y-monthly': {
          type: 'linear',
          beginAtZero: true,
          max: data.month_limit as number, // Ensure max is typed as number
          position: 'right' as const, // Use 'right' instead of string
          grid: {
            drawOnChartArea: false, // only draw grid lines for this axis
          },
          title: {
            display: true,
            text: 'Monthly Limit',
          },
        },
      },
    };

    // Create a new chart instance and save it
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar', // You can change the chart type if needed
      data: chartData,
      options: {
        responsive: true,
        scales: {
          'y-daily': {
            type: 'linear',
            beginAtZero: true,
            max: data.day_limit as number,
            position: 'left' as const,
            title: {
              display: true,
              text: 'Daily Limit',
            },
          },
          'y-monthly': {
            type: 'linear',
            beginAtZero: true,
            max: data.month_limit as number,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            title: {
              display: true,
              text: 'Monthly Limit',
            },
          },
        },
      },
    });
  }
};

  // Render the usage data for the specified key name
  return (
    <div>
      <h1>API Key Usage for <span>{keyName}</span></h1>
      {usageData ? (
        <div>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>is_active</td>
              <td>{usageData.is_active ? 'Active' : 'Disabled'}</td>
            </tr>
            <tr>
              <td>is_ended</td>
              <td>{usageData.is_ended ? 'Expired' : 'Not Expired'}</td>
            </tr>
            <tr>
              <td>min_limit</td>
              <td>{usageData.min_limit}</td>
            </tr>
            <tr>
              <td>day_limit</td>
              <td>{usageData.day_limit === 0 ? '-' : usageData.day_limit}</td>
            </tr>
            <tr>
              <td>month_limit</td>
              <td>{usageData.month_limit === 0 ? '-' : usageData.month_limit}</td>
            </tr>
            <tr>
              <td>api_category</td>
              <td>{usageData.api_category}</td>
            </tr>
            <tr>
              <td>monthly_used_cnt</td>
              <td>{usageData.monthly_used_cnt || '-'}</td>
            </tr>
            <tr>
              <td>monthly_expire_ts</td>
              <td>{usageData.monthly_expire_ts || '-'}</td>
            </tr>
            <tr>
              <td>daily_used_cnt</td>
              <td>{usageData.daily_used_cnt || '-'}</td>
            </tr>
            <tr>
              <td>daily_expire_ts</td>
              <td>{usageData.daily_expire_ts || '-'}</td>
            </tr>
            <tr>
              <td>minute_used_cnt</td>
              <td>{usageData.minute_used_cnt || '-'}</td>
            </tr>
            <tr>
              <td>minute_expire_ts</td>
              <td>{usageData.minute_expire_ts || '-'}</td>
            </tr>
            <tr>
              <td>apikey_expire_ts</td>
              <td>{usageData.apikey_expire_ts}</td>
            </tr>
          </tbody>
        </table>
        <div>
        <canvas className='usage' ref={chartRef}></canvas>
        </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default ApiKeyDetails;