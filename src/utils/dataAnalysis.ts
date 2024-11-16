import { CropAverage, YearlyProduction } from "../types";

// Function to get yearly production data
interface CropData {
  crop: string;
  production: number;
}

export const getYearlyProductionData = (data: any[]): YearlyProduction[] => {
  const groupedByYear = data.reduce((acc: any, item: any) => {
    const yearString = item.Year;
    const year = parseInt(yearString.match(/\d{4}/)?.[0] || "0"); // Extracts the first 4 digits as year (e.g. "1950")

    if (!acc[year]) acc[year] = [];

    acc[year].push({
      crop: item["Crop Name"],
      production: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0, // Ensure it's a number
    });

    return acc;
  }, {});

  const result: YearlyProduction[] = [];

  for (const year in groupedByYear) {
    const crops = groupedByYear[year];

    // Explicitly type the max and min parameters as CropData
    const maxCrop = crops.reduce(
      (max: CropData, crop: CropData) =>
        crop.production > max.production ? crop : max,
      crops[0]
    );
    const minCrop = crops.reduce(
      (min: CropData, crop: CropData) =>
        crop.production < min.production ? crop : min,
      crops[0]
    );

    result.push({
      Year: parseInt(year),
      MaxCrop: maxCrop.crop,
      MinCrop: minCrop.crop,
    });
  }

  return result;
};

// Function to get crop average data
export const getCropAverageData = (data: any[]): CropAverage[] => {
  const groupedByCrop = data.reduce(
    (
      acc: {
        [key: string]: { totalYield: number; totalArea: number; count: number };
      },
      item: any
    ) => {
      const crop = item["Crop Name"];
      const cropYield = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
        ? parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
        : 0;
      const area = item["Area Under Cultivation (UOM:Ha(Hectares))"]
        ? parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"])
        : 0;

      if (!acc[crop]) {
        acc[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      }

      acc[crop].totalYield += cropYield;
      acc[crop].totalArea += area;
      acc[crop].count += 1;

      return acc;
    },
    {}
  );

  return Object.keys(groupedByCrop).map((crop) => {
    const { totalYield, totalArea, count } = groupedByCrop[crop];
    return {
      Crop: crop,
      AverageYield: (totalYield / count).toFixed(3),
      AverageArea: (totalArea / count).toFixed(3),
    };
  });
};
