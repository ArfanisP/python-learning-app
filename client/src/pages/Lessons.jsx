import { useEffect, useState } from "react";
import api from "../services/api";

function Lessons() {
  const [lessons, setLessons] = useState([]);

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
        </div>
      ))}
    </div>
  );
}

export default Lessons;