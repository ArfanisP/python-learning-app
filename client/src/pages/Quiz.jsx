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
      await saveProgress(
        lessonId,
        finalScore,
        true
      );

      alert(
        `Quiz completed! Score: ${finalScore}`
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>

      {questions.map((q) => (
        <div
          key={q._id}
          style={{
            border:
              "1px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{q.question}</h3>

          {q.options.map(
            (option) => (
              <div key={option}>
                <button
                  onClick={() =>
                    selectAnswer(
                      q._id,
                      option
                    )
                  }
                >
                  {option}
                </button>
              </div>
            )
          )}
        </div>
      ))}

      {questions.length > 0 && (
        <button
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default Quiz;