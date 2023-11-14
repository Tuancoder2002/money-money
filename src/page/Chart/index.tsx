import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const xyValues = [
  { x: 50, y: 7 },
  { x: 60, y: 8 },
  { x: 70, y: 8 },
  { x: 80, y: 9 },
  { x: 90, y: 9 },
  { x: 100, y: 9 },
  { x: 110, y: 10 },
  { x: 120, y: 11 },
  { x: 130, y: 14 },
  { x: 140, y: 14 },
  { x: 150, y: 15 },
];

function MyChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // Thêm một tham chiếu cho biểu đồ

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        // Nếu đã có một biểu đồ, hủy nó trước khi tạo biểu đồ mới
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [{
              pointRadius: 4,
              pointBackgroundColor: "#fff70e",
              data: xyValues,
            }],
          },
          options: {
            // Các tùy chọn biểu đồ của bạn có thể đặt ở đây
          },
        });
      }
    }
  }, []);

  return (
    <div className='d-flex justify-content-center mt-4 mb-4' >
      <canvas
        id="myChart"
        ref={chartRef}
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "rgba(54, 19, 84, 0.8)",
          height: "100%",
          maxHeight:"500px",
          color:"#fff"
        }}
        className='rounded-1'
      >
      </canvas>
    </div>
  );
}

export default MyChart;
