import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import PostItem from "./components/pages/PostItem";
import ProductList from "./components/pages/ProductList";
import ClaimWarranty from "./components/pages/ClaimWarranty";
import Install from "./components/Install";

import "react-toastify/dist/ReactToastify.css";

function App() {
  if (!window.ethereum) {
    return <Install />;
  } else {
    return (
      <>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/seller" component={PostItem} />
              <Route path="/products" exact component={ProductList} />
              <Route path="/claim" component={ClaimWarranty} />
            </Switch>
          </div>
          <ToastContainer />
        </Router>
      </>
    );
  }
}

export default App;
