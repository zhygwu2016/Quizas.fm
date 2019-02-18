/*global Mixcloud*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class Player extends Component {
  // every time the props change we can get access to them here
  componentWillReceiveProps(nextProps) {
    // when our widget is not ready, we return
    // and ignore all the actions below
    if (!nextProps.widgetReady) {
      return;
    }

    // if there is a new mix in the props
    if (nextProps.currentMix !== this.props.currentMix) {
      // console.log('new mix!', nextProps.currentMix);
      // if there is a new mix in the props, start playing the mix
      this.widget.load(nextProps.currentMix, true);
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay();
    }
  }

  mountAudio = async () => {
    const {playMix, setWidgetReady} = this.props;
    // when we use the this keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for our widget to be ready before continuing
    await this.widget.ready;

    // here we set our widget state to be ready in redux so
    // we can block anything from happening before it's ready
    setWidgetReady(true);

    // using the mixcloud widget events we can detect when our
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      playMix({
        playing: false,
        fromMixcloud: true
      })
    );
    // audio is playing again, set playing state to true
    this.widget.events.play.on(() =>
      playMix({
        playing: true,
        fromMixcloud: true
      })
    );
  };

  componentDidMount() {
    // when our app component is all loaded onto the page
    // our componentDidMount gets called and we can be sure
    // everything is ready, so we then run our mountAudio() method
    this.mountAudio();
  }

  actions = {
    // we group our methods together inside of an object called actions
    togglePlay: () => {
      // we want to togglePlay() on our widget
      this.widget.togglePlay();
    },

    playMix: mixName => {
      // if the mixname is the same as the currently playing mix,
      // we want to pause it instead
      // const currentMix = this.state.currentMix;
      const {currentMix} = this.state;
      if(mixName === currentMix){
        // when our code see return statement, it will stop running here and exit
        return this.widget.togglePlay();
      }

      // update the currentMix in our state with the mixName
      this.setState({
        currentMix: mixName
      });
      // load a new mix by its name and then start playing it immediately
      /* https://www.mixcloud.com/developers/widget/#methods
        Methods 第一项：
        load(cloudcastKey, startPlaying):
        Load a new upload by key (e.g. /spartacus/lambiance/).
        Pass in startPlaying=true to start playing once loaded.
        Returns a promise that is resolved once the new upload has loaded. */
      this.widget.load(mixName, true);
    }
  };

  render () {
    return (
      <iframe
        width="100%"
        height="60"
        //src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FSvitloConcert%2Fnat-king-cole-night-%D0%BE%D1%82-svitlo-concert%2F"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Femersonlopes%2Fsua-majestade-nat-king-cole%2F"
        frameBorder="0"
        className="db fixed bottom-0 z-5"
        // this allows us to get the actual html element inside react
        ref={ player => { this.player = player; }}
      />
    );
  }
}


export default connect(state => state, actions)(Player);
