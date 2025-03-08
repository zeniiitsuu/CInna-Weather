import { WeatherCondition, TimeOfDay } from "@shared/schema";

const phrases: Record<WeatherCondition, Record<TimeOfDay, string[]>> = {
  Clear: {
    Morning: [
      "Good morning sunshine! The sky is as clear as your beautiful smile! ✨",
      "Rise and shine! It's a perfect morning for a walk! ☀️",
      "What a lovely morning! Let's start the day with positive energy! (◕‿◕✿)"
    ],
    Evening: [
      "The evening sky is clear and lovely! Perfect for stargazing! ⭐",
      "Such a beautiful clear evening! Time to relax and unwind~ 🌅",
      "The stars will shine extra bright tonight! (´｡• ᵕ •｡`)"
    ],
    Night: [
      "Sweet dreams under the clear night sky! 🌙",
      "The moon is watching over you tonight! Sleep tight! ✨",
      "What a peaceful clear night! Time for sweet dreams! (｡♥‿♥｡)"
    ]
  },
  Clouds: {
    Morning: [
      "Good morning! The clouds are like fluffy cotton candy today! ☁️",
      "Rise and shine! The clouds are giving us a cozy morning hug! (◡‿◡✿)",
      "What a soft cloudy morning! Perfect for a warm breakfast! 🍵"
    ],
    Evening: [
      "The evening clouds are painting pretty pictures in the sky! 🎨",
      "Such dreamy clouds for a cozy evening! ⛅",
      "Let's watch the clouds change colors as the sun sets! (´･ᴗ･`)"
    ],
    Night: [
      "The clouds are like a soft blanket over the night sky! 🌙",
      "Time for sweet dreams under our cloudy night sky! 💭",
      "The clouds will keep you cozy all night long! (￣▽￣)ノ"
    ]
  },
  Rain: {
    Morning: [
      "Good morning! Don't forget your cute umbrella today! ☔",
      "The morning rain is helping the flowers grow! 🌸",
      "Let's stay cozy this rainy morning! (´｡• ᵕ •｡`)"
    ],
    Evening: [
      "The evening rain is so soothing! Perfect for a warm drink! ☕",
      "Listen to the peaceful evening rain~ 🎵",
      "Stay dry and cozy this rainy evening! (｡♥‿♥｡)"
    ],
    Night: [
      "Let the rain sing you a lullaby tonight! 🌧️",
      "Sweet dreams with the gentle night rain! 💫",
      "The rain will keep you company all night! (◕‿◕✿)"
    ]
  },
  Snow: {
    Morning: [
      "Good morning! The world is covered in sparkly snow! ❄️",
      "Wake up to a winter wonderland! ⛄",
      "Bundle up warm for this snowy morning! (´･ᴗ･`)"
    ],
    Evening: [
      "The evening snow is making everything magical! ✨",
      "What a perfect evening for hot cocoa! ☕",
      "Stay warm and cozy this snowy evening! (◡‿◡✿)"
    ],
    Night: [
      "Sweet dreams in our winter wonderland! 🌙",
      "The snow will blanket you in peaceful dreams! ❄️",
      "Sleep tight under the gentle snowfall! (｡♥‿♥｡)"
    ]
  },
  Thunderstorm: {
    Morning: [
      "Don't worry about the morning storm! I'll keep you safe! ⚡",
      "Stay cozy inside this stormy morning! 🏠",
      "The storm will pass, let's have a warm breakfast! (っ´･ω･`)っ"
    ],
    Evening: [
      "Let's stay inside where it's warm and dry! 🌩️",
      "The perfect evening to cuddle up with a book! 📚",
      "Don't worry about the storm, you're safe inside! (´｡• ᵕ •｡`)"
    ],
    Night: [
      "Sleep tight, don't let the thunder frighten you! 💫",
      "I'll watch over your dreams during the storm! 🌙",
      "The storm can't reach you in your dreams! (◕‿◕✿)"
    ]
  },
  Drizzle: {
    Morning: [
      "Good morning! Just a gentle drizzle to start the day! 💧",
      "The morning mist is like nature's face cream! ✨",
      "Such a refreshing morning drizzle! (◡‿◡✿)"
    ],
    Evening: [
      "The evening drizzle is so calming! 🌧️",
      "Perfect weather for a cozy evening indoors! 🏠",
      "Let's enjoy this gentle evening rain! (´･ᴗ･`)"
    ],
    Night: [
      "The soft drizzle will help you sleep! 😴",
      "Sweet dreams with this gentle night rain! 💫",
      "Let the drizzle sing you to sleep! (｡♥‿♥｡)"
    ]
  },
  Mist: {
    Morning: [
      "Good morning! The mist makes everything look magical! ✨",
      "What a dreamy misty morning! 🌫️",
      "The morning mist is like a soft hug! (◕‿◕✿)"
    ],
    Evening: [
      "The evening mist is creating a magical atmosphere! 🌫️",
      "Everything looks so mysterious and beautiful! ✨",
      "Let's enjoy this dreamy evening! (´｡• ᵕ •｡`)"
    ],
    Night: [
      "The misty night is perfect for sweet dreams! 🌙",
      "Sleep tight in our magical misty world! ✨",
      "The mist will guard your peaceful sleep! (｡♥‿♥｡)"
    ]
  }
};

export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Evening";
  return "Night";
}

export function getRandomPhrase(condition: WeatherCondition): string {
  const timeOfDay = getCurrentTimeOfDay();
  const conditionPhrases = phrases[condition][timeOfDay];
  const randomIndex = Math.floor(Math.random() * conditionPhrases.length);
  return conditionPhrases[randomIndex];
}