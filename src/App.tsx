import { useEffect, useState } from 'react';
import { fetchCountries } from './utils/fetchCountries';
import FlagDisplay from './components/FlagDisplay';
import CountryOptions from './components/CountryOptions';
import { Country } from './types/Country';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
      generateNewQuestion(countriesData);
    };
    loadCountries();
  }, []);

  const generateNewQuestion = (countriesData: Country[]) => {
    const randomCountry =
      countriesData[Math.floor(Math.random() * countriesData.length)];
    setCurrentCountry(randomCountry);

    const shuffledOptions = [...countriesData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((country) => country.name);

    if (!shuffledOptions.includes(randomCountry.name)) {
      shuffledOptions[Math.floor(Math.random() * 3)] = randomCountry.name;
    }

    setOptions(shuffledOptions);
  };

  const handleGuess = (guess: string) => {
    if (guess === currentCountry?.name) {
      setScore(score + 1);
    } else {
      alert(`Incorrect! The correct answer was ${currentCountry?.name}`);
    }
    generateNewQuestion(countries);
  };

  return (
    <div>
      <h1>Guess the Flag!</h1>
      {currentCountry && <FlagDisplay country={currentCountry} />}
      <CountryOptions options={options} onGuess={handleGuess} />
      <p>Score: {score}</p>
    </div>
  );
}

export default App;
