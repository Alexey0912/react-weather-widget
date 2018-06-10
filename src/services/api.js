import axios from 'axios';
import config from '../config';

export function getInitData() {
    const locationsStorage = JSON.parse(localStorage.getItem('locations')) || [];
    if(locationsStorage && locationsStorage.length > 0 ) {
        const ids = locationsStorage.map(elem => {
            return elem.id;
        })

        const idsString = ids.join(',');

       return axios.get(config.baseWeatherUrl + '/group?id=' + idsString + '&units=metric&appid=' + config.apiKey)
            .then(response => {
                return response.data.list.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.name,
                        temperature: elem.main,
                        weather: elem.weather
                    }
                })
            })
            .catch(error => {

            });
    } else {
        return new Promise(() => {
            return []
        })
    }
};

export function addLocation(name) {
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
    if(locations.every(elem => { return elem.name !== name})) {
        return axios.get(config.baseWeatherUrl + '/weather?q=' + name + '&units=metric&appid=' + config.apiKey)
            .then(response => {

                locations.push({
                    id: response.data.id,
                    name: response.data.name
                })

                localStorage.setItem('locations', JSON.stringify(locations));

                return {
                    id: response.data.id,
                    name: response.data.name,
                    temperature: response.data.main,
                    weather: response.data.weather
                }
            })
            .catch(error => {
                return {
                    cod: error.response.data.cod,
                    message: error.response.data.message,
                };
            });
    } else {
        return new Promise(() => {
            return {
                cod: 400,
                message: 'Duplicate element'
            }
        })
    }


};

export function removeLocationFromStorage(id, locationListState) {
    const locations = JSON.parse(localStorage.getItem('locations'));

    const locationList =  locations.filter(elem => {
        return elem.id !== id;
    });

    localStorage.setItem('locations', JSON.stringify(locationList));

    const updatedLocationList = locationListState.filter(elem => {
        return elem.id !== id;
    });

    return updatedLocationList;
};