import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import BlurText from './components/BlurText';
import DarkVeil from './components/DarkVeil';

function App() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const rates = useCurrencyInfo(from);
  const options = Object.keys(rates || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!rates[to]) {
      alert(`No conversion rate available for ${from} → ${to}`);
      return;
    }
    setConvertedAmount((amount * rates[to]).toFixed(2));
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black">
      
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <DarkVeil />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        
        <BlurText
          text="WELCOME TO MY WEBSITE"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl text-white"
        />

        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(val) => setAmount(Number(val))}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
