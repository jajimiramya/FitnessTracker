import { useState, useEffect } from 'react';

const FitnessTipsMotivation = () => {
  const tips = [
    "💧 Stay hydrated throughout the day.",
    "🥗 Incorporate more fruits and veggies into your meals.",
    "🏋️‍♂️ Mix strength and cardio for balanced fitness.",
    "😴 Prioritize sleep for better recovery.",
    "🧘 Practice mindfulness and stretch daily."
  ];

  const quotes = [
    "“The body achieves what the mind believes.” 💪",
    "“Push yourself, because no one else is going to do it for you.” 🚀",
    "“Fitness is not about being better than someone else. It’s about being better than you used to be.” 🌟",
    "“Don’t limit your challenges, challenge your limits.” 🏆",
    "“Every workout counts, no matter how small.” 🏃‍♂️"
  ];

  const [quote, setQuote] = useState('');

  useEffect(() => {
    // 🎲 Select a random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">🧘 Fitness Tips & Motivation</h2>

      {/* 🌟 Quote of the Day */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md mb-4">
        <h3 className="font-semibold text-blue-600">💡 Quote of the Day</h3>
        <p className="italic">{quote}</p>
      </div>

      {/* 💡 Fitness Tips List */}
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="p-3 bg-gray-100 rounded-md">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessTipsMotivation;


