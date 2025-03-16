import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotivationCarousel = () => {
  const motivationItems = [
    { type: "quote", text: "Push yourself, because no one else is going to do it for you." },
    { type: "quote", text: "Success starts with self-discipline." },
    { type: "quote", text: "The only bad workout is the one that didn’t happen." },
    { type: "tip", text: "Drink at least 8 glasses of water a day to stay hydrated." },
    { type: "tip", text: "Stretch before and after workouts to prevent injuries." },
    { type: "tip", text: "Aim for 30 minutes of exercise daily to boost overall health." },
    { type: "quote", text: "Your body can stand almost anything. It’s your mind that you have to convince." },
    { type: "tip", text: "Get enough sleep—rest is just as important as exercise." },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">🚀 Motivation & Tips</h2>
      <Slider {...settings}>
        {motivationItems.map((item, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <p className={`text-gray-700 italic ${item.type === "tip" ? "font-semibold" : ""}`}>
              {item.type === "quote" ? `💬 "${item.text}"` : `🔥 Tip: ${item.text}`}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MotivationCarousel;
