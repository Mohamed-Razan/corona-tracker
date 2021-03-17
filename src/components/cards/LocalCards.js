import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import  './Cards.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import { fetchLocalData, fetchLocal } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import generatePDF from '../Pdf/LocalPdf'
import generatePcrPDF from '../Pdf/PcrPdf'
import generateHospitalPDF from '../Pdf/HospitalPdf' 

function LocalCards() {

    const [localData, setLocalData] = useState([]);

    const [localData1, setLocalData1] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setLocalData(await fetchLocalData());
        }
        fetchAPI();
    }, [])

    useEffect(() => {
        const fetchAPI = async () => {
            setLocalData1(await fetchLocal());
        }
        fetchAPI();
    }, [])

    const data = localData1;

    const dataPCR = data.daily_pcr_testing_data;

    const dataHospital = data.hospital_data;


    if(!data.daily_pcr_testing_data){
        return 'Loading...'
    }

    dataHospital[0].hospital.name = 'NIID'
    dataHospital[1].hospital.name = 'NHS'
    dataHospital[2].hospital.name = 'Ragama'
    dataHospital[3].hospital.name = 'Karapitiya'
    dataHospital[4].hospital.name = 'ANP'
    dataHospital[5].hospital.name = 'KNG'
    dataHospital[6].hospital.name = 'NHS'
    dataHospital[7].hospital.name = 'NHK'
    dataHospital[8].hospital.name = 'Batticaloa'
    dataHospital[9].hospital.name = 'Gampaha'
    dataHospital[10].hospital.name = 'Nigombo'
    dataHospital[11].hospital.name = 'Ratnapura'
    dataHospital[12].hospital.name = 'Badulla'
    dataHospital[15].hospital.name = 'PLN'
    dataHospital[16].hospital.name = 'Kalubowila'
    dataHospital[17].hospital.name = 'CSTH'
    dataHospital[18].hospital.name = 'Hambantota'
    dataHospital[19].hospital.name = 'Monaragala'
    dataHospital[20].hospital.name = 'Welikanda'
    dataHospital[22].hospital.name = 'CHW'
    dataHospital[23].hospital.name = 'Mulleriyawa'
    dataHospital[24].hospital.name = 'Homagama'
    dataHospital[25].hospital.name = 'NFH'
    dataHospital[26].hospital.name = 'Chillaw'
    dataHospital[27].hospital.name = 'Matara'
    dataHospital[28].hospital.name = 'KDU'
    dataHospital[29].hospital.name = 'Vavunia'
    dataHospital[30].hospital.name = 'Marawila'
    dataHospital[31].hospital.name = 'SJP'
    dataHospital[32].hospital.name = 'Beruwala'
    dataHospital[33].hospital.name = 'Kathankudi'
    dataHospital[34].hospital.name = 'Minuwangoda'
    dataHospital[35].hospital.name = 'Navy'


    const lineChart = (
        localData
        ?(
            <Line 
                data = {{
                    labels: localData.map(({Date}) => Date.toString().substring(0, 10)),
                    datasets: [{
                        data: localData.map(({Confirmed}) => Confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: localData.map(({Deaths}) => Deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        fill: true
                    }, {
                        data: localData.map(({Active}) => Active),
                        label: 'Active',
                        borderColor: 'rgb(255, 255, 0)',
                        fill: true
                    }, {
                        data: localData.map(({Recovered}) => Recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        fill: true
                    }]
                }}
        />)
        : null
    )

    const barChart = (
        dataPCR.length
        ?(
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Active', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 255, 0, 0.5)',  'rgba(255, 0, 0, 0.5)'],
                        data: [data.local_total_cases, data.local_recovered, data.local_active_cases, data.local_deaths]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current status on ${data.update_date_time}`}
                }}
            />
        )
        : null
    )


    const lineChartPCR = (
        dataPCR.length
        ?(
            <Line 
                data = {{
                    labels: dataPCR.map(({date}) => date),
                    datasets: [{
                        data: dataPCR.map(({count}) => count),
                        label: 'PCR test data',
                        borderColor: '#3333ff',
                        fill: true
                    }]
                }}
        />)
        : null
    )

    const barChartHospital = (
        dataPCR.length
        ?(
            <Bar
                height='200%'
                
                data={{
                    labels: dataHospital.map(({hospital}) => hospital.name),
                    datasets: [{
                        label: 'People',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        data: dataHospital.map(({cumulative_total}) => cumulative_total)
                    }]
                }}
                options={{
                    scales: {
                        xAxes: [{
                          scaleFontSize: 4
                        }]
                    },
                    legend: {display: false},
                    title: {display: true, text: `Patients in Hospital`}
                }}
            />
        )
        : null
    )

    return (
        <div className='container'>
            <h1>Local Statistics</h1>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx('card', 'infected')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Infected</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_total_cases} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of confirmed cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'recovered')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Recovered</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_recovered} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'active')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Active</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_active_cases} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of active from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'deaths')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Deaths</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_deaths} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'infected')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>New cases</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_new_cases} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of new cases in COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'deaths')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>New deaths</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={data.local_new_deaths} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{data.update_date_time}</Typography>
                        <Typography variant='body2'>Number of new deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>

            <div className='bar1'>{barChart}</div>

            <div className='line1'>{lineChartPCR}</div>
            <div className='btn-container'>
                <button onClick={() => generatePcrPDF(dataPCR)} className='btn'>Download</button>
            </div>

            <div className='bar1'>{barChartHospital}</div>
            <div className='btn-container-bottom'>
                <button onClick={() => generateHospitalPDF(dataHospital)} className='btn'>Download</button>
            </div>

        </div>
    )

    
}

export default LocalCards

