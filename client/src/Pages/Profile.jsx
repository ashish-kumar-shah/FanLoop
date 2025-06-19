import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../Component/Loading";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";
import FollowButton from "../Component/FollowButton";

const Profile = () => {
  const { User } = useContext(AppContext);
  const { getUserProfile } = useContext(serviceContext);
  const { username } = useParams();
    const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(username)
      .then((res) => {
        setUserProfile(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setUserProfile(null);
        setLoading(true);
      });
  }, [username]);

  if (loading || !userProfile) return <Loading />;

  const { user, posts, stats } = userProfile;
  const isOwnProfile = User?.user?._id === user?._id;
  const isPublic = user?.role === "public";

  const statItems = [
    { label: "Posts", value: posts?.length || 0 },
    ...(!isPublic ? [{ label: "Followers", value: stats?.followers || 0 }] : []),
    { label: "Following", value: stats?.following || 0 },
  ];

  return (
    <div className="w-full flex flex-col items-center py-6 bg-gray-50 h-fit px-4 gap-4">
      {/* Profile Container */}
      <div className="w-full max-w-4xl rounded-xl p-4 sm:p-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-start items-center gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={user?.profilePic}
              alt="Profile"
              className="w-full h-full object-cover object-top aspect-square"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full">
            {/* Username + Settings */}
            <div className="md:flex flex-col sm:flex-row justify-between sm:items-center w-full hidden">
              <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
                @{user?.username}
              </h2>
              <div className="flex justify-center sm:justify-end mt-2 sm:mt-0">
                {isOwnProfile && (
                  <div className="cursor-pointer  rounded-full hover:bg-gray-100 aspect-square  h-10 w-10 flex justify-center items-center
                  ">
                    

                    <Link to={'/settings'}>
                    <span className="material-symbols-outlined text-gray-600 pt-1.5">
                      settings
                    </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-around sm:justify-start gap-6 mt-4 text-center">
              {statItems.map(({ label, value }, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="font-bold text-lg">{value}</span>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>

            {/* Name & Role */}
            <div className="mt-4 sm:text-left flex p-1 gap-1">
              <div className="box-1 w-full h-full">
                <p className="text-base sm:text-lg font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.role}</p>
              </div>

              {!isOwnProfile && user?.role !== "public" && (
                <FollowButton id={user?._id} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="section-2 w-full h-fit flex flex-col justify-center items-center">
        <div className="heading w-full md:w-10/12 h-12 p-2">
          <h1 className="font-bold text-xl font-serif md:pl-4">Post</h1>
        </div>

        <div className="w-full md:w-10/12 flex flex-wrap justify-start item-center p-4 gap-4">
          {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Link
                to="/createpost"
                className="w-full h-full px-4 rounded-md border-2 border-yellow-500 text-yellow-500 text-xl hover:text-white hover:bg-yellow-500"
              >
                <button className="createpost w-full h-fit p-2 font-bold font-mono">
                  Create Post
                </button>
              </Link>
            </div>
          )}

          {posts.map((e, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-md w-36 h-36 sm:w-64 sm:h-64 hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
            
              onClick={()=>{
                navigate(`/viewpost/${e._id}`)
              }}
            >
              {e.content[0].type === "image" ? (
                <img
                  src={e.content[0].url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={e.content[0].url}
                  className="w-full h-full object-cover"
                  
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
