import { Config, LandTransferTax, PropertyDetails } from "../../types";
import { formatCurrency } from "../../utils";
import { CostRow } from "./CostRow";

interface UpfrontCostsProps {
  config: Config;
  details: PropertyDetails;
}

export const UpfrontCosts = (props: UpfrontCostsProps) => {
  const { config, details } = props;

  const downpaymentAmount =
    (config.downpaymentPercent / 100) * details.listingPrice;
  const lawyerFees = 2000;
  const total = downpaymentAmount + details.landTransferTax.total + lawyerFees;

  return (
    <section>
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: 12 }}>
        Upfront costs
      </div>

      <div style={{ width: "33%" }}>
        <CostRow
          label={
            <>
              Downpayment <span>({config.downpaymentPercent}%)</span>
            </>
          }
          value={formatCurrency(downpaymentAmount)}
        />
        <LandTransferTaxRow landTransferTax={details.landTransferTax} />
        <CostRow label="Lawyer fees" value={formatCurrency(lawyerFees)} />
        <CostRow label="Total" value={formatCurrency(total)} total />
      </div>
    </section>
  );
};

const LandTransferTaxRow = (props: { landTransferTax: LandTransferTax }) => {
  const { landTransferTax } = props;

  return (
    <>
      <CostRow
        label="Land Transfer Tax"
        value={formatCurrency(landTransferTax.total)}
      />
      <div style={{ marginLeft: 12, color: "#555" }}>
        <CostRow
          label="Provincial"
          value={<>+ {formatCurrency(landTransferTax.provincial)}</>}
        />
        <CostRow
          label="Municipal"
          value={<>+ {formatCurrency(landTransferTax.municipal)}</>}
        />
        <CostRow
          label="Rebate"
          value={<>- {formatCurrency(landTransferTax.rebate)}</>}
        />
      </div>
    </>
  );
};
