import { Config, PaymentFrequency, PropertyDetails } from "./types";

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

export const getEffectiveAnnualRate = (
  interestRate: number,
  compoundingPeriodsPerYear = 2
) => {
  return (
    Math.pow(
      1 + interestRate / compoundingPeriodsPerYear,
      compoundingPeriodsPerYear
    ) - 1
  );
};

export const getPaymentsPerYear = (paymentFrequency: PaymentFrequency) => {
  switch (paymentFrequency) {
    case "semi-monthly":
      return 24;
    case "bi-weekly":
    case "bi-weekly-accelerated":
      return 26;
    case "weekly":
    case "weekly-accelerated":
      return 52;
    case "monthly":
    default:
      return 12;
  }
};

export const getPaymentFrequencyRate = (
  paymentFrequency: PaymentFrequency,
  interestRate: number
) => {
  const effectiveAnnualRate = getEffectiveAnnualRate(interestRate);
  const paymentsPerYear = getPaymentsPerYear(paymentFrequency);

  return Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;
};

export const getMortgagePayment = (
  paymentFrequency: PaymentFrequency,
  mortgageAmount: number,
  interestRate: number,
  amortizationPeriod: number
): number => {
  const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
  const isAccelerated = paymentFrequency.includes("accelerated");

  if (isAccelerated) {
    const monthlyPayment = getMortgagePayment(
      "monthly",
      mortgageAmount,
      interestRate,
      amortizationPeriod
    );

    return (monthlyPayment * 13) / paymentsPerYear;
  }

  const totalPayments = amortizationPeriod * paymentsPerYear;

  if (interestRate === 0) {
    return mortgageAmount / (amortizationPeriod * paymentsPerYear);
  }

  const actualRate = getPaymentFrequencyRate(paymentFrequency, interestRate);

  return (
    (mortgageAmount * actualRate * Math.pow(1 + actualRate, totalPayments)) /
    (Math.pow(1 + actualRate, totalPayments) - 1)
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
  const paymentsPerYear = getPaymentsPerYear(config.paymentFrequency);
  const mortgagePayment = getMortgagePayment(
    config.paymentFrequency,
    mortgageAmount,
    config.mortgageRatePercent / 100,
    config.amortizationPeriod
  );
  const annualMortgagePayment = mortgagePayment * paymentsPerYear;
  const monlthyMortgagePayment = annualMortgagePayment / 12;
  const monthlyPropertyTaxes = details.annualPropertyTaxes / 12;

  return (
    monlthyMortgagePayment +
    monthlyPropertyTaxes +
    details.monthlyMaintenanceFees
  );
};
