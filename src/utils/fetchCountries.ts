import { Country } from '../types/Country';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data.map((country: any) => ({
    name: country.name.common,
    flag: country.flags.svg,
  }));
};
