import React from 'react'

const WeatherForecast = (forecast) => {

    return (
        <>
            <div className='forecast' id='forecast'>
                { 
                    forecast.forecast.map(elem => {
                        return (
                            <div className='block' key={elem.date.toString()}>
                                <h3 className='secondary .weekday'>{new Date(elem.date).toString().split(' ')[0]}</h3>
                                <h2 className='high'>{elem.high}</h2>
                                <h4 className='secondary'>{elem.low}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default WeatherForecast