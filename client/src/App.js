import React from 'react';
import { Provider } from 'react-redux';

import Nav from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import New from './components/New/New'
import Edit from './components/Edit/Edit'
import Note from './components/Note/Note'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Content from './components/Content/Content'
import { Switch, Route } from 'react-router-dom';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Nav />
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/new" exact component={New} />
          <Route path="/note/:id" exact component={Note} />
          <Route path="/edit/:id" exact component={Edit} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        <Footer />
      </React.Fragment>
    </Provider>
  );
}

export default App;
