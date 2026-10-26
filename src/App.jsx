import {useState} from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import InputBox from './components/InputBox';

function App(){
    const[amount,setAmount]=useState(0);
    const[from,setFrom]=useState("usd");
    const[to,setTo]=useState("inr");
    const[convertedAmount,setConvertedAmount]=useState(0);

    const currencyInfo=useCurrencyInfo(from);

    const options=Object.keys(currencyInfo);

    const swap =() =>{
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };
    // Smart Convert Function
    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            setConvertedAmount(0); 
        }
    };
    return (
        <div 
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/38963051/pexels-photo-38963051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-lg">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert(); 
                        }}
                    >
                        {/* FROM INPUT BOX */}
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>

                        {/* SWAP BUTTON */}
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 shadow-md hover:bg-blue-700"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>

                        {/* TO INPUT BOX */}
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable={true} 
                            />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
    



