import { Country } from '../types/Country';
import { Box, Image } from '@chakra-ui/react';

interface FlagDisplayProps {
  country: Country;
}

function FlagDisplay({ country }: FlagDisplayProps) {
  return (
    <Box
      textAlign="center"
      border="1px"
      borderStyle="solid"
      borderColor="black"
    >
      <Image
        src={country.flag}
        alt={`Flag of ${country.name}`}
        width="200px"
        objectFit="cover"
      />
    </Box>
  );
}

export default FlagDisplay;
