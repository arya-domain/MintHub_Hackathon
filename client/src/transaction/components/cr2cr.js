import '../transaction.css'
import { ReactDOM } from 'react-dom'
export const Transaction = () => {
    
    return ReactDOM.createPortal(
        <div className='text-white  bg-black '>
            <div className='text-3xl relative h-[720px] w-screen d-flex justify-content-center align-items-center'>
                <form class="form-inline space-y-4 ">
                    <h1 className='  mb-10 text-6xl font-bold mx-40 text-center'>Please Select The Currency</h1>
                    <div className='relative left-1/3 '> 
                        <label class="my-1 mx-2.5  px-0" for="inlineFormCustomSelectPref">Sender's Currency</label>
                        <select class="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-5 py-2 ml-6 text-xl " id="inlineFormCustomSelectPref">
                            <option selected >INR</option>
                            <option value="1">JPY</option>
                            <option value="2">USD</option>
                            <option value="3">AED</option>
                            <option value="4">EUR</option>
                        </select>
                    </div>
                    <div className='relative left-1/3 '>
                        <label class="my-1 mx-2" for="inlineFormCustomSelectPref">Receiver's Currency</label>
                        <select class="custom-select my-1 mr-sm-2 rounded-md bg-gray-700 px-5 py-2 ml-3 text-xl " id="inlineFormCustomSelectPref">
                            <option selected >USD</option>
                            <option value="1">JPY</option>
                            <option value="2">INR</option>
                            <option value="3">AED</option>
                            <option value="4">EUR</option>
                        </select>
                    </div>

                    <button type='button' className="my-10 relative left-1/2 text-lg border-2 border-white px-2 py-2 rounded-lg 
                    hover:bg-gradient-to-b from-purple-600 to-black 
                    hover:scale-120 scale-110 -mx-10 " onClick={() => window.location.href = '/cr2cr/details'}>Submit</button>
                </form>
            </div>
        </div>
    )
}