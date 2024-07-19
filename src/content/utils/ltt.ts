import { LandTransferTax } from "../../types";

export const calculateLandTransferTax = (
  province: string,
  city: string,
  listingPrice: number,
  firstTimeHomeBuyer: boolean
): LandTransferTax => {
  let provincial = 0;
  let municipal = 0;
  let provincialRebate = 0;
  let municipalRebate = 0;

  const calculateRebate = () => {
    return provincialRebate + municipalRebate;
  };

  const calculateTotal = () => {
    return provincial - provincialRebate + municipal - municipalRebate;
  };

  switch (province) {
    case "Ontario": {
      const provincialBrackets = [
        { value: 55_000, rate: 0.5 },
        { value: 250_000, rate: 1 },
        { value: 400_000, rate: 1.5 },
        { value: 2_000_000, rate: 2 },
        { value: Infinity, rate: 2.5 },
      ];

      provincial = calculateBrackets(provincialBrackets, listingPrice);
      provincialRebate = firstTimeHomeBuyer ? Math.min(4000, provincial) : 0;

      if (city === "Toronto") {
        const municipalBrackets = [
          { value: 55_000, rate: 0.5 },
          { value: 250_000, rate: 1 },
          { value: 400_000, rate: 1.5 },
          { value: 2_000_000, rate: 2 },
          { value: 3_000_000, rate: 2.5 },
          { value: 4_000_000, rate: 3.5 },
          { value: 5_000_000, rate: 4.5 },
          { value: 10_000_000, rate: 5.5 },
          { value: 20_000_000, rate: 6.5 },
          { value: Infinity, rate: 7.5 },
        ];

        municipal = calculateBrackets(municipalBrackets, listingPrice);
        municipalRebate = firstTimeHomeBuyer ? Math.min(4475, municipal) : 0;
      }

      break;
    }

    case "Quebec": {
      const brackets = [
        { value: 58_900, rate: 0.5 },
        { value: 294_600, rate: 1 },
        { value: Infinity, rate: 1.5 },
      ];

      provincial = calculateBrackets(brackets, listingPrice);

      break;
    }

    case "British Columbia": {
      const brackets = [
        { value: 200_000, rate: 1 },
        { value: 2_000_000, rate: 2 },
        { value: 3_000_000, rate: 3 },
        { value: Infinity, rate: 3.5 },
      ];

      provincial = calculateBrackets(brackets, listingPrice);

      break;
    }

    case "Manitoba": {
      const brackets = [
        { value: 30_000, rate: 0 },
        { value: 90_000, rate: 0.5 },
        { value: 150_000, rate: 1 },
        { value: 200_000, rate: 1.5 },
        { value: Infinity, rate: 2 },
      ];

      provincial = calculateBrackets(brackets, listingPrice);

      break;
    }

    case "Nova Scotia": {
      const brackets = [
        { value: 0, rate: 1.5 },
        { value: 30_000, rate: 1.5 },
        { value: 60_000, rate: 1.5 },
        { value: 150_000, rate: 1.5 },
        { value: 250_000, rate: 1.5 },
        { value: Infinity, rate: 1.5 },
      ];

      provincial = calculateBrackets(brackets, listingPrice);

      break;
    }

    case "New Brunswick": {
      provincial = listingPrice * 0.01;

      break;
    }

    case "Prince Edward Island": {
      provincial = listingPrice * 0.01;

      break;
    }

    case "Alberta": {
      provincial = 100 + 3.5 * (listingPrice / 5000);

      break;
    }

    // case "Saskatchewan":
    // case "Newfoundland and Labrador":
    // case "Northwest Territories":
    // case "Nunavut":
    // case "Yukon":
  }

  return {
    provincial,
    municipal,
    rebate: calculateRebate(),
    total: calculateTotal(),
  };
};

interface Bracket {
  value: number;
  rate: number;
}

const calculateBrackets = (
  brackets: Bracket[],
  listingPrice: number
): number => {
  let landTransferTax = 0;
  let prevBracketValue = 0;

  for (const bracket of brackets) {
    if (prevBracketValue > listingPrice) {
      break;
    }

    const taxableValue =
      Math.min(listingPrice, bracket.value) - prevBracketValue;

    landTransferTax += taxableValue * (bracket.rate / 100);
    prevBracketValue = bracket.value;
  }

  return landTransferTax;
};
