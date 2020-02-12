import React, { Fragment, useEffect, FC } from "react";
import queryString from "query-string";
import "./App.css";
import { ThemeProvider, Container } from "@material-ui/core";
import theme from "./Theme";
import {
  BrowserRouter as Router,
  Route as DefaultRoute,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/auth/action";
import Navbar from "./container/layouts/Navbar";
import Footer from "./container/layouts/Footer";
import Landing from "./container/layouts/Landing";
import Dashboard from "./container/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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

const DefaultLayout: FC<any> = ({ children }) => {
  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }} maxWidth="lg">
        <Navbar sections={sections} title="Blogsia" />
        <main>{children}</main>
      </Container>
      <Footer />
    </Fragment>
  );
};

const DashboardLayout: FC<any> = ({ children }) => (
  <Fragment>{children}</Fragment>
);

const Route: FC<any> = ({
  component: Component,
  layout: Layout = DefaultLayout,
  ...rest
}) => {
  return (
    <DefaultRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC<any> = props => {
  useEffect(() => {
    const query = queryString.parse(props.location?.search);
    console.log(query);
    if (query.token) {
      localStorage.setItem("token", query.token.toString());
      props.history.push("/");
    }

    store.dispatch<any>(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              path="/dashboard"
              component={Dashboard}
              layout={DashboardLayout}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
