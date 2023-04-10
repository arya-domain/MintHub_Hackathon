import '../transaction.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Transaction = () => {
  const [data, setData] = useState({ scr: 'INR', rcr: 'USD' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  function goToDetails() {
    navigate('/cr2cr/details', { state: { data } });
  }

  return (
    <div className="text-white bg-black ">
      <div className="text-3xl relative h-[800px]  d-flex justify-content-center align-items-center">
        
        <form className="form-inline space-y-4 ">
            <h1 className="mb-10 text-6xl font-bold  text-center">Please Select The Currencies</h1>
            <div className="relative left-1/4 ">
                <label className="my-1  px-0" htmlFor="sender-currency">
                Sender's Currency
                </label>
                <select
                value={data.scr}
                className="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-5 py-2 ml-6 text-xl"
                id="sender-currency"
                name="scr"
                onChange={handleChange}
                >
                <option value="INR" >INR</option>
                <option value="JPY">JPY</option>
                <option value="USD">USD</option>
                <option value="AED">AED</option>
                <option value="EUR">EUR</option>
                </select>
            </div>
            <div className="relative left-1/4 ">
                <label className="my-2 -ml-1 " htmlFor="receiver-currency">
                Receiver's Currency
                </label>
                <select
                value={data.rcr}
                className="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-5 py-2 ml-3 text-xl"
                id="receiver-currency"
                name="rcr"
                onChange={handleChange}
                >
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
                <option value="USD" selected>USD</option>
                <option value="AED">AED</option>
                <option value="EUR">EUR</option>
                </select>
            </div>
            <button
                type="button"
                className="my-10 relative left-[45%] text-lg border-2 border-white px-4 py-2 rounded-lg hover:bg-gradient-to-b from-purple-600 to-black scale-125 font-bold hover:scale-150 "
                onClick={goToDetails}
            >
                Submit
            </button>
        </form>
      </div>
    </div>
  );
};
