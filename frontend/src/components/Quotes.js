import { useState } from "react";
import NavBar from "./NavBar";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://infohub-peoject-backend.onrender.com/quote");
      if (res.ok) {
        const data = await res.json();
        setQuote(data.quote);
      }
    } catch (e) {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="quote-page">
        <div className="quote-container">
          <h1 className="title">Motivational Quote Generator</h1>

          {loading && <p>Loading...</p>}

          {!loading && !error && (
            <h2 key={quote} className="quote">
              {quote ? `"${quote}"` : "Click the button to get a quote"}
            </h2>
          )}

          {error && <p className="error">{error}</p>}

          <button onClick={getQuote} className="btn btn-primary generate-btn">
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default Quotes;
