export interface Config {
  downpaymentPercent: number;
  mortgageRatePercent: number;
  amortizationPeriod: number;
  firstTimeHomeBuyer: boolean;
}

export interface PropertyDetails {
  listingPrice: number;
  annualPropertyTaxes: number;
  monthlyMaintenanceFees: number;
  landTransferTax: LandTransferTax;
}

export interface LandTransferTax {
  provincial: number;
  municipal: number;
  rebate: number;
  total: number;
}
