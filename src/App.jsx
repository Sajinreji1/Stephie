
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [page, setPage] = useState("welcome");
  const [selectedDate, setSelectedDate] = useState("");

  const [noPosition, setNoPosition] = useState({
    top: "15%",
    left: "55%",
  });

  const today = new Date().toLocaleDateString("en-CA");

  const handleNameClick = () => {
    if (!confirmed && !showPopup) {
      setShowPopup(true);
    }
  };

  const confirmName = () => {
    setName("Stephie");
    setConfirmed(true);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      setPage("movies");
    }
  };

  const moveNoButton = () => {
    const top = Math.floor(Math.random() * 55) + 5;
    const left = Math.floor(Math.random() * 52) + 3;

    setNoPosition({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  const confirmDate = (e) => {
    e.preventDefault();

    if (selectedDate) {
      setPage("thankyou");
    }
  };

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "";

  return (
    <div className="website">

      {/* Floating hearts */}
      <div className="floating-hearts">
        💗　💕　💖　💗　💕
      </div>

      {/* PAGE 1: Welcome */}
      {page === "welcome" && (
        <div className="main-card welcome-card">

          <div className="heart-icon">💌</div>

          <p className="small-heading">
            A LITTLE SURPRISE FOR YOU
          </p>

          <h1 className="welcome-title">
            Hey there,
            <br />
            beautiful! 💗
          </h1>

          <p className="description">
            Before we begin, tell me your name.
            I have a feeling I already know it...
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleNameClick}
              required
            />

            <button
              type="submit"
              className="continue-btn"
            >
              Continue 💗
            </button>
          </form>

          <p className="bottom-note">
            Made with a little extra affection ✨
          </p>

        </div>
      )}

      {/* PAGE 2: Movie messages */}
      {page === "movies" && (
        <div className="message-card">

          <div className="heart-icon">🌷</div>

          <p className="small-heading">
            JUST FOR YOU, {name.toUpperCase()}
          </p>

          <h1>
            So, Stephie...
            <br />
            <span>Can I tell you something?</span>
          </h1>

          <div className="movie-box">

            <p>🎬 Your favourite Hindi movie</p>

            <h2>Kabhi Khushi Kabhie Gham</h2>

            <p className="movie-message">
              Maybe you love the grand romance,
              the family moments and all that drama.

              But honestly, a little romance with you
              would make an even better story. ❤️
            </p>

          </div>

          <div className="movie-box">

            <p>🎬 Your favourite Malayalam movie</p>

            <h2>Om Shanti Oshana</h2>

            <p className="movie-message">
              A little fun, a little madness,
              and a whole lot of feelings.

              Sounds like the kind of story I'd love
              to be part of with you. 😉
            </p>

          </div>

          <div className="final-message">

            <h2>One little confession... 💗</h2>

            <p>
              I don't know if I'm your favourite person,
              but you definitely have a special place
              in my thoughts.
            </p>

            <p>
              If life were a movie, I'd happily watch
              every scene as long as you're in it.
            </p>

            <h3>Stay cute, Stephie. ✨</h3>

            <p className="signature">
              Someone who thinks you're special ❤️
            </p>

          </div>

          <button
            className="continue-btn"
            onClick={() => setPage("question")}
          >
            One more thing... 💌
          </button>

        </div>
      )}

      {/* PAGE 3: YES or NO question */}
      {page === "question" && (
        <div className="main-card question-card">

          <div className="heart-icon">🥹</div>

          <p className="small-heading">
            A VERY IMPORTANT QUESTION
          </p>

          <h1>
            Can I ask
            <br />
            you something?
          </h1>

          <p className="description">
            Would you like to go on a little
            coffee date with me? ☕
          </p>

          <div className="answer-area">

            <button
              className="yes-btn"
              onClick={() => setPage("coffee")}
            >
              YES 💗
            </button>

            <button
              className="no-choice-btn moving-no"
              style={{
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              onClick={moveNoButton}
            >
              NO 🙈
            </button>

          </div>

          <p className="bottom-note">
            Hehe... I hope you choose wisely! 💕
          </p>

        </div>
      )}

      {/* PAGE 4: NO response */}
      {page === "noMessage" && (
        <div className="main-card">

          <div className="heart-icon">🥺</div>

          <p className="small-heading">
            A LITTLE MESSAGE FOR YOU
          </p>

          <h1>
            Aww, that's okay Stephie! 💗
          </h1>

          <p className="description">
            No pressure at all.

            I just thought it would be lovely
            to spend some time with you.

            Your smile is still worth
            a thousand coffees! ☕
          </p>

          <h2 className="sweet-ending">
            Take care, beautiful! 🌷
          </h2>

          <button
            className="continue-btn"
            onClick={() => setPage("question")}
          >
            Go back 💌
          </button>

        </div>
      )}

      {/* PAGE 5: Coffee invitation */}
      {page === "coffee" && (
        <div className="main-card coffee-card">

          <div className="heart-icon">☕</div>

          <p className="small-heading">
            NOW COMES THE REAL QUESTION
          </p>

          <h1>
            Coffee with me?
            <br />
            <span>Pretty please? 💗</span>
          </h1>

          <p className="description">
            I'd love to spend some time with you.

            Just coffee, conversations, laughter
            and a little bit of magic.
          </p>

          <form onSubmit={confirmDate}>

            <label
              className="date-label"
              htmlFor="coffee-date"
            >
              Pick a date for our coffee date ☕
            </label>

            <input
              id="coffee-date"
              className="date-input"
              type="date"
              min={today}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />

            <button
              type="submit"
              className="continue-btn"
            >
              Fix our date 💕
            </button>

          </form>

          <p className="bottom-note">
            I'll be looking forward to it! ✨
          </p>

        </div>
      )}

      {/* PAGE 6: Thank you */}
      {page === "thankyou" && (
        <div className="main-card thankyou-card">

          <div className="heart-icon">💖</div>

          <p className="small-heading">
            IT'S A DATE!
          </p>

          <h1>
            Thank you,
            <br />
            Stephie!
          </h1>

          <div className="date-confirmation">

            <p>Our coffee date is planned for ☕</p>

            <h2>{formattedDate}</h2>

          </div>

          <p className="description">
            Thank you for saying yes!

            You just made someone smile
            a little more today. 🥹
          </p>

          <h2 className="sweet-ending">
            Can't wait to see you! ❤️
          </h2>

          <p className="signature">
            Until our coffee date...
            take care, beautiful. 🌷
          </p>

        </div>
      )}

      {/* NAME CONFIRMATION POPUP */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup">

            <div className="popup-heart">🥹</div>

            <p className="small-heading">
              WAIT A SECOND!
            </p>

            <h2>
              I remember your name...
            </h2>

            <h1>
              Stephie, right? 💗
            </h1>

            <button
              onClick={confirmName}
              className="yes-btn"
            >
              YES 💗
            </button>

            <p className="popup-note">
              I knew I wouldn't forget you!
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
