import React, { Fragment, useEffect } from "react";
import queryString from "query-string";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { ThemeProvider, Container } from "@material-ui/core";
import theme from "./Theme";
import Landing from "./components/layouts/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layouts/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import CustomSnackbar from "./utils/CustomSnackbar";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/auth/action";

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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC<any> = props => {
  useEffect(() => {
    const query = queryString.parse(props.location?.search);
    if (query.token) {
      window.localStorage.setItem("token", query.token.toString());
      props.history.push("/");
    }

    store.dispatch<any>(loadUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Container style={{ minHeight: "100vh" }} maxWidth="lg">
              <Navbar sections={sections} title="Blogsia" />
              <main>
                <Route path="/" exact={true} component={Landing} />
                <CustomSnackbar />
                <Switch>
                  <Route path="/login" exact={true} component={Login} />
                  <Route path="/register" exact={true} component={Register} />
                </Switch>
              </main>
            </Container>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
