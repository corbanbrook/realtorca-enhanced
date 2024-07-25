import { describe, test, expect } from "vitest";
import {
  getEffectiveAnnualRate,
  getMortgagePayment,
  getPaymentFrequencyRate,
} from "./utils";

describe("utils", () => {
  const mortgage = 400_000; // $400,000
  const interestRate = 0.05; // 5%
  const amortizationPeriod = 25; // 25 years

  test("getEffectiveAnnualRate", () => {
    const effectiveRate = getEffectiveAnnualRate(interestRate);

    console.log("effectiveRate", effectiveRate);

    expect(effectiveRate).toBeCloseTo(0.0506, 4);
  });

  test("getEquivilentMonthlyRate", () => {
    const monthlyRate = getPaymentFrequencyRate("monthly", interestRate);
    expect(monthlyRate).toBeCloseTo(0.00412, 5);
  });

  test("getEquivilentWeeklyRate", () => {
    const weeklyRate = getPaymentFrequencyRate("weekly", interestRate);
    expect(weeklyRate).toBeCloseTo(0.00095, 5);
  });

  test("getMonthlyPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "monthly",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(2_326.42, 2);
  });

  test("getSemiMonthlyPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "semi-monthly",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(1162.01, 2);
  });

  test("getBiWeeklyPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "bi-weekly",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(1072.54, 2);
  });

  test("getBiWeeklyAcceleratedPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "bi-weekly-accelerated",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(1163.21, 2);
  });

  test("getWeeklyPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "weekly",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(536.02, 2);
  });

  test("getWeeklyAcceleratedPayment", () => {
    const mortgagePayment = getMortgagePayment(
      "weekly-accelerated",
      mortgage,
      interestRate,
      amortizationPeriod
    );
    expect(mortgagePayment).toBeCloseTo(581.6, 2);
  });
});
