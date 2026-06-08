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
    return (
      <div className="empty-state">
        <h1>No user logged in</h1>
      </div>
    );
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
      <div className="page-heading">
        <span className="eyebrow">Your dashboard</span>
        <h1>Profile</h1>
      </div>

      <div className="profile-grid">
        <section className="card profile-card">
          <div className="card-body">
            <h2 className="h4">Account</h2>
            <p className="mb-1">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="mb-0">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </section>

        <section className="card profile-card">
          <div className="card-body">
            <h2 className="h4">Statistics</h2>
            <div className="stat-row">
              <span>Completed Lessons</span>
              <strong>{completedLessons}</strong>
            </div>
            <div className="stat-row">
              <span>Average Score</span>
              <strong>{averageScore}</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="section-heading">
        <h2>Lesson Progress</h2>
      </div>

      <div className="row g-4">
        {progress.map((item) => (
          <div className="col-md-6" key={item._id}>
            <article className="card progress-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
                  <h3 className="h5 mb-0">
                    {item.lessonId?.title}
                  </h3>
                  <span
                    className={`badge ${
                      item.completed ? "text-bg-success" : "text-bg-secondary"
                    }`}
                  >
                    {item.completed ? "Complete" : "In progress"}
                  </span>
                </div>

                <p className="text-secondary mb-2">
                  Category: {item.lessonId?.category}
                </p>

                <div className="progress" role="progressbar" aria-valuenow={item.score} aria-valuemin="0" aria-valuemax="100">
                  <div
                    className="progress-bar"
                    style={{ width: `${item.score}%` }}
                  >
                    {item.score}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {progress.length === 0 && (
        <div className="empty-state">
          <h2>No progress yet</h2>
          <p className="text-secondary">
            Complete a quiz to see your lesson history here.
          </p>
        </div>
      )}

      <button className="btn btn-outline-danger mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
