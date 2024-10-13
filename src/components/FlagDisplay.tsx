import { Country } from '../types/Country';

interface FlagDisplayProps {
  country: Country;
}

function FlagDisplay({ country }: FlagDisplayProps) {
  return (
    <div>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
    </div>
  );
}

export default FlagDisplay;
