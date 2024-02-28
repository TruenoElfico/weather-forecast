import { SunIcon } from '@heroicons/react/24/outline'

export default function CardSection({weatherData}: {weatherData: any}) {
    interface WeatherDetail {
        min: number,
        max: number,
        date: string
    }

    let minMaxData: WeatherDetail[] = [];

    if (!!weatherData) {
        for (let i = 0; i < weatherData.list.length; i++) {
            const currentDate = weatherData.list[i].dt_txt.split(' ')[0];
            let minTemp = weatherData.list[i].main.temp_min;
            let maxTemp = weatherData.list[i].main.temp_max;
    
            let j;
            for (j = i + 1; j < weatherData.list.length; j++) {
                if (weatherData.list[j].dt_txt.split(' ')[0] === currentDate) {
                    minTemp = Math.min(minTemp, weatherData.list[j].main.temp_min);
                    maxTemp = Math.max(maxTemp, weatherData.list[j].main.temp_max);
                } else {                
                    break;
                }            
            }
            
            i = j - 1;
            
            minMaxData.push({
                "min": minTemp,
                "max": maxTemp,
                "date": currentDate
            })
        }   
    }

    function getDayOfWeek(date: Date): string {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    }
    
    // Example usage:
    const date = new Date(); // This will give today's date
    const dayOfWeek = getDayOfWeek(date);
    console.log(dayOfWeek); // Output: e.g., "Saturday"
    

    return (
        <>
            {
                minMaxData.map((item, index) => (
                    <Card dayWeek={getDayOfWeek(new Date(item.date))} maxValue={item.max} minValue={item.min} key={index}></Card>
                ))  
            }
        </>
    )
}

export function Card({
  dayWeek,
  maxValue,
  minValue,
}: {
  dayWeek: string;
  maxValue: number;
  minValue: number;
}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between col-span-1">
            <h2 className="text-xl font-semibold mb-4">{dayWeek}</h2>
            <div className="flex items-center mb-4 mt-8">
                {/* <img src="weather-icon.png" alt="Weather icon" className="h-8 w-8 mr-2"></img> */}
                {/* <SunIcon className='w-8 l-8'></SunIcon> */}
                <p className="font-medium text-4xl">{Math.round(maxValue)}°C</p>
            </div>
            <div className="flex justify-between mt-8">
                <div>
                    <p className="text-sm text-gray-600">Max</p>
                    <p className="text-lg font-medium">{Math.round(maxValue)}°C</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Min</p>
                    <p className="text-lg font-medium">{Math.round(minValue)}°C</p>
                </div>
            </div>
        </div>

)
}