export const WelcomeTemplate = ({
  userName,
}: {
  userName: string;
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Euphonia</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600&display=swap");

      :root {
        --primary-color: #8a2be2;
        --secondary-color: #9370db;
        --accent-color: #e6e6fa;
        --text-color: #333;
        --light-text: #fff;
      }

      body,
      html {
        margin: 0;
        padding: 0;
        font-family: "Quicksand", sans-serif;
        background-color: #f0f0f0;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
      }

      .container {
        background: var(--light-text);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0 50px rgba(138, 43, 226, 0.2);
        max-width: 800px;
        width: 90%;
      }

      .header {
        background: linear-gradient(
          135deg,
          var(--primary-color) 0%,
          var(--secondary-color) 100%
        );
        color: var(--light-text);
        padding: 40px;
        text-align: center;
      }

      h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
      }

      .tagline {
        font-size: 1.2em;
        opacity: 0.9;
      }

      .content {
        padding: 40px;
      }

      .welcome-message {
        font-size: 1.1em;
        line-height: 1.6;
        margin-bottom: 30px;
        text-align: center;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      .feature-item {
        background: var(--accent-color);
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .feature-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(138, 43, 226, 0.2);
      }

      .feature-icon {
        font-size: 2.5em;
        margin-bottom: 10px;
        color: var(--primary-color);
      }

      .feature-title {
        font-weight: 600;
        margin-bottom: 5px;
      }

      .feature-description {
        font-size: 0.9em;
        color: #666;
      }

      .cta-section {
        text-align: center;
        margin-top: 40px;
      }

      .cta-button {
        background: linear-gradient(
          45deg,
          var(--primary-color),
          var(--secondary-color)
        );
        color: var(--light-text);
        border: none;
        padding: 15px 30px;
        font-size: 1.2em;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-decoration: none;
        display: inline-block;
      }

      .cta-button:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
      }

      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      .floating {
        animation: float 3s ease-in-out infinite;
      }

      @media (max-width: 600px) {
        .header,
        .content {
          padding: 20px;
        }
        .feature-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1 class="floating">Welcome to Euphonia</h1>
        <p class="tagline">Your Journey to Mental Wellness Begins Here</p>
      </header>
      <div class="content">
        <p class="welcome-message">
          Hello, ${userName}! We're thrilled to have you join our community of
          mindful individuals. Euphonia is your personal guide on the path
          to better mental health and well-being.
        </p>

        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">🧠</div>
            <h3 class="feature-title">AI Therapy Sessions</h3>
            <p class="feature-description">
              Personalized therapy sessions powered by advanced AI
            </p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h3 class="feature-title">Mood Tracking</h3>
            <p class="feature-description">
              Monitor and analyze your emotional patterns
            </p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🧘</div>
            <h3 class="feature-title">Guided Meditations</h3>
            <p class="feature-description">
              Curated mindfulness exercises for inner peace
            </p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">Goal Setting</h3>
            <p class="feature-description">
              Set and track personal growth objectives
            </p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">Resource Library</h3>
            <p class="feature-description">
              Access a wealth of mental health resources
            </p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💬</div>
            <h3 class="feature-title">24/7 Support</h3>
            <p class="feature-description">
              Round-the-clock AI assistance whenever you need it
            </p>
          </div>
        </div>

        <p class="welcome-message">
          Your AI therapist is ready to listen, support, and guide you on your
          journey to mental wellness. Let's embark on this transformative
          experience together!
        </p>

        <div class="cta-section">
          <a href="#" class="cta-button">Begin Your Wellness Journey</a>
        </div>
      </div>
    </div>
  </body>
</html>`;

export const SubscriptionTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f5f7fa;
      color: #333333;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #4342B9;
      color: #ffffff;
      text-align: center;
      padding: 24px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .body {
      padding: 20px;
      text-align: center;
    }

    .body h2 {
      color: #4342B9;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .body p {
      line-height: 1.6;
      margin: 10px 0;
    }

    .footer {
      background-color: #f0f0f5;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666666;
    }

    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #4342B9;
      text-decoration: none;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #333393;
    }

    .logo {
      width: 100px;
      margin: 0 auto 20px;
    }

    .divider {
      border-top: 1px solid #eaeaea;
      margin: 20px 0;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Euphonia</h1>
    </div>
    <div class="body">
      <h2>Subscription Confirmed!</h2>
      <p>Thank you for subscribing to Euphonia. We’re thrilled to have you on board!</p>
      <p>You can now enjoy all the features of your plan to enhance your well-being and explore our AI-powered therapy tools.</p>
      <a href="https://euphonia.me/main" class="button">Go to Your Dashboard</a>
      <div class="divider"></div>
      <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@euphonia.me">support@euphonia.me</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Euphonia. All rights reserved.</p>
    </div>
  </div>
</body>

</html>
`;
