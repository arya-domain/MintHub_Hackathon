import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router'
import { CryptoContext } from '../components/CryptoContext';

const CryptoDetails = () => {
    let {coinId} =useParams();
    //console.log({coinId})
    // let {getCoinData, coinData} = useContext(CryptoContext);

  // useLayoutEffect(() => {
  //   getCoinData(coinId)
  // }, [coinId])
    return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full bg-gray-300 bg-opacity-30 first-letter : backdrop-blur-sm flex items-center justify-center font-nunito'>
      <div className='w-[65%] h-[75%] bg-gray-400 bg-opacity-75 rounded-lg text-black relative'>
      {coinId}
      </div>
    </div>,
   
    document.getElementById("model")
  )
}

export default CryptoDetails
