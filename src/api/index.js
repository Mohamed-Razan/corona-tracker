import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

const localUrl = 'https://api.covid19api.com/country/sri-lanka';

export const fetchData = async (country) => {
    let changableUrl = url;

    if(country){
        changableUrl = `${url}/countries/${country}`
    }

    try{
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changableUrl);

        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData;
    }

    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData;
    }

    catch(error){
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data: { countries }} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }

    catch(error){
        console.log(error);
    }
} 

export const fetchLocalData = async () => {
    try{
        const {data} = await axios.get(localUrl);

        const modifiedData = data.map((data) => ({
            Confirmed: data.Confirmed,
            Recovered: data.Recovered,
            Active: data.Active,
            Deaths: data.Deaths,
            Date: data.Date,
        }))

        return modifiedData;
    }

    catch(error){
        console.log(error);
    }
}

export const fetchLocal = async () => {
    try{
        const {data} = await axios.get('https://hpb.health.gov.lk/api/get-current-statistical');
        return data.data;
    }

    catch(error){
        console.log(error);
    }
}