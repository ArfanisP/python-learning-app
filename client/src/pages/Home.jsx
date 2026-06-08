import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-hero">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="eyebrow">Interactive Python practice</span>
          <h1>Python Learning App</h1>
          <p className="lead text-secondary">
            Learn Python step by step with focused lessons, quick quizzes, and
            progress that follows your work.
          </p>
          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link className="btn btn-primary btn-lg" to="/lessons">
              Start learning
            </Link>
            <Link className="btn btn-outline-secondary btn-lg" to="/profile">
              View progress
            </Link>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="code-panel">
            <div className="code-panel-header">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre>{`for lesson in python_path:
    practice(lesson)
    quiz_score = check_understanding()

    if quiz_score >= 80:
        unlock_next_step()`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
