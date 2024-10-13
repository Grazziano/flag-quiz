interface CountryOptionsProps {
  options: string[];
  onGuess: (country: string) => void;
}

function CountryOptions({ options, onGuess }: CountryOptionsProps) {
  return (
    <div>
      {options.map((country) => (
        <button key={country} onClick={() => onGuess(country)}>
          {country}
        </button>
      ))}
    </div>
  );
}

export default CountryOptions;
