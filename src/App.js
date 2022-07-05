import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthContext from "./store/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navbar/Navbar";
import { theme } from "./themes/Core";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import AddUser from "./Pages/Users/AddUser";
import ContactChat from "./Pages/Users/ContactChat/ContactChat";
import SocketProvider from "./store/SocketProvider";
import "./App.css";

function App() {
  const authCtx = useContext(AuthContext);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={authCtx.token ? Home : Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/add-user" component={AddUser} />
              <Route exact path="/contact/:id" component={ContactChat} />
            </Switch>
          </div>
        </ThemeProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
