import Search from "./ui/search";
import CardSection from "./ui/cards";

import { getCity } from "./lib/data";
import { Suspense } from "react";

import Loading from "./loading";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
      city?: string;
  }
}) {
  const cityName = searchParams?.city || '';
  
  const weatherData = await getCity(cityName);
  
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid lg:max-w-none">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Weather Forecast</h1>
            <h2 className="text-sm font-bold tracking-tight text-white">by Braulio Romero</h2>
            {/* <p className="mt-4 text-lg text-gray-300">
              Ya sea que estés planeando una escapada de fin de semana, programando actividades al aire libre o simplemente manteniéndote informado sobre las condiciones en tu área, te tenemos cubierto.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Nuestra herramienta de pronóstico brinda actualizaciones meteorológicas precisas y actualizadas para ayudarlo a planificar su día con confianza.
            </p> */}
            <Search></Search>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
          <div className='mt-10 mx-auto max-w-7xl' >
            <p className="text-white">Weather for next 5 days in <span className="text-4xl">{cityName.toUpperCase()}</span></p>
            <div className="mt-4 grid grid-cols-5 gap-4">
              <CardSection weatherData={weatherData}></CardSection>
            </div>
          </div>
    </div>
    
  )
}
