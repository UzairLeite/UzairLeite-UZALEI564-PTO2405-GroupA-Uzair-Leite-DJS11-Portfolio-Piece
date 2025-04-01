import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './views/Home';
import { Genres } from './views/Genres'
import { Provider } from "./components/ui/provider"

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* add a route for a new page called genres and fetch genres and display on genre page */}
          <Route path="/genres" element={<Genres />} />
          {/* <Route path="contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
