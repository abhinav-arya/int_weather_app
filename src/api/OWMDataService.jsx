// import axios from 'axios'
import $ from 'jquery'
import AppData from '../config/AppData'

class OWMDataService {

    getWeatherById = (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=${AppData.app_id}`,
                cache: false,
                format: 'json',
                success: (response) => {
                    resolve(response)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    getWeatherByCity = (city) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${AppData.app_id}`,
                cache: false,
                format: 'json',
                success: (response) => {
                    resolve(response)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    getWeatherByLocation = (lat, lon) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${AppData.app_id}`,
                cache: false,
                format: 'json',
                success: (response) => {
                    resolve(response)
                } ,  
                error: (error) => {
                    reject(error)
                }
            })
        })
    }
}

export default new OWMDataService()
