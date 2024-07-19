import { ReactNode } from "react";

export const CostRow = ({
  label,
  value,
  total,
}: {
  label: ReactNode;
  value: ReactNode;
  total?: boolean;
}) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 6,
        borderTop: total ? "1px solid black" : "none",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ fontWeight: "bolder", marginRight: 12, width: 160 }}>
        {label}
      </div>
      <div
        style={{
          fontWeight: total ? "bolder" : "normal",
        }}
      >
        {value}
      </div>
    </div>
  );
};
