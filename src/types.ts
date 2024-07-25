export interface Config {
  downpaymentPercent: number;
  mortgageRatePercent: number;
  amortizationPeriod: number;
  firstTimeHomeBuyer: boolean;
  paymentFrequency: PaymentFrequency;
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

export type PaymentFrequency =
  | "monthly"
  | "semi-monthly"
  | "bi-weekly"
  | "bi-weekly-accelerated"
  | "weekly"
  | "weekly-accelerated";
