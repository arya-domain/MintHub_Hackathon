import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { cryptoSymbol } from 'crypto-symbol';
import './market.css'
import { Link, Outlet } from 'react-router-dom';
import coins from './assets/coins.json';
import cryptoIcons from './assets/crypto_icons.json';

const socket = io('wss://stream.binance.com:9443/ws');

export const Body = () => {
  const [marketData, setMarketData] = useState([]);
  const { nameLookup } = cryptoSymbol({})
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';

    fetch(url)
      .then(response => response.json())
      .then(data => setRate(data.rates.INR))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('https://api.binance.com/api/v3/ticker/24hr')
      .then(response => setMarketData(response.data.filter(item => item.symbol.endsWith('USDT')).map(item => ({
        ...item,
        symbol: item.symbol.replace('USDT', '').toLowerCase(),
        lastPrice: Number(item.lastPrice).toFixed(4),
        priceChangePercent: Number(item.priceChangePercent).toFixed(2),
        volume: Number(item.volume).toFixed(2)
      })).sort((a, b) => b.lastPrice - a.lastPrice))) // Sort by lastPrice in descending order
      .catch(error => console.log(error));


    socket.on('message', message => {
      const data = JSON.parse(message);
      setMarketData(prevMarketData => {
        const index = prevMarketData.findIndex(item => item.symbol === data.s);
        if (index !== -1) {
          const newMarketData = [...prevMarketData];
          newMarketData[index] = {
            ...newMarketData[index],
            lastPrice: Number(data.c).toFixed(4),
            priceChangePercent: Number(data.P).toFixed(2),
            volume: Number(data.v).toFixed(2)
          };
          return newMarketData;
        }
        return prevMarketData;
      });
    });

    // Reload market data every 10 seconds
    const intervalId = setInterval(() => {
      axios.get('https://api.binance.com/api/v3/ticker/24hr')
        .then(response => setMarketData(response.data.filter(item => item.symbol.endsWith('USDT') && item.volume > 1).map(item => ({
          ...item,
          symbol: item.symbol.replace('USDT', '').toLowerCase(),
          lastPrice: Number(item.lastPrice).toFixed(4),
          priceChangePercent: Number(item.priceChangePercent).toFixed(2),
          volume: Number(item.volume).toFixed(2),
        })).sort((a, b) => b.lastPrice - a.lastPrice))) // Sort by lastPrice in descending order
        .catch(error => console.log(error));
    }, 10000);

    return () => {
      clearInterval(intervalId);
      socket.off('message');
    };
  }, []);


  return (
    <div className="text-2xl text-white bg-gray-950 ">
      <table className='mx-auto space-x-10 space-y-10 table-auto' >
        <thead>
          <tr className='font-extrabold border-t-2 border-b-2 border-gray-50'>
            <th class="py-2 text-center pl-2"></th>
            <th class="px-4 py-2 text-center">Symbol</th>
            <th class="px-4 py-2 text-center" >Name</th>
            <th class="px-4 py-2 text-center" >Last Price</th>
            <th class="px-4 py-2 text-center" >Price Change</th>
            <th class="px-4 py-2 text-center">Volume</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map(data => {
            const marketjson = JSON.stringify(marketData);
            localStorage.setItem("marketjson", marketjson);
            const coin = coins.find(i => i.symbol === data.symbol);
            const coinId = coin ? coin.id : null;
            const symbol = data.symbol.toUpperCase();
            const imageUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
            return (
              <tr className='border-b-2 border-gray-50'>
                <td className='py-4 pl-4 text-center'>
                  {cryptoIcons[symbol] ? (
                    <img src={cryptoIcons[symbol]} alt={symbol} width={30} height={30} />
                  ) : (
                    <img src={imageUrl} width={30} height={30} alt={symbol} />
                  )}
                </td>
                <td className='px-0 py-4 text-center'>
                  <Link to={`/market/${coinId}`} className="transition duration-300 ease-in-out hover:font-bold hover:text-purple-800 hover:text-4xl">{data.symbol.toUpperCase()}</Link>
                </td>
                <td className='px-4 py-4 text-center'>{nameLookup(data.symbol)}</td>
                <td className='px-4 py-4 text-center'>₹ {(data.lastPrice * rate).toFixed(4)}</td>
                <td className={`px-4 py-4 text-center ${data.priceChangePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.priceChangePercent}%</td>
                <td className='px-4 py-4 text-center'>{data.volume}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}