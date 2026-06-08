import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyProgress } from "../services/progressService";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [progress, setProgress] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getMyProgress();
        setProgress(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgress();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return <h1>No user logged in</h1>;
  }

  const completedLessons =
    progress.filter(
      (item) => item.completed
    ).length;

  const averageScore =
    progress.length > 0
      ? (
          progress.reduce(
            (sum, item) => sum + item.score,
            0
          ) / progress.length
        ).toFixed(1)
      : 0;

  return (
    <div>
      <h1>Profile</h1>

      <p>
        Username: {user.username}
      </p>

      <p>
        Email: {user.email}
      </p>

      <hr />

      <h2>Statistics</h2>

      <p>
        Completed Lessons:
        {" "}
        {completedLessons}
      </p>

      <p>
        Average Score:
        {" "}
        {averageScore}
      </p>

      <hr />

      <h2>Lesson Progress</h2>

      {progress.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>
            {item.lessonId?.title}
          </h3>

          <p>
            Category:
            {" "}
            {item.lessonId?.category}
          </p>

          <p>
            Score:
            {" "}
            {item.score}
          </p>

          <p>
            Completed:
            {" "}
            {item.completed
              ? "Yes"
              : "No"}
          </p>
        </div>
      ))}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;