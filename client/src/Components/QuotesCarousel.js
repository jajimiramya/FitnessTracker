import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotivationCarousel = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/tips")
        console.log(response.data);
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips data:", error);
      }
    };

    fetchTips();
  }, []);

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
        {tips.length > 0 ? (
          tips.map((item, index) => (
            <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <p className={`text-gray-700 italic ${item.type === "tip" ? "font-semibold" : ""}`}>
                {item.type === "quote" ? `💬 "${item.text}"` : `🔥 Tip: ${item.text}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading tips...</p>
        )}
      </Slider>
    </div>
  );
};

export default MotivationCarousel;
