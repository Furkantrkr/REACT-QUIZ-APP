import appLogo from '../assets/quiz-logo.png';

export default function Header() {
  return (
    <header>
      <img src={appLogo} alt="Quiz application logo" />
      <h1>React Quiz</h1>
    </header>
  );
}
