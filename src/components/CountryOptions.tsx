import { Button, Stack } from '@chakra-ui/react';

interface CountryOptionsProps {
  options: string[];
  onGuess: (country: string) => void;
}

function CountryOptions({ options, onGuess }: CountryOptionsProps) {
  return (
    <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align="center">
      {options.map((country) => (
        <Button
          key={country}
          colorScheme="teal"
          variant="solid"
          onClick={() => onGuess(country)}
        >
          {country}
        </Button>
      ))}
    </Stack>
  );
}

export default CountryOptions;
