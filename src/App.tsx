import { Router } from "@reach/router";
import { FC } from "react";
import Login from "./components/Login";
import { NotFound } from "./pages";

const App: FC = () => (
  <Router>
    <Login path="/" />
    <NotFound default />
  </Router>
);

export default App;
