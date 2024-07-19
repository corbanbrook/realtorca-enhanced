import { Config, PropertyDetails } from "../../types";
import { formatCurrency, getMonthlyMortgagePayment } from "../../utils";
import { CostRow } from "./CostRow";

interface MonthlyCostsProps {
  config: Config;
  details: PropertyDetails;
}

export const MonthlyCosts = (props: MonthlyCostsProps) => {
  const { config, details } = props;

  const downpaymentAmount =
    (config.downpaymentPercent / 100) * details.listingPrice;
  const mortgageAmount = details.listingPrice - downpaymentAmount;
  const monthlyPropertyTaxes = details.annualPropertyTaxes / 12;
  const monthlyMortgagePayment = getMonthlyMortgagePayment(
    mortgageAmount,
    config.amortizationPeriod * 12,
    config.mortgageRatePercent / 100
  );

  const total =
    monthlyMortgagePayment +
    monthlyPropertyTaxes +
    details.monthlyMaintenanceFees;

  return (
    <section style={{ marginTop: 12 }}>
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 12 }}>
        Monthly costs
      </div>

      <div style={{ width: "33%" }}>
        <CostRow
          label="Mortgage"
          value={formatCurrency(monthlyMortgagePayment)}
        />
        <CostRow
          label="Property taxes"
          value={formatCurrency(monthlyPropertyTaxes)}
        />
        <CostRow
          label="Maintenance fees"
          value={formatCurrency(details.monthlyMaintenanceFees)}
        />
        <CostRow label="Total" value={formatCurrency(total)} total />
      </div>
    </section>
  );
};
