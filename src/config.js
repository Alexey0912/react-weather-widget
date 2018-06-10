const env = process.env.NODE_ENV || "development";

const config = {
    development: {
        baseWeatherUrl: 'http://api.openweathermap.org/data/2.5',
        apiKey: 'fd8cd0c682004e273972ea78b9fc7faf'
    },
    test: {
        baseWeatherUrl: 'http://api.openweathermap.org/data/2.5',
        apiKey: 'fd8cd0c682004e273972ea78b9fc7faf'
    },
    production: {
        baseWeatherUrl: 'http://api.openweathermap.org/data/2.5',
        apiKey: 'fd8cd0c682004e273972ea78b9fc7faf'
    }
};


export default config[env];