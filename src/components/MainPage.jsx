import React from 'react'
import cityListJSON from '../config/city.list.min.json'
import WeatherForecast from './WeatherForecast'
import OWMDataService from '../api/OWMDataService'
import searchImage from '../res/icons/search.svg'

class MainPage extends React.Component {

    constructor() {
        super()
        this.state = {
            weather: {
                today: {
                    temperature: '',
                    city: '',
                    detail: '',
                    icon: {
                        src: '02d',
                        width: '',
                        height: ''
                    }
                },
                forecast: []
            },
            searchText: '',
            weatherFetched: false
        }
    }

    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude
                    let lon = position.coords.longitude

                    OWMDataService.getWeatherByLocation(lat, lon)
                        .then((response) => {
                            console.log(response)
                            this.updateWeatherState(response)
                        })
                        .catch((error) => {
                            this.setState({
                                error: error
                            })
                        })
                }
            )
        }
        else {
            OWMDataService.getWeatherById('4887398')
            .then((response) => {
                this.updateWeatherState(response)
            })
            .catch((error) => {
                this.setState({
                    error: error
                })
            })   
        }
    }

    loadDataList = (dataList) => {
        const cityList = JSON.parse(JSON.stringify(cityListJSON))
    
        let options = ''
        cityList.forEach(city => {
            options += '<option value="'+city.name+'" />'
        })
        document.addEventListener("DOMContentLoaded", function(event) { 
            document.getElementById("cities").innerHTML = options
        })
    }

    handleCitySearch = (searchCity) => {
        OWMDataService.getWeatherByCity(searchCity)
            .then((response) => {
                this.updateWeatherState(response)
            })
            .catch((error) => {
                this.setState({
                    error: error
                })
            })
    }

    updateWeatherState = (response) => {
        this.setState({
            weather: {
                today: {
                    temperature: response.list[0].main.temp,
                    city: [response.city.name + ', ' + response.city.country],
                    detail: response.list[0].weather[0].description,
                    icon: {
                        src: response.list[0].weather[0].icon
                    }
                },
                forecast: [
                    {
                        'date': response.list[8].dt_txt,
                        'low': response.list[8].main.temp_min,
                        'high': response.list[8].main.temp_max
                    },
                    {
                        'date': response.list[16].dt_txt,
                        'low': response.list[16].main.temp_min,
                        'high': response.list[16].main.temp_max
                    },
                    {
                        'date': response.list[24].dt_txt,
                        'low': response.list[24].main.temp_min,
                        'high': response.list[24].main.temp_max
                    },
                    {
                        'date': response.list[32].dt_txt,
                        'low': response.list[32].main.temp_min,
                        'high': response.list[32].main.temp_max
                    },
                    {
                        'date': response.list[39].dt_txt,
                        'low': response.list[39].main.temp_min,
                        'high': response.list[39].main.temp_max
                    }
                ]
            },
            weatherFetched: true,
            error: ''
        })
    }

    handleInputChange = (event) => {
        this.setSearchText(event.target.value);
    }

    setSearchText = text => {
        this.setState({
            searchText: text
        })
    }

    handleFormSubmit = (event) => {
        if (this.state.searchText === '') return
        event.preventDefault();
        this.handleCitySearch(this.state.searchText);
        this.setSearchText('');
    }

    render() {
        return (
            <>
                <br/>
                <div>
                    <div className='renderedWeather'>
                        <div className="todayWeather">
                            <div className='leftPanel'>
                                <div className="tNow">
                                    {this.state.weather.today.temperature}&deg;{'C'}
                                    <div className='hr'>
                                        {this.state.weather.today.detail}
                                        <img src={"http://openweathermap.org/img/w/"+this.state.weather.today.icon.src+".png"} alt="Weather" />
                                    </div>
                                </div>
                                <div className='cityName'>
                                    {this.state.weather.today.city}
                                </div>
                                <div className="search-btn">
                                    <form onSubmit={this.handleFormSubmit}>
                                    <img src={searchImage} alt='search icon' />
                                        <input
                                            type='text'
                                            list="cities"
                                            id='city_search'
                                            placeholder={'Select Another City'}
                                            value={this.state.searchText}
                                            onChange={this.handleInputChange}
                                        />
                                        <button type='submit'>
                                            Search
                                        </button>
                                    </form>
                                    <datalist id="cities"> 
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        {
                            (this.state.weatherFetched) && <WeatherForecast forecast={this.state.weather.forecast}/>
                        }
                        <div className='rightPanel'>
                                <div className='poweredBy'>Credits: <b>Abhinav Arya</b></div>
                        </div>
                    </div>
                </div>
                { this.loadDataList() }
            </>
        )
    }
}

export default MainPage