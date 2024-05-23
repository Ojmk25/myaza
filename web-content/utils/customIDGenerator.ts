import { customAlphabet } from 'nanoid';

// Define the alphabet as lowercase letters
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Create nanoid generators for different parts
const generateThreeLetters = customAlphabet(alphabet, 3);
const generateFourLetters = customAlphabet(alphabet, 4);

// Function to generate the custom ID
export function generateCustomId() {
  console.log(`${generateThreeLetters()}-${generateThreeLetters()}-${generateFourLetters()}`);

  return `${generateThreeLetters()}-${generateThreeLetters()}-${generateFourLetters()}`;
}