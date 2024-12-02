// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false; // Numbers less than or equal to 1 are not prime
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // Number is divisible by i, so it's not prime
    }
  }
  return true; // Number is prime
}

// Function to get all prime numbers up to a given limit
function findPrimes(limit) {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

// Example usage
const limit = 50;
const primesUpToLimit = findPrimes(limit);
console.log(`Prime numbers up to ${limit}:`, primesUpToLimit);
