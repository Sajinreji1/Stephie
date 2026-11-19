
import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [page, setPage] = useState("welcome");
  const [selectedDate, setSelectedDate] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  const [noPosition, setNoPosition] = useState({
    top: "15%",
    left: "55%",
  });

  const today = new Date().toLocaleDateString("en-CA");

  // Name confirmation popup
  const handleNameClick = () => {
    if (!confirmed && !showPopup) {
      setShowPopup(true);
    }
  };

  // Confirm Stephie's name
  const confirmName = () => {
    setName("Stephie");
    setConfirmed(true);
    setShowPopup(false);
  };

  // Continue to movie page
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim()) {
      setPage("movies");
    }
  };

  // Move NO button
  const moveNoButton = () => {
    const top = Math.floor(Math.random() * 55) + 5;
    const left = Math.floor(Math.random() * 52) + 3;

    setNoPosition({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  // Confirm coffee date and send Telegram notification
  const confirmDate = async (e) => {
    e.preventDefault();

    if (!selectedDate) return;

    // Show thank-you page
    setPage("thankyou");
    setNotificationStatus("sending");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(
          "Telegram notification failed:",
          result.message || "Unknown error"
        );

        setNotificationStatus("failed");
      } else {
        console.log("Telegram notification sent successfully.");
        setNotificationStatus("sent");
      }
    } catch (error) {
      console.error("Could not send Telegram notification:", error);
      setNotificationStatus("failed");
    }
  };

  // Format selected date
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
            A LITTLE SOMETHING ABOUT YOU
          </p>

          <h1>
            Can I tell you
            <br />
            <span>something, Stephie?</span>
          </h1>

          <p className="description">
            I remember a few little things about you...
            and I thought they deserved a special mention. 💗
          </p>

          {/* Hindi movie */}
          <div className="movie-box">

            <p>🎬 YOUR FAVOURITE HINDI MOVIE</p>

            <h2>Kabhi Khushi Kabhie Gham</h2>

            <p className="movie-message">
              A story full of love, emotions and unforgettable
              moments. Maybe that's what makes it special to you.

              But if I could choose a favourite scene, it would
              simply be one where I get to see you smile. ❤️
            </p>

            {/* Hindi song player */}
            <div className="song-player">

              <p>🎧 A little music for you</p>

              <div className="song-name">
                Suraj Hua Maddham
              </div>

              <audio controls preload="none">
                <source
                  src="/music/Suraj Hua Maddham K3g 320 Kbps.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support audio.
              </audio>

              <p className="song-caption">
                A little melody from your favourite movie 💗
              </p>

            </div>

          </div>

          {/* Malayalam movie */}
          <div className="movie-box">

            <p>🎬 YOUR FAVOURITE MALAYALAM MOVIE</p>

            <h2>Om Shanti Oshana</h2>

            <p className="movie-message">
              A little craziness, unexpected moments and a
              beautiful kind of love.

              Just like Pooja didn’t hesitate to go after what
              her heart wanted (even if Giri took forever to
              catch on), I figured why wait around when I can
              just ask you out directly? 😉💗
            </p>

            {/* Malayalam song player */}
            <div className="song-player">

              <p>🎧 Another little favourite</p>

              <div className="song-name">
                Mounangal
              </div>

              <audio controls preload="none">
                <source
                  src="/music/Mounam Chorum Neram.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support audio.
              </audio>

              <p className="song-caption">
                Hope you enjoy this one too! 🌷
              </p>

            </div>

          </div>

          {/* Confession */}
          <div className="final-message">

            <h2>And here's my favourite part... 💗</h2>

            <p>
              Out of all the stories I've heard,
              I think getting to know yours
              would be my favourite.
            </p>

            <h3>Stay wonderful, Stephie! 🌷</h3>

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

          {notificationStatus === "sending" && (
            <p className="bottom-note">
              Sending a little notification... 💌
            </p>
          )}

          {notificationStatus === "sent" && (
            <p className="bottom-note">
              Notification delivered! 💗
            </p>
          )}

          {notificationStatus === "failed" && (
            <p className="bottom-note">
              Your date is saved on this page, but the notification
              could not be sent.
            </p>
          )}

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
