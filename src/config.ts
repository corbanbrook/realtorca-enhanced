export interface Config {
  downpaymentPercent: number;
  mortgageRatePercent: number;
  amortizationPeriod: number;
  firstTimeHomeBuyer: boolean;
}

export const defaults: Config = {
  downpaymentPercent: 20,
  mortgageRatePercent: 5,
  amortizationPeriod: 25,
  firstTimeHomeBuyer: false,
};
