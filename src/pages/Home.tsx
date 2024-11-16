import React, { useEffect, useState } from "react";
import {
  getCropAverageData,
  getYearlyProductionData,
} from "../utils/dataAnalysis";

import TableDisplay from "../components/TableDisplay";
import { loadDataset } from "../utils/jsonLoader";

// Define the data types
interface YearlyProduction {
  Year: number;
  MaxCrop: string;
  MinCrop: string;
}

interface CropAverage {
  Crop: string;
  AverageYield: string;
  AverageArea: string;
}

const Home: React.FC = () => {
  const [yearlyData, setYearlyData] = useState<YearlyProduction[]>([]);
  const [averageData, setAverageData] = useState<CropAverage[]>([]);

  useEffect(() => {
    loadDataset().then((data) => {
      const yearly = getYearlyProductionData(data);
      const averages = getCropAverageData(data);

      setYearlyData(yearly);
      setAverageData(averages);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Indian Agriculture Analytics</h1>

      <h2>Yearly Production Data</h2>
      <TableDisplay
        headers={["Year", "MaxCrop", "MinCrop"]}
        rows={yearlyData.map((data) => ({
          Year: data.Year.toString(), // Ensure Year is a string
          MaxCrop: data.MaxCrop,
          MinCrop: data.MinCrop,
        }))}
      />

      <h2>Crop Average Data</h2>
      <TableDisplay
        headers={["Crop", "AverageYield", "AverageArea"]}
        rows={averageData.map((data) => ({
          Crop: data.Crop,
          AverageYield: data.AverageYield,
          AverageArea: data.AverageArea,
        }))}
      />
    </div>
  );
};

export default Home;
