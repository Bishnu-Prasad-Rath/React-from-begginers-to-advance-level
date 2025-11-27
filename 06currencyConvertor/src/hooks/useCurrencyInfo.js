import { useEffect, useState } from "react";

const API_KEY = "572c4fcfd6ab013f76a625d9"; // 🔹 Replace this with your free API key

function useCurrencyInfo(baseCurrency) {
  const [rates, setRates] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    async function fetchRates() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency.toUpperCase()}`
        );
        const json = await res.json();
        console.log("API Response:", json);

        if (json.result === "success") {
          setRates(json.conversion_rates || {});
        } else {
          setRates({});
        }
      } catch (err) {
        console.error("Failed to fetch rates:", err);
        setRates({});
      }
    }

    fetchRates();
  }, [baseCurrency]);

  return rates;
}

export default useCurrencyInfo;
