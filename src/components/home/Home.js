import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import ReadMoreReact from 'read-more-react';

function Home() {
    return (
            <div class="row">
                <div class="column1">
                    <h1><u>Corona Tracker</u></h1>
                    <p>
                        <ReadMoreReact text='Corona Tracker is an easy tool to find and analyze data about current 
                    situations of covid-19 globally and locally.
                    This application provides an interface to showcase global data of infected, recovered, 
                    active cases and number of deaths according to date and in total. 
                   Also we can analyze and view the number of infected people, recovered, active cases and 
                   death count separately according to needed country wise. 
                   We can view local data about infected, recovered, active, deaths, new cases, new deaths, 
                   number of PCR tests taken date wise and in total. Also we can view hospital wise data about 
                   number of patients admitted per hospital. 
                   Using this system we can compare and view the number of infected, recovered, active cases 
                   and death counts of any two countries according to our requirement.
                   All the data are shown graphically using graphs for a better understanding and for a clear 
                   view to analyze and take conclusions based on the data.
                   Finally we can download the data as a PDF and save it to use for future references and 
                   researches.'

                            min={250}
                            ideal={400}
                            max={1000}
                            readMoreText={<button className='btn-learn-more'>Learn More</button>} />
                    </p>
                </div>

                <div class="column2">
                    <h2>Top Links</h2>
                    <div className='top-link-items'>
                        <Link className='top-link-items-list' to='/overall'>Overall Statistics</Link>
                        <Link className='top-link-items-list' to='/local'>Local Statistics</Link>
                        <Link className='top-link-items-list' to='/comparison'>Comparison</Link>
                    </div>
                </div>
            </div>
    )
}

export default Home

