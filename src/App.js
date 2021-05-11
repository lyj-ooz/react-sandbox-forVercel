import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./Coin.js";
import SkeletonCoin from "./skeletons/SkeletonCoin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataNum, setDataNum] = useState(10);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=${dataNum}&page=1&sparkline=false`
      )
      .then((res) => {
        setLoading(false);
        setCoins(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [dataNum]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDataNum = (e) => {
    setDataNum(e.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Cryptocurrency</h1>
        <form>
          <input
            type="text"
            placeholder="search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="coin-data-num">
        <select value={dataNum} onChange={handleDataNum}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>Coins</span>
      </div>

      {/* {loading === true && <div className="coin-loading">Loading......</div>} */}
      {loading === true &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
          return <SkeletonCoin key={n} />;
        })}

      {console.log("what?", filteredCoins)}

      {loading === false &&
        filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
    </div>
  );
}

export default App;
