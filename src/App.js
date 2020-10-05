import React ,{useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";

function App({user}) {

  return (
    <div className="app">
      {!user ? (
       <Login></Login>
      ) : (
        <div>
         
        <div className="app__body">
        <Router>
        <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      <small className="logo">
        From <b>Salim Mammadov </b>
      </small>
      </div>
      )}
       
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.reducer,
  };
}
export default connect(mapStateToProps)(App);
