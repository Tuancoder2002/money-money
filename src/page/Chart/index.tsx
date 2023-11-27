import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import {
  transactionActions,
} from "../../redux/transactionReducer";
import { IFilterBodyRequest } from "../../models/Bases/IFilterBodyRequest";
import { FilterLogicalOperator } from "../../models/Bases/FilterLogicalOperator";
import { FilterType } from "../../models/Bases/FilterType";
import { SortDirection } from "../../models/Bases/SortDirection";
import transactionsApi from "../../apis/transactionsApi";
import { useAppDispatch } from "../../redux/hooks";

function MyChart() {
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  const currentMonth: number = currentDate.getMonth() + 1;

  const [newArray, setNewArray] = useState<number[]>(Array(currentMonth).fill(0));

  const fetchTransactionData = async () => {
    try {
      var request: IFilterBodyRequest = {
        filter: {
          logicalOperator: FilterLogicalOperator.And,
          details: [
            {
              attributeName: "transactionDate",
              value: "2023-1-1",
              filterType: FilterType.GreaterThanOrEqual,
            },
            {
              attributeName: "transactionDate",
              value: "2024-1-1",
              filterType: FilterType.LessThan,
            },
          ],
        },
        orders: [
          {
            field: "transactionDate",
            direction: SortDirection.Asc,
          },
        ],
        pagination: {},
      };

      const response = await dispatch(transactionsApi.getAll(request));

      if (transactionsApi.getAll.fulfilled.match(response)) {
        const responseData = response.payload.data;
        dispatch(transactionActions.setTransactions(responseData));

        const updatedArray = Array.from(newArray);

        responseData.forEach((transaction) => {
          if (transaction.transactionDate) {
            const monthTransaction =
              new Date(transaction.transactionDate).getMonth() + 1;
              console.log("Transaction:", transaction);
              if (isNaN(transaction.amount)) {
                console.log("Invalid Amount for Transaction:", transaction);
              }
              if (updatedArray[monthTransaction] === undefined) {
                updatedArray[monthTransaction] = 0;
              }
          
              updatedArray[monthTransaction] += Number(transaction.amount);
          }
        });

        setNewArray(updatedArray);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const xyValues = Array.from({ length: currentMonth }, (_, index) => ({
    x: index + 1 ,
    y: newArray[index+1],
  }));
  
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

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
  }, [newArray]);

  console.log("newArray:", newArray);
console.log("xyValues:", xyValues);


  return (
    <div className="d-flex justify-content-center mt-4 mb-4">
      <canvas
        id="myChart"
        ref={chartRef}
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "rgba(54, 19, 84, 0.8)",
          height: "100%",
          maxHeight: "500px",
          color: "#fff",
        }}
        className="rounded-1"
      ></canvas>
    </div>
  );
}

export default MyChart;
