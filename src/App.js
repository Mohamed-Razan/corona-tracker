import React, { Component } from 'react'
import './App.css'
import Cards from './components/cards/Cards'
import Chart from './components/chart/Chart'
import CountryPicker from './components/countryPicker/CountryPicker'
import { fetchData } from './api'

import LocalCards from './components/cards/LocalCards'
import Home from './components/home/Home'
import Navbar from './components/Navbar/Navbar'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Comparison from './components/comparison/Comparison'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: {},
      data1: {},
      country: '',
      country1: ''
    }
  }


  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({
      data: fetchedData
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({
      data: fetchedData,
      country: country
    });

  }

  handleCountryChange1 = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({
      data1: fetchedData,
      country1: country
    });

  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>  
            <Route path='/' exact>
              <Home />
            </Route>

            <Route path='/overall'>
              <h1 className='overall'>Overall Statistics</h1>
              <Cards data={this.state.data} />
              <div className='container'>
                <CountryPicker handleCountryChange={this.handleCountryChange.bind(this)} />
              </div>
              <br />
              <Chart data={this.state.data} country={this.state.country} />
            </Route>

            <Route path='/local'>
              <LocalCards />
            </Route>

            <Route path='/comparison'>
              <h1 className='overall' >Comparison</h1>
              <div className='container'>
                <CountryPicker handleCountryChange={this.handleCountryChange.bind(this)} />
                <br />
                <CountryPicker handleCountryChange={this.handleCountryChange1.bind(this)} />
              </div>
              <Comparison data1={this.state.data} data2={this.state.data1} 
                country1={this.state.country} country2={this.state.country1} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
