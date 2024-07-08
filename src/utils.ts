// totalPayments should be the total number of payments expected to be made for the life of the loan: years * 12

import { Config } from "./config";
import { PropertyDetails } from "./types";

export const formatCurrency = (value: number) => {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
};

export const getElementValue = (el: Element | null) => {
  const textContent = el?.textContent?.replace(/[^0-9.-]+/g, "") || "0.00";

  return parseFloat(textContent);
};

// interestRate: eg. 6.2% should be passed as 0.062
export const getMonthlyMortgagePayment = (
  startingLoanAmount: number,
  totalPayments: number,
  interestRate: number
) => {
  if (interestRate === 0) {
    return startingLoanAmount / totalPayments;
  }

  const interestRatePerMonth = interestRate / 12;

  return (
    (startingLoanAmount *
      interestRatePerMonth *
      Math.pow(1 + interestRatePerMonth, totalPayments)) /
    (Math.pow(1 + interestRatePerMonth, totalPayments) - 1)
  );
};

export const getTotalUpfrontCost = (
  config: Config,
  details: PropertyDetails
) => {
  return (config.downpaymentPercent / 100) * details.listingPrice;
};

export const getTotalMonthlyCost = (
  config: Config,
  details: PropertyDetails
) => {
  const downpaymentAmount =
    (config.downpaymentPercent / 100) * details.listingPrice;
  const mortgageAmount = details.listingPrice - downpaymentAmount;
  const monlthyMortgagePayment = getMonthlyMortgagePayment(
    mortgageAmount,
    config.amortizationPeriod * 12,
    config.mortgageRatePercent / 100
  );
  const monthlyPropertyTaxes = details.annualPropertyTaxes / 12;

  return (
    monlthyMortgagePayment +
    monthlyPropertyTaxes +
    details.monthlyMaintenanceFees
  );
};
