import { unstable_noStore as noStore } from 'next/cache';


export async function getCity(cityName: any) {
    noStore();
    
    const sanitizedCityName = cityName;
    const api_key = "0eebd1fcf852d29ca0340c5c451d4c9a";

    const urlReservamos = `https://search.reservamos.mx/api/v2/places?q=${sanitizedCityName}`

    try {
        const response = await fetch(urlReservamos);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const urlOpenWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].long}&appid=${api_key}&units=metric`;
        
        const responseOpenWeather = await fetch(urlOpenWeather);
        if (!responseOpenWeather.ok) {
          throw new Error('Network response was not ok');
        }
        const dataOpenWeather = await responseOpenWeather.json();
        return dataOpenWeather;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }

    return {};
}


