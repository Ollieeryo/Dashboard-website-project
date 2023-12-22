type DataPlatformProps = {
  ts: Date | string;
  siteId: number;
  name: string;
  mileage: number;
  distance: number;
  fuelConsumption: number;
  totalFuelConsumption: number;
  liquidLevel: number;
  waterConsumed: number;
  speed: number;
  fuelLevel: number;
  flowRate: number;
  flowTotalPositive: number;
  ch1Watt: number;
  ch2Watt: number;
  ch3Watt: number;
  powerConsumed: number;
  energyConsumed: number;
  total: number;
  ch1Current: number;
  ch2Current: number;
  ch3Current: number;
  powerFactor: number;
  temp: number;
};

export default DataPlatformProps;
