import React, { useState, useEffect } from "react";
import axios from "axios";

const ExchangeRatesApp = () => {
  const [amount, setAmount] = useState("");
  const [baseCoin, setBaseCoin] = useState("RON");
  const [targetCoin, setTargetCoin] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    fetchExchangeRate();
  }, [baseCoin, targetCoin]);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate.host/latest?base=${baseCoin}`
      );
      const rates = response.data.rates;
      setExchangeRate(rates[targetCoin]);
    } catch (error) {
      console.log("Error fetching exchange rate:", error);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBaseCoinChange = (event) => {
    setBaseCoin(event.target.value);
  };

  const handleTargetCoinChange = (event) => {
    setTargetCoin(event.target.value);
  };

  const handleExchangeClick = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate.host/convert?from=${baseCoin}&to=${targetCoin}&amount=${amount}`
      );
      setConvertedAmount(response.data.result);
    } catch (error) {
      console.log("Error converting amount:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Exchange Rates</h1>
      <div className="form-container">
        <label className="label" htmlFor="amount">
          Amount:
        </label>
        <input
          className="input"
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <label className="label" htmlFor="baseCoin">
          Base Coin:
        </label>
        <select
          className="select"
          id="baseCoin"
          value={baseCoin}
          onChange={handleBaseCoinChange}
        >
          <option value="RON">RON</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add other currency options here */}
        </select>
        <label className="label" htmlFor="targetCoin">
          Target Coin:
        </label>
        <select
          className="select"
          id="targetCoin"
          value={targetCoin}
          onChange={handleTargetCoinChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RON">RON</option>
          {/* Add other currency options here */}
        </select>
      </div>
      <button className="button" onClick={handleExchangeClick}>
        Exchange
      </button>
      <div className="result-container">
        <label className="result-label" htmlFor="result">
          Result:
        </label>
        <input
          className="result-input"
          type="text"
          id="result"
          value={convertedAmount}
          disabled
        />
      </div>
    </div>
  );
};

export default ExchangeRatesApp;
