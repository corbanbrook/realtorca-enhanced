import { Config } from "../../config";
import { PropertyDetails } from "../../types";
import { formatCurrency, getMonthlyMortgagePayment } from "../../utils";

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

  return (
    <section>
      <h3>Monthly costs</h3>
      <div>
        Mortgage:{" "}
        {formatCurrency(
          getMonthlyMortgagePayment(
            mortgageAmount,
            config.amortizationPeriod * 12,
            config.mortgageRatePercent / 100
          )
        )}
      </div>
      <div>Property taxes: {formatCurrency(monthlyPropertyTaxes)}</div>
      <div>
        Maintenance fees: {formatCurrency(details.monthlyMaintenanceFees)}
      </div>
    </section>
  );
};
