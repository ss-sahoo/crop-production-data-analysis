import dataset from "../../public/dataset.json";

// Load the dataset (ensure the correct path to your json file)
export const loadDataset = async (): Promise<any[]> => {
  return dataset; // Returning the data directly from the JSON file
};
