import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { Home } from './views/Home';
import { ShowDetails } from './views/ShowDetails';
import { Provider } from "./components/ui/provider"
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [open, setOpen] = useState(false)

  return (
    <Provider>
      <BrowserRouter>
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Trigger asChild>
            <Button variant="outline" size="sm" style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 1000,
            }}>
              Menu
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Podcast</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Link to="/">Home</Link>
                  <br /><br />
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
