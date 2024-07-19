import { Config, PropertyDetails } from "../../types";
import { MonthlyCosts } from "./MonthlyCosts";
import { UpfrontCosts } from "./UpfrontCosts";

interface CostAnalysisProps {
  config: Config;
  details: PropertyDetails;
}

export const CostAnalysis = (props: CostAnalysisProps) => {
  const { config, details } = props;

  return (
    <div className="propertyDetailsSectionCon">
      <h2 className="propertyDetailsSectionHeader">Cost Analysis</h2>

      <UpfrontCosts config={config} details={details} />
      <MonthlyCosts config={config} details={details} />
    </div>
  );
};
