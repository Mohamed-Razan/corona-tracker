import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import './Comparison.css'

function Comparison( { data1, country1, country2, data2  } ) {

      const barChart = (
        (data1.confirmed && data2.confirmed)
        ?(
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Active', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(250, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [data1.confirmed.value, data1.recovered.value, 
                            (data1.confirmed.value-data1.recovered.value-data1.deaths.value), data1.deaths.value]
                    },
                    
                    {
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(250, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [data2.confirmed.value, data2.recovered.value, 
                            (data2.confirmed.value-data2.recovered.value-data2.deaths.value), data2.deaths.value]
                    }
                ]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `${country1} vs ${country2}`}
                }}
            />
        )
        : null
    )

    

    console.log(data1.confirmed);
    console.log(data2.confirmed);

    return (
        <div className='container-comparison'>
            {(data1.confirmed && data2.confirmed) ? barChart : null}
        </div>
    )
}

export default Comparison
