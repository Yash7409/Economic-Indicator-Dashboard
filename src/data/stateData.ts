export interface StateData {
  id: string;
  name: string;
  unemployment: number;
  literacy: number;
  healthIndex: number;
  gdpPerCapita: number;
  population: number;
  region: string;
}

export const stateData: StateData[] = [
  {
    id: "AP",
    name: "Andhra Pradesh",
    unemployment: 4.2,
    literacy: 67.4,
    healthIndex: 45.2,
    gdpPerCapita: 175000,
    population: 52221000,
    region: "South"
  },
  {
    id: "AR",
    name: "Arunachal Pradesh",
    unemployment: 3.1,
    literacy: 65.4,
    healthIndex: 42.8,
    gdpPerCapita: 168000,
    population: 1504000,
    region: "Northeast"
  },
  {
    id: "AS",
    name: "Assam",
    unemployment: 7.9,
    literacy: 72.2,
    healthIndex: 39.1,
    gdpPerCapita: 65000,
    population: 34293000,
    region: "Northeast"
  },
  {
    id: "BR",
    name: "Bihar",
    unemployment: 5.1,
    literacy: 61.8,
    healthIndex: 25.6,
    gdpPerCapita: 45000,
    population: 119520000,
    region: "East"
  },
  {
    id: "CT",
    name: "Chhattisgarh",
    unemployment: 3.3,
    literacy: 70.3,
    healthIndex: 41.8,
    gdpPerCapita: 105000,
    population: 28724000,
    region: "Central"
  },
  {
    id: "DL",
    name: "Delhi",
    unemployment: 4.7,
    literacy: 86.2,
    healthIndex: 57.3,
    gdpPerCapita: 385000,
    population: 32226000,
    region: "North"
  },
  {
    id: "GA",
    name: "Goa",
    unemployment: 3.9,
    literacy: 88.7,
    healthIndex: 62.4,
    gdpPerCapita: 458000,
    population: 1540000,
    region: "West"
  },
  {
    id: "GJ",
    name: "Gujarat",
    unemployment: 2.6,
    literacy: 78.0,
    healthIndex: 50.1,
    gdpPerCapita: 245000,
    population: 67936000,
    region: "West"
  },
  {
    id: "HR",
    name: "Haryana",
    unemployment: 6.2,
    literacy: 75.6,
    healthIndex: 53.8,
    gdpPerCapita: 292000,
    population: 28672000,
    region: "North"
  },
  {
    id: "HP",
    name: "Himachal Pradesh",
    unemployment: 2.4,
    literacy: 82.8,
    healthIndex: 56.1,
    gdpPerCapita: 198000,
    population: 7300000,
    region: "North"
  },
  {
    id: "JK",
    name: "Jammu and Kashmir",
    unemployment: 8.4,
    literacy: 67.2,
    healthIndex: 48.3,
    gdpPerCapita: 78000,
    population: 13606000,
    region: "North"
  },
  {
    id: "JH",
    name: "Jharkhand",
    unemployment: 4.6,
    literacy: 66.4,
    healthIndex: 35.4,
    gdpPerCapita: 78000,
    population: 38593000,
    region: "East"
  },
  {
    id: "KA",
    name: "Karnataka",
    unemployment: 4.8,
    literacy: 75.4,
    healthIndex: 49.2,
    gdpPerCapita: 245000,
    population: 67562000,
    region: "South"
  },
  {
    id: "KL",
    name: "Kerala",
    unemployment: 7.4,
    literacy: 94.0,
    healthIndex: 74.2,
    gdpPerCapita: 205000,
    population: 35699000,
    region: "South"
  },
  {
    id: "MP",
    name: "Madhya Pradesh",
    unemployment: 2.3,
    literacy: 69.3,
    healthIndex: 42.6,
    gdpPerCapita: 85000,
    population: 85358000,
    region: "Central"
  },
  {
    id: "MH",
    name: "Maharashtra",
    unemployment: 2.2,
    literacy: 82.3,
    healthIndex: 56.1,
    gdpPerCapita: 215000,
    population: 123144000,
    region: "West"
  },
  {
    id: "MN",
    name: "Manipur",
    unemployment: 11.4,
    literacy: 79.2,
    healthIndex: 51.8,
    gdpPerCapita: 78000,
    population: 3091000,
    region: "Northeast"
  },
  {
    id: "ML",
    name: "Meghalaya",
    unemployment: 1.2,
    literacy: 74.4,
    healthIndex: 47.1,
    gdpPerCapita: 65000,
    population: 3224000,
    region: "Northeast"
  },
  {
    id: "MZ",
    name: "Mizoram",
    unemployment: 3.8,
    literacy: 91.3,
    healthIndex: 55.6,
    gdpPerCapita: 198000,
    population: 1205000,
    region: "Northeast"
  },
  {
    id: "NL",
    name: "Nagaland",
    unemployment: 21.4,
    literacy: 79.6,
    healthIndex: 46.2,
    gdpPerCapita: 125000,
    population: 2150000,
    region: "Northeast"
  },
  {
    id: "OR",
    name: "Odisha",
    unemployment: 7.1,
    literacy: 72.9,
    healthIndex: 40.2,
    gdpPerCapita: 78000,
    population: 45429000,
    region: "East"
  },
  {
    id: "PB",
    name: "Punjab",
    unemployment: 6.2,
    literacy: 75.8,
    healthIndex: 53.9,
    gdpPerCapita: 168000,
    population: 30142000,
    region: "North"
  },
  {
    id: "RJ",
    name: "Rajasthan",
    unemployment: 4.9,
    literacy: 66.1,
    healthIndex: 42.2,
    gdpPerCapita: 125000,
    population: 81032000,
    region: "North"
  },
  {
    id: "SK",
    name: "Sikkim",
    unemployment: 2.1,
    literacy: 81.4,
    healthIndex: 65.4,
    gdpPerCapita: 485000,
    population: 690000,
    region: "Northeast"
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    unemployment: 3.4,
    literacy: 80.1,
    healthIndex: 54.7,
    gdpPerCapita: 245000,
    population: 77841000,
    region: "South"
  },
  {
    id: "TG",
    name: "Telangana",
    unemployment: 4.1,
    literacy: 66.5,
    healthIndex: 48.8,
    gdpPerCapita: 332000,
    population: 39362000,
    region: "South"
  },
  {
    id: "TR",
    name: "Tripura",
    unemployment: 10.0,
    literacy: 87.2,
    healthIndex: 46.9,
    gdpPerCapita: 78000,
    population: 4169000,
    region: "Northeast"
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    unemployment: 4.2,
    literacy: 67.7,
    healthIndex: 35.1,
    gdpPerCapita: 68000,
    population: 237882000,
    region: "North"
  },
  {
    id: "UT",
    name: "Uttarakhand",
    unemployment: 4.2,
    literacy: 78.8,
    healthIndex: 50.7,
    gdpPerCapita: 198000,
    population: 11141000,
    region: "North"
  },
  {
    id: "WB",
    name: "West Bengal",
    unemployment: 4.6,
    literacy: 76.3,
    healthIndex: 41.8,
    gdpPerCapita: 115000,
    population: 99609000,
    region: "East"
  }
];

export const indicatorConfig = {
  unemployment: {
    label: "Unemployment Rate (%)",
    color: "#ef4444",
    format: (value: number) => `${value.toFixed(1)}%`,
    description: "Percentage of unemployed population"
  },
  literacy: {
    label: "Literacy Rate (%)",
    color: "#3b82f6",
    format: (value: number) => `${value.toFixed(1)}%`,
    description: "Percentage of literate population"
  },
  healthIndex: {
    label: "Health Index",
    color: "#10b981",
    format: (value: number) => `${value.toFixed(1)}`,
    description: "Composite health performance index"
  },
  gdpPerCapita: {
    label: "GDP Per Capita (₹)",
    color: "#8b5cf6",
    format: (value: number) => `₹${(value / 1000).toFixed(0)}K`,
    description: "Gross Domestic Product per person"
  }
};