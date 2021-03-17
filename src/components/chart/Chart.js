import React, {useState, useEffect} from 'react'
import { fetchDailyData } from '../../api'
import './Chart.css'
import { Line, Bar } from 'react-chartjs-2'
import generateGlobalPDF from '../Pdf/GlobalPdf'

function Chart({ data: { confirmed, deaths, recovered }, country }) {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length
        ?(  <div className='container-chart'>
            <Line 
                width='150%'
                height='100%'
                data = {{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0, 0.5)',
                        fill: true
                    }]
                }}
            />
            <div className='btn-container1'>
                <button onClick={() => generateGlobalPDF(dailyData)} className='btn' >Download</button>
            </div>
        </div>
        )
        : null
    )

    const barChart = (
        confirmed
        ?(
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Active', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(250, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, confirmed.value-recovered.value-deaths.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current status in ${country}`}
                }}
            />
        )
        : null
    )

    return (
        <div className='container-chart'>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
