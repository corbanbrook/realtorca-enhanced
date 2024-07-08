import { useEffect, useState } from "react";
import { Config, defaults } from "../../config";

enum MessageType {
  UPDATE = "UPDATE",
}

export const Settings = () => {
  const [config, setConfig] = useState<Config>(defaults);

  // Sync settings with storage
  useEffect(() => {
    chrome.storage.local.get(Object.keys(defaults), (data) => {
      setConfig(data as Config);
    });
  }, []);

  // Update storage when settings change
  useEffect(() => {
    chrome.runtime.sendMessage({
      type: MessageType.UPDATE,
      data: config,
    });
  }, [config]);

  return (
    <div>
      <h2>Settings</h2>

      <section>
        <b>Downpayment</b>
        <div>
          <input
            id="downpayment-percent"
            type="text"
            value={config.downpaymentPercent}
            onChange={(ev) => {
              setConfig((prev) => ({
                ...prev,
                downpaymentPercent: parseFloat(ev.target.value) || 0,
              }));
            }}
          />{" "}
          %
        </div>
      </section>

      <section>
        <b>Mortgage Rate</b>
        <div>
          <input
            id="mortgage-rate"
            type="text"
            value={config.mortgageRatePercent}
            onChange={(ev) => {
              setConfig((prev) => ({
                ...prev,
                mortgageRatePercent: parseFloat(ev.target.value) || 0,
              }));
            }}
          />{" "}
          %
        </div>
      </section>

      <section>
        <b>Amortization Period</b>
        <div>
          <input
            id="amortization-period"
            type="text"
            value={config.amortizationPeriod}
            onChange={(ev) => {
              setConfig((prev) => ({
                ...prev,
                amortizationPeriod: parseFloat(ev.target.value) || 0,
              }));
            }}
          />
        </div>
      </section>

      <section>
        <b>First time home buyer?</b>
        <div>
          <input
            type="checkbox"
            name="first-time-home-buyer"
            checked={config.firstTimeHomeBuyer}
            onChange={(ev) => {
              setConfig((prev) => ({
                ...prev,
                firstTimeHomeBuyer: ev.target.checked,
              }));
            }}
          />
        </div>
      </section>
    </div>
  );
};
