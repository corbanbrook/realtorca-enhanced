import { useEffect, useState } from "react";
import { formatCurrency, getElementValue, getTotalMonthlyCost } from "../utils";
import { Config, defaults } from "../config";
import { MonthlyCosts } from "./components/MonthlyCosts";
import { UpfrontCosts } from "./components/UpfrontCosts";
import { PropertyDetails } from "../types";

const details: PropertyDetails = {
  listingPrice: getElementValue(document.querySelector("#listingPriceValue")),
  annualPropertyTaxes: getElementValue(
    document.querySelector(
      "#propertyDetailsSectionContentSubCon_AnnualPropertyTaxes .propertyDetailsSectionContentValue"
    )
  ),
  monthlyMaintenanceFees: getElementValue(
    document.querySelector(
      "#propertyDetailsSectionVal_MonthlyMaintenanceFees .propertyDetailsSectionContentValue"
    )
  ),
};

export const App = () => {
  const [config, setConfig] = useState<Config>(defaults);

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
      el.setAttribute("style", "font-weight: bold; color: green;");
      target?.after(el);
    }

    el.textContent = `${monthlyCost}/month`;
  }, [config]);

  return (
    <div className="propertyDetailsSectionCon">
      <h1>Cost Analysis</h1>

      <UpfrontCosts config={config} details={details} />
      <MonthlyCosts config={config} details={details} />
    </div>
  );
};
