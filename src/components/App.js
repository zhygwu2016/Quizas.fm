import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';
import Show from './Show';
import Player from './Player';

// we import our mix data
import mixesData from '../data/mixes';
import actions from '../store/actions';

class App extends Component {
  fetchMixes = async () => {
    // const {mixIds} = this.state;
    //console.log(mixIds);
    const {addMix} = this.props;
    // here we loop over our mix ids and fetch each other
    // mixIds.map(async id => {
    mixesData.map(async id => {
      try {
        // always remember await when using fetch in an async function
        const response = await fetch(
          // we add the id onto the end of our url as a dynamic segment
          `https://api.mixcloud.com${id}`
        );
        const data = await response.json();

        addMix(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  // https://github.com/superhi/marmalade-fm/blob/17665becad3032b99d258b7336b1708b438993ec/src/components/App.js#L29-L59
  // fetchMixes = async () => {
  //   const {mixIds} = this.state;
  //
  //   // we `reduce` over the mixes to make sure they're always returned in order,
  //   // if we used `map` here instead whichever mix came back from the api first
  //   // would be the one set first in the state
  //   const mixes = await mixIds.reduce(async (asyncMixes, id) => {
  //     try {
  //       // always remember to `await` when using fetch in an async function
  //       // we add the id onto the end of our url as a dynamic segment
  //       const response = await fetch(`https://api.mixcloud.com${id}`);
  //       const data = await response.json();
  //       // because this callback inside our `reduce` is an async function we need
  //       // to get our `mixes` back out of the promise before we can add the new mix,
  //       // we can do this by `await`ing them
  //       const mixes = await asyncMixes;
  //       // now we can add our `data` onto the end of all of the rest of the `mixes`
  //       // with an array spread
  //       return [...mixes, data];
  //     } catch (error) {
  //       console.log(error);
  //       return mixes;
  //     }
  //     // the initial value of `mixes` is an empty array wrapped in a promise.
  //     // this means that line 44 will work the first time through the `mixIds`
  //     // as well as every other time
  //   }, Promise.resolve([]));
  //
  //   // and finally set the `mixes` to our state
  //   this.setState({mixes});
  // };

  componentDidMount() {
    // when our app component is all loaded onto the page
    // our componentDidMount gets called and we can be sure
    this.fetchMixes();
  }

  render() {
    // this makes a variable from our first mix in the array
    // if the array is empty, we assign it a default value of an empty {} object
    //const [firstMix = {}] = this.state.mixes;
    //const [firstMix = {}] = this.props.mixes;
    return (
      // router wraps our whole page and lets us use react-Router
      // https://reacttraining.com/react-router/web/example/basic
      <Router>
        <div>
          {/* this div contians our page (excluding audio player) */}
          <div className="flex-l justify-end">
            {/* FeaturedMix (needs styling and updating) */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* Header (needs styling and updating)  */}
              <Header />
              {/* Routed page */}

              {/* here we pass our state and our actions down into the home component
              so that we can use them */}
              {/* <Route exact path="/" render={() => <Home {...this.state}
              {...this.actions} />} /> */}
              <Route exact path="/" component={Home} />
              {/* <Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />} /> */}
              <Route path="/archive" component={Archive} />
              {/* <Route path="/about" render={() => <About {...this.state} />} /> */}
              <Route path="/about" component={About} />

              <Route
                path="/show/:slug"
                // here we pass in the route params so that we can access the
                // url of the current show page
                component={Show}
              />

            </div>
          </div>

          {/* AudioPlayer */}
          <Player />
        </div>

      </Router>
    );
  }
}

export default connect(state => state, actions)(App);
