import React, { Suspense } from 'react';
import Contact from './views/Contact/Contact.js'
import {BrowserRouter,Switch,Route, Router} from 'react-router-dom';
import {Container} from '@material-ui/core';


import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import AboutUs from './components/elements/About/About';
import HomePage from './views/HomePage/HomePage.js'
import NavBar from "./components/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import PopMovieDetail from './views/PopMovieDetail/PopMovieDetail'
import SearchMovies from './views/SearchMovies/SearchMovies';
import NotFound from './components/elements/NotFound/NotFound';
const App = () => {

  return (
<BrowserRouter>
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/profile" exact component={UserProfile}/>
            <Route path="/aboutUs" exact component={AboutUs}/>
        {/* //     <Route path="/:movieId" component={Movie} exact /> */}
        <Route exact path="/search" component={SearchMovies} />
         <Route exact path="/movie/:movieId" component={PopMovieDetail} />
         <Route exact path="/contact" component={Contact} />
         <Route component={NotFound} />
      </Switch>
      <Footer/>
      </div>
    </Suspense>
    </BrowserRouter>
  );
};

export default App;

