import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooptipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  //we have given casesType becoz if we need recovered/deaths ,
  //we can easily change it and fetch data
  let chartData = [];
  let lastDataPoint;

  // this X and Y concept comes from linegraph js content.
  //we minus lastDatapoint because we need current date cases so we difference between two dates

  //data[casesType].forEach((date) => {
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, ...props }) {
  //...props is added as we added classname for linegraph in App.js
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  //---------For table graph we need to resolve data as x-axis with date and y-axis as no of cases----------//

  return (
    <div className={props.className}>
      {data?.length > 0 && ( //optional chaining ie;checks if data is available or not
        <Line
          data={{
            datasets: [
              {
                data: data,
                borderColor: "#CC1034",
                backgroundColor: "rgba(204,16,52,0.5)",
              },
            ],
          }}
          options={options}
        ></Line>
      )}
    </div>
  );
}

export default LineGraph;
