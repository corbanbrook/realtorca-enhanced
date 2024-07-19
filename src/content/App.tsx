import { useEffect, useState } from "react";
import { formatCurrency, getElementValue, getTotalMonthlyCost } from "../utils";
import { defaults } from "../config";
import { Config, PropertyDetails } from "../types";
import { CostAnalysis } from "./components/CostAnalysis";
import { calculateLandTransferTax } from "./utils/ltt";

// Query values from the page
const listingAddress =
  document.querySelector("#listingAddress")?.lastChild?.textContent;
const city = listingAddress?.split(",")[0].trim() || "";
const province = listingAddress?.split(",")[1].trim().split(" ")[0] || "";
const listingPrice = getElementValue(
  document.querySelector("#listingPriceValue")
);
const annualPropertyTaxes = getElementValue(
  document.querySelector(
    "#propertyDetailsSectionContentSubCon_AnnualPropertyTaxes .propertyDetailsSectionContentValue"
  )
);
const monthlyMaintenanceFees = getElementValue(
  document.querySelector(
    "#propertyDetailsSectionVal_MonthlyMaintenanceFees .propertyDetailsSectionContentValue"
  )
);

export const App = () => {
  const [config, setConfig] = useState<Config>(defaults);

  const details: PropertyDetails = {
    listingPrice,
    annualPropertyTaxes,
    monthlyMaintenanceFees,
    landTransferTax: calculateLandTransferTax(
      province,
      city,
      listingPrice,
      config.firstTimeHomeBuyer
    ), // XXX This should be calculated based on the location
  };

  useEffect(() => {
    // Update the config state with the values from storage
    chrome.storage.local.get(Object.keys(defaults), (data) => {
      setConfig(data as Config);
    });

    // Listen for changes in storage and update the config state
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      const key = Object.keys(changes)[0];
      const update = { [key]: changes[key].newValue };

      setConfig((prev) => {
        return { ...prev, ...update };
      });
    };

    chrome.storage.local.onChanged.addListener(listener);

    return () => {
      chrome.storage.local.onChanged.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    // Calculate monthly cost and update element next to listing price
    const monthlyCost = formatCurrency(getTotalMonthlyCost(config, details));
    const target = document.querySelector("#listingPriceValue");

    let el = document.querySelector("#monthlyCostEstimate");

    if (!el) {
      el = document.createElement("div");
      el.id = "monthlyCostEstimate";
      el.setAttribute(
        "style",
        "font-weight: bold; color: green; font-size: 22px;"
      );
      target?.after(el);
    }

    el.textContent = `${monthlyCost}/month`;
  }, [config]);

  return <CostAnalysis config={config} details={details} />;
};
