import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthContext from "./store/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/Core";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import AddUser from "./Pages/Users/AddUser";
import ContactChat from "./Pages/Users/ContactChat/ContactChat";
import GroupDetails from "./components/modals/GroupDetails";
import VideoCall from "./Pages/Users/VideoCall/VideoCall";
import SocketContext from "./store/SocketContext";
import * as process from "process";
import "./App.css";

function App() {
  const authCtx = useContext(AuthContext);
  const socketCtx = useContext(SocketContext);

  // window.global = window;
  // window.process = process;
  // window.Buffer = [];

  const queryClient = new QueryClient();

  const { callAccepted, answerCall, call } = socketCtx;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={authCtx.token ? Home : Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/add-user" component={AddUser} />
            <Route exact path="/contact/:id" component={ContactChat} />
            <Route exact path="/group/details" component={GroupDetails} />
            <Route exact path="/video-call/:contactId" component={VideoCall} />
          </Switch>
          {call.isReceivingCall && !callAccepted && (
            <>
              <h2>{call.from} is calling</h2>
              <button onClick={answerCall}>Answer Call</button>
            </>
          )}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
