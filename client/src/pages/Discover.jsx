import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

/* Heart Icon */
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    api
      .get("/user/getProfiles")
      .then((res) => setProfiles(res.data))
      .catch(() => setToast("❌ Failed to load profiles"))
      .finally(() => setLoading(false));
  };

 const likeUser = async (id, name) => {
  const previous = [...profiles];
  setProfiles(profiles.filter((p) => p._id !== id));

  try {
    const res = await api.post(`/like/${id}`);

    if (res.data.matched) {
      setToast(`🎉 It's a match with ${name}!`);
    } else if (res.data.message === "Already liked") {
      setToast("⚠️ You already liked this profile");
    } else {
      setToast("❤️ Like sent");
    }

    setTimeout(() => setToast(null), 2000);
  } catch (err) {
    setProfiles(previous);
    setToast("❌ Something went wrong");
    setTimeout(() => setToast(null), 2000);
  }
};


  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-56 bg-gray-200 rounded-xl" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Discover
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find people you might like
            </p>
          </div>

          {/* Matches Button */}
          <button
            onClick={() => navigate("/matches")}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            View Matches →
          </button>
        </header>

        {/* Empty State */}
        {profiles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-base">
              No more profiles to show
            </p>
            <button
              onClick={fetchProfiles}
              className="mt-4 text-sm font-medium text-indigo-600 hover:underline"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {profiles.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={user.avatar || "https://via.placeholder.com/300"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2.5em]">
                    {user.bio || "Just joined. Say hello!"}
                  </p>

                  <button
                    onClick={() => likeUser(user._id, user.name)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 
                    bg-rose-50 text-rose-600 
                    hover:bg-rose-500 hover:text-white 
                    py-2 rounded-lg text-sm font-medium 
                    transition active:scale-95"
                  >
                    <HeartIcon />
                    Like
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm transition">
          {toast}
        </div>
      )}
    </div>
  );
}

export default Discover;
