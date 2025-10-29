import './App.css'
import WordleScreen from "./module/wordle/wordle-screen/wordle-screen.jsx";
import Header from "./framework/elements/core/Header.jsx";
import { AppPropertiesProvider } from "./framework/jsx/app-properties.jsx";

function App() {
  return (
      <>
        <AppPropertiesProvider>
          <Header />
          <WordleScreen />
        </AppPropertiesProvider>
      </>
  );
}

export default App
