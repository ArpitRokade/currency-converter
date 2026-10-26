import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}); // Rates ko store karne ke liye state

    useEffect(() => {
        // 1. API ko call lagayi
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
            .then((res) => res.json()) // Response ko JSON format mein convert kiya
            .then((res) => setData(res.rates)); // Data milte hi state mein save kar liya
    }, [currency]); // 2. Dependency array

    console.log(data); // Check karne ke liye ki data kya aa raha hai
    return data; // Component ko data wapas dena
}

export default useCurrencyInfo;