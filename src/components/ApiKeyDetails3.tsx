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
        updateChart(data.data);
      })
      .catch((error) => {
        console.error(`Error fetching usage data for key name ${keyName}:`, error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyName]);

const updateChart = (data: any) => {
  if (chartRef.current) {
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
    };

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar', 
      data: chartData,
      options: {
        responsive: true,
        scales: {
          'y-min': {
            type: 'linear',
            beginAtZero: true,
            max: data.min_limit as number,
            position: 'right' as const,
            title: {
              display: true,
              text: 'Minute Limit',
            },
          },
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
  return (
<div className="container">
  {usageData ? (
    <>
      <div className="data-section1">
      <h2><div className="svg"><svg width="16" height="10" viewBox="0 0 16 10" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 0H16V6.4H14.4V3.2H12.8V1.6H9.6V0ZM11.2 4.8V3.2H12.8V4.8H11.2ZM9.6 6.4V4.8H11.2V6.4H9.6ZM8 6.4H9.6V8H8V6.4ZM6.4 4.8H8V6.4H6.4V4.8ZM4.8 4.8V3.2H6.4V4.8H4.8ZM3.2 6.4V4.8H4.8V6.4H3.2ZM1.6 8V6.4H3.2V8H1.6ZM1.6 8V9.6H0V8H1.6Z"></path></svg>
      </div> Api Key Usage<span>{keyName}<span className={`isactive ${usageData.is_active ? 'active' : 'disabled'}`}>
  {usageData.is_active ? 'Active' : 'Disabled'}
</span>
<div className="dotring"></div></span></h2>
        <div className="row">
        </div>
      </div>

      <div className="data-section-graph">
        <canvas className="usage" ref={chartRef}></canvas>
      </div>

      <div className="data-section">
        <h2>Usage Limits</h2>
        <div className="row">
          <strong>Min Limit:</strong>
          <span>{usageData.min_limit}</span>
        </div>
        <div className="row">
          <strong>Day Limit:</strong>
          <span>{usageData.day_limit === 0 ? '-' : usageData.day_limit}</span>
        </div>
        <div className="row">
          <strong>Month Limit:</strong>
          <span>{usageData.month_limit === 0 ? '-' : usageData.month_limit}</span>
        </div>
      </div>

      <div className="data-section">
        <h2>API Details</h2>
        <div className="row">
          <strong>API Category:</strong>
          <span>{usageData.api_category}</span>
        </div>
        <div className="row">
          <strong>API Key Expire:</strong>
          <span>{usageData.apikey_expire_ts}</span>
        </div>
        <div className="row">
          <strong>Ended:</strong>
          <span>{usageData.is_ended ? 'Expired' : 'Not Expired'}</span>
        </div>
      </div>

      <div className="data-section">
        <h2>Usage Statistics</h2>
        <div className="row">
          <strong>Monthly Used:</strong>
          <span>{usageData.monthly_used_cnt || '-'}</span>
        </div>
        <div className="row">
          <strong>Monthly Expire:</strong>
          <span>{usageData.monthly_expire_ts || '-'}</span>
        </div>
        <div className="row">
          <strong>Daily Used:</strong>
          <span>{usageData.daily_used_cnt || '-'}</span>
        </div>
        <div className="row">
          <strong>Daily Expire:</strong>
          <span>{usageData.daily_expire_ts || '-'}</span>
        </div>
        <div className="row">
          <strong>Minute Used:</strong>
          <span>{usageData.minute_used_cnt || '-'}</span>
        </div>
        <div className="row">
          <strong>Minute Expire:</strong>
          <span>{usageData.minute_expire_ts || '-'}</span>
        </div>
      </div>
    </>
  ) : (
    <p></p>
  )}
</div>
  );
}

export default ApiKeyDetails;