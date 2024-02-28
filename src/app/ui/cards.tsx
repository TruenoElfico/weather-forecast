
export default function CardSection({weatherData}: {weatherData: any}) {
    interface WeatherDetail {
        min: number,
        max: number,
        date: string
    }

    let minMaxData: WeatherDetail[] = [];
    
    if (!!weatherData.list) {
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
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
    }
    
    function repeat() {        
        let items = [];
        
        for (let i = 0; i < 5; i++) {
            items.push(<Card dayWeek={getDayOfWeek(new Date(minMaxData[i].date))} maxValue={minMaxData[i].max} minValue={minMaxData[i].min} key={i}></Card>);
        }
        return <>{items}</>;
    }
      

    return (
        repeat()
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