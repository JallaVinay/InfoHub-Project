// import NavBar from "./NavBar";
// const CurrecncyConverter = ()=> <div> <NavBar/> <h1>CurrecncyConverter</h1> </div>

// export default CurrecncyConverter;

import { useState } from "react";
import NavBar from "./NavBar";
import "./CurrecncyConverter.css";

const CurrecncyConverter = () => {
  const [amount, setAmount] = useState("");
  const [usd, setUsd] = useState(null);
  const [eur, setEur] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async (e) => {
    e.preventDefault();
    setError("");
    setUsd(null);
    setEur(null);
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) {
      setError("Enter a valid INR amount");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/currency?amount=${n}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsd(data.usd);
      setEur(data.eur);
    } catch {
      setError("Conversion failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />

      <div className="currency-page">
        <div className="currency-card p-5">
          <h1>Currecncy Converter</h1>
          <form onSubmit={convert} className="form">
            <div className="row">
              <label className="ml-2" htmlFor="amt">INR</label>
              <input
                id="amt"
                type="number"
                inputMode="decimal"
                placeholder="Enter INR amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button 
            
              type="submit"
              className="ml-3 btn btn-primary"
              disabled={loading}
            >
              {loading ? "Converting..." : "Convert"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

          {(usd !== null || eur !== null) && !error && (
            <div className="results" key={`${usd}-${eur}`}>
              <div className="result-item">
                <span className="code">USD</span>
                <span className="value">{usd}</span>
              </div>
              <div className="result-item">
                <span className="code">EUR</span>
                <span className="value">{eur}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrecncyConverter;
