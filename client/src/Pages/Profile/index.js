import React, { useEffect, useState } from "react";
import { GetUserProfile, UpdateUserProfile } from "../../apicalls/users";
import { message } from "antd";

const Profile = () => {
  const [user, setUser] = useState({ name: "", age: "", height: "", weight: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetUserProfile();
      if (response.success) setUser(response.data);
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const response = await UpdateUserProfile(user);
    if (response.success) {
      message.success("Profile updated successfully!");
      setEditMode(false);
    } else {
      message.error("Update failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-3xl font-bold mb-5">User Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            {editMode ? (
              <input
                type="text"
                value={user.name}
                className="border px-2 py-1 rounded"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            ) : (
              <span>{user.name}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Age:</span>
            {editMode ? (
              <input
                type="number"
                value={user.age}
                className="border px-2 py-1 rounded"
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
            ) : (
              <span>{user.age}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Height (cm):</span>
            {editMode ? (
              <input
                type="number"
                value={user.height}
                className="border px-2 py-1 rounded"
                onChange={(e) => setUser({ ...user, height: e.target.value })}
              />
            ) : (
              <span>{user.height}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Weight (kg):</span>
            {editMode ? (
              <input
                type="number"
                value={user.weight}
                className="border px-2 py-1 rounded"
                onChange={(e) => setUser({ ...user, weight: e.target.value })}
              />
            ) : (
              <span>{user.weight}</span>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          {editMode ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
