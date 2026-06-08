import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get("/lessons");
        setLessons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div>
      <div className="page-heading">
        <span className="eyebrow">Course library</span>
        <h1>Python Lessons</h1>
        <p className="text-secondary">
          Pick a lesson, test your understanding, and keep your progress moving.
        </p>
      </div>

      <div className="row g-4">
        {lessons.map((lesson) => (
          <div className="col-md-6 col-xl-4" key={lesson._id}>
            <article className="card lesson-card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
                  <h2 className="h4 card-title mb-0">{lesson.title}</h2>
                  <span className="badge text-bg-light">
                    {lesson.difficulty}
                  </span>
                </div>

                <p className="card-text text-secondary flex-grow-1">
                  {lesson.description}
                </p>

                <button
                  className="btn btn-primary mt-4"
                  onClick={() => navigate(`/quiz/${lesson._id}`)}
                >
                  Start Quiz
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="empty-state">
          <h2>No lessons yet</h2>
          <p className="text-secondary">
            Lessons will appear here once they are available from the API.
          </p>
        </div>
      )}
    </div>
  );
}

export default Lessons;
