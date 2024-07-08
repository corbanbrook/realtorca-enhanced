import { Config } from "../../config";
import { PropertyDetails } from "../../types";
import { formatCurrency } from "../../utils";

interface UpfrontCostsProps {
  config: Config;
  details: PropertyDetails;
}

export const UpfrontCosts = (props: UpfrontCostsProps) => {
  const { config, details } = props;

  const downpaymentAmount =
    (config.downpaymentPercent / 100) * details.listingPrice;

  return (
    <section>
      <h3>Upfront costs</h3>
      <div>
        Downpayment: {formatCurrency(downpaymentAmount)}{" "}
        <span>({config.downpaymentPercent}%)</span>
      </div>
    </section>
  );
};
