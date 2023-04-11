import { useLocation } from "react-router";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from "react";

export const Details = (props) => {
  const location = useLocation();
  const { data } = location.state;
  const [send, setSend] = useState("");
  const [rate, setRate] = useState(null);
  const [receiver, setData] = useState({ account_no: "", bankname: "", ifsc: "", address: "" })
  const [payable, setPayable] = useState({ amt: "NaN", charge: 2, total: "" });
  const [lowercharge, setLowerCharge] = useState(null);
  const sendercr = data.scr.toUpperCase();
  const crsymbol = { INR: '₹', USD: "$", EUR: "€", JPY: "¥", AED: "د.إ " }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/INR`;

    fetch(url)
      .then(response => response.json())
      .then(data => setLowerCharge(data.rates[sendercr]))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${data.rcr}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setRate(data.rates[sendercr]))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    const value = parseFloat(event.target.value);
    setSend(isNaN(value) ? "" : value);
  }

  const handleSetChange = (event) => {
    const { name, value } = event.target;
    setData({ ...receiver, [name]: value });
  }

  useEffect(() => {
    setPayable({ ...payable, amt: send });
  }, [send]);

  useEffect(() => {
    const sendAmount = parseFloat(send);
    const value1 = (sendAmount * payable.charge / 100) + sendAmount;
    const value2 = sendAmount + (lowercharge * 200);
    if (value1 > value2) { setPayable({ ...payable, total: value2 }) }
    else { setPayable({ ...payable, total: value1 }) }
  }, [send])


  return (
    <div className="text-white text-xl text-center  justify-contents-center align-items-center bg-gradient-to-l from-black to-purple-700 pt-4">
      <Container >
        <Row>
          <Col>
            <div className="card bg-black border-white">
              <div className="card-body space-y-8 text-left mt-10 mb-11">
                <p className="card-title text-center font-bold text-4xl">Sender's Section</p>
                <div className="space-y-2 mx-10">
                  <label className="py-2 px-4 font-bold text-2xl">Enter The Amount To Be Send In {data.scr}</label>
                  <input
                    value={send}
                    onChange={handleInputChange}
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    aria-describedby="basic-addon1"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                <div className="space-y-2 mx-10">
                  <label className="py-2 px-4 font-bold text-2xl">Receivers Bank Name </label>
                  <input
                    value={receiver.bankname}
                    onChange={handleSetChange}
                    type="text"
                    className="form-control"
                    placeholder="Bank Name"
                    aria-describedby="basic-addon1"
                    name="bankname"
                    onInput={event => event.target.value = event.target.value.toUpperCase()}
                    required
                  />
                </div>
                <div className="space-y-2 mx-10">
                  <label className="py-2 px-4 font-bold text-2xl">IFSC Code Of Bank</label>
                  <input
                    value={receiver.ifsc}
                    onChange={handleSetChange}
                    type="text"
                    className="form-control"
                    placeholder="IFSC Code"
                    aria-describedby="basic-addon1"
                    name="ifsc"
                    onInput={event => event.target.value = event.target.value.toUpperCase()}
                    required
                  />
                </div>
                <div className="space-y-2 mx-10">
                  <label className="py-2 px-4 font-bold text-2xl">Enter Receiver's Account Number </label>
                  <input
                    value={receiver.account_no}
                    onChange={handleSetChange}
                    type="number"
                    className="form-control"
                    placeholder="Account Number"
                    aria-describedby="basic-addon1"
                    name="account_no"
                    required
                  />
                </div>
                <div className="space-y-2 mx-10">
                  <label className="py-2 px-4 font-bold text-2xl">Receiver's Bank Address</label>
                  <input
                    value={receiver.address}
                    onChange={handleSetChange}
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    aria-describedby="basic-addon1"
                    name="address"
                    onInput={event => event.target.value = event.target.value.toUpperCase()}
                    required
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card border-white text-black bg-gradient-to-t from-purple-600 to-purple-300 ">
              <div className="card-body space-y-4 text-left mt-10 mb-11">
                <h1 className="card-title text-center font-bold text-4xl">Details</h1>
                <p className="card-text"></p>
                <table class="w-full mb-6">
                  <tr>
                    <th class="py-2 px-4 font-bold text-3xl underline">Amount To Be Received In {data.rcr}</th>
                    <td class="py-2 px-4 font-bold text-3xl">:</td>
                    <th class="py-2 px-4 font-bold text-3xl ">{crsymbol[data.rcr]}{(parseFloat(send) / rate).toFixed(2)} </th>
                  </tr>
                </table>
                <table class="mb-6">
                  <tr>
                    <td class="py-3 px-4 font-bold text-3xl underline">Bank Details -</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-bold text-2xl ">Bank Name </td>
                    <td class="py-2 px-4 font-bold text-2xl ">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{receiver.bankname ? receiver.bankname : "NaN"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-bold text-2xl">IFSC Code </td>
                    <td class="py-2 px-4 font-bold text-2xl">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{receiver.ifsc ? receiver.ifsc : "NaN"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-bold text-2xl">Account Number  </td>
                    <td class="py-2 px-4 font-bold text-2xl">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{receiver.account_no ? receiver.account_no : "NaN"}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-bold text-2xl">Address </td>
                    <td class="py-2 px-4 font-bold text-2xl">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{receiver.address ? receiver.address : "NaN"}</td>
                  </tr>
                </table>
                <table class="mb-6">
                  <tr>
                    <td class="py-3 px-4 font-bold text-3xl underline">Payment Details -</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-bold text-2xl">Sending Amount</td>
                    <td class="py-2 px-4 font-bold text-2xl">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{crsymbol[data.scr]}{send ? send : "NaN"}</td>
                  </tr>
                  <tr>
                    <td class="pt-2 px-4 font-bold text-2xl ">
                      Service Charge <br />
                      <small className="text-sm pt-0 mt-0 text-center" >Whichever Is Lower</small></td>

                    <td class="py-2 px-4 font-bold text-2xl">:</td>
                    <td class="py-2 px-4 font-bold text-2xl">{payable.charge}% OR {crsymbol[data.scr]}{lowercharge * 200}</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 font-extrabold text-2xl">Total Amount To Be Paid</td>
                    <td class="py-2 px-4 font-extrabold text-2xl">:</td>
                    <td class="py-2 px-4 font-extrabold text-2xl">{crsymbol[data.scr]}{payable.total}</td>
                  </tr>

                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <button type="button" className="btn bg-black text-white border-white py-2 my-4 px-5 text-4xl text-justify hover:bg-gradient-to-t from-black to-purple-700 hover:scale-110 ease-in-out delay-200">Pay </button>
    </div>
  );
};
