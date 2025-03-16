import { useEffect, useState } from "react";
import { getUserBadges, getSuccessStories } from "../apicalls/motivationApi";

const AchievementsAndStories = () => {
  const [badges, setBadges] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch badges and success stories
        const badgeData = await getUserBadges();
        const storyData = await getSuccessStories();

        setBadges(badgeData || []);
        setStories(storyData || []);
      } catch (error) {
        console.error("Error fetching achievements & stories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Achievements & Success Stories</h2>

      {/* User Achievements */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600">🎖️ User Achievements</h3>
        {badges.length > 0 ? (
          <ul className="list-disc ml-5 text-gray-700">
            {badges.map((user, index) => (
              <li key={index} className="mt-1">
                <span className="font-semibold">{user.userId}</span>: {user.badges.join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No achievements yet.</p>
        )}
      </div>

      {/* Success Stories */}
      <div>
        <h3 className="text-lg font-semibold text-green-600">📖 Success Stories</h3>
        {stories.length > 0 ? (
          <div className="mt-3 grid gap-3">
            {stories.map((story, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-100">
                <p className="font-bold text-gray-800">{story.name}</p>
                <p className="text-gray-600">{story.achievement}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No success stories yet.</p>
        )}
      </div>
    </div>
  );
};

export default AchievementsAndStories;
