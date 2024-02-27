'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from "use-debounce"

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) {
            params.set('city', term);
          } else {
            params.delete('city')
          }
          replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="flex justify-center">
            <div className="mt-6 flex max-w-lg w-full">
                <label htmlFor="city-name" className="sr-only">
                    Ciudad
                </label>
                <input
                    id="city-name"
                    name="cityName"
                    type="text"
                    autoComplete="address-level2"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Ingresa tu ciudad"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    )
}