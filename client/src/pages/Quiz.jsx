import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getQuizByLesson,
} from "../services/quizService";

import {
  saveProgress,
} from "../services/progressService";

function Quiz() {
  const { lessonId } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data =
          await getQuizByLesson(
            lessonId
          );

        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [lessonId]);

  const selectAnswer = (
    questionId,
    answer
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitQuiz = async () => {
    let score = 0;

    questions.forEach((q) => {
      if (
        answers[q._id] ===
        q.correctAnswer
      ) {
        score += 100;
      }
    });

    const finalScore =
      questions.length > 0
        ? score / questions.length
        : 0;

    try {
      const progress = await saveProgress(
        lessonId,
        finalScore,
        true
      );

      const scoreMessage =
        progress.isBestScore
          ? `Quiz completed! New best score: ${finalScore}`
          : `Quiz completed! Score: ${finalScore}. Your best score is still ${progress.score}`;

      alert(scoreMessage);

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <span className="eyebrow">Knowledge check</span>
        <h1>Quiz</h1>
        <p className="text-secondary">
          Choose the best answer for each question, then submit your score.
        </p>
      </div>

      <div className="quiz-stack">
        {questions.map((q, index) => (
          <section className="card quiz-card" key={q._id}>
            <div className="card-body">
              <div className="d-flex align-items-start gap-3 mb-3">
                <span className="question-number">{index + 1}</span>
                <h2 className="h4 mb-0">{q.question}</h2>
              </div>

              <div className="answer-grid">
                {q.options.map((option) => {
                  const selected = answers[q._id] === option;

                  return (
                <button
                      className={`answer-option ${selected ? "selected" : ""}`}
                      key={option}
                      onClick={() => selectAnswer(q._id, option)}
                      type="button"
                >
                  {option}
                </button>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="empty-state">
          <h2>No quiz questions found</h2>
          <p className="text-secondary">
            Questions will appear here once this lesson has a quiz.
          </p>
        </div>
      )}

      {questions.length > 0 && (
        <button
          className="btn btn-primary btn-lg mt-4"
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default Quiz;
