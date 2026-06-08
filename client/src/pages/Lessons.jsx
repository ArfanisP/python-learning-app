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
      <h1>Python Lessons</h1>

      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{lesson.title}</h2>

          <p>{lesson.description}</p>

          <strong>{lesson.difficulty}</strong>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() =>
                navigate(`/quiz/${lesson._id}`)
              }
            >
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lessons;