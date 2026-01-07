import { useEffect, useState } from "react";
import api from "../api/axios";

function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get("/like/matches")
      .then(res => setMatches(res.data))
      .catch(() => alert("Failed to load matches"));
  }, []);

  const myId =
    JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <header className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Matches
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            People who liked you back
          </p>
        </header>

        {matches.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-base">
              No matches yet
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {matches.map(match => {
              const otherUser = match.users.find(
                u => u._id !== myId
              );

              if (!otherUser) return null;

              return (
                <div
                  key={match._id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  
                  <div className="h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={otherUser.avatar || "https://via.placeholder.com/300"}
                      alt={otherUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {otherUser.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      It’s a match 🎉
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;
