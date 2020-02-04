import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { ThemeProvider, Container } from "@material-ui/core";
import theme from "./Theme";
import Landing from "./components/layouts/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" }
];

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Container maxWidth="lg">
            <Navbar sections={sections} title="Blogsia" />
            <main>
              <Route path="/" exact={true} component={Landing} />
            </main>
          </Container>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

export default App;
