import { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { fetchCountries } from './utils/fetchCountries';
import FlagDisplay from './components/FlagDisplay';
import CountryOptions from './components/CountryOptions';
import { Country } from './types/Country';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const toast = useToast();

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
      toast({
        title: 'Correct!',
        description: `You guessed it right!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Incorrect!',
        description: `The correct answer was ${currentCountry?.name}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    generateNewQuestion(countries);
  };

  return (
    <Center minH="100vh" bgGradient="linear(to-r, blue.50, teal.50)">
      <Stack
        spacing={8}
        p={8}
        bg="white"
        boxShadow="2xl"
        rounded="xl"
        align="center"
        w="full"
        maxW="md"
      >
        <Heading as="h1" size="2xl" textAlign="center" color="teal.600">
          Guess the Flag!
        </Heading>

        {currentCountry && (
          <Flex justify="center" w="full">
            <FlagDisplay country={currentCountry} />
          </Flex>
        )}

        <CountryOptions options={options} onGuess={handleGuess} />

        <Box
          bg="gray.100"
          p={4}
          rounded="md"
          w="full"
          textAlign="center"
          shadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Score: {score}
          </Text>
        </Box>
      </Stack>
    </Center>
  );
}

export default App;
