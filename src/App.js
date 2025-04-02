import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './views/Home';
import { Genres } from './views/Genres';
import { ShowDetails } from './views/ShowDetails';
import { Provider } from "./components/ui/provider"

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
