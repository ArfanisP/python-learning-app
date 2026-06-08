import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const getPdfUrl = (lesson) => {
  const possibleUrl = lesson.pdfUrl || lesson.pdf || lesson.content;

  if (
    typeof possibleUrl === "string" &&
    possibleUrl.toLowerCase().includes(".pdf")
  ) {
    return possibleUrl;
  }

  return "";
};

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
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

  const selectedLesson =
    lessons.find((lesson) => lesson._id === selectedLessonId) ||
    lessons.find((lesson) => getPdfUrl(lesson));

  const selectedPdfUrl = selectedLesson
    ? getPdfUrl(selectedLesson)
    : "";

  return (
    <div>
      <div className="page-heading">
        <span className="eyebrow">Course library</span>
        <h1>Python Lessons</h1>
        <p className="text-secondary">
          Pick a lesson, test your understanding, and keep your progress moving.
        </p>
      </div>

      <section className="learning-section">
        <div className="section-heading">
          <span className="eyebrow">Study material</span>
          <h2>Lessons</h2>
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
                    className="btn btn-outline-primary mt-4"
                    disabled={!getPdfUrl(lesson)}
                    onClick={() => setSelectedLessonId(lesson._id)}
                    type="button"
                  >
                    View PDF
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {selectedPdfUrl && (
          <div className="pdf-viewer mt-4">
            <div className="pdf-viewer-header">
              <div>
                <span className="eyebrow">Now viewing</span>
                <h3>{selectedLesson.title}</h3>
              </div>
              <a
                className="btn btn-sm btn-outline-secondary"
                href={selectedPdfUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open PDF
              </a>
            </div>

            <iframe
              src={selectedPdfUrl}
              title={`${selectedLesson.title} PDF`}
            />
          </div>
        )}
      </section>

      <section className="learning-section">
        <div className="section-heading">
          <span className="eyebrow">Practice tests</span>
          <h2>Quiz</h2>
        </div>

        <div className="row g-4">
          {lessons.map((lesson) => (
            <div className="col-md-6 col-xl-4" key={lesson._id}>
              <article className="card lesson-card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
                    <h3 className="h4 card-title mb-0">{lesson.title}</h3>
                    <span className="badge text-bg-light">
                      {lesson.difficulty}
                    </span>
                  </div>

                  <p className="card-text text-secondary flex-grow-1">
                    Test your understanding of this lesson and save your best
                    score.
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
      </section>

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
