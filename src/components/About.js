import React from 'react';
import {connect} from 'react-redux';
import Stat from './Stat';

const About = ({mixes}) => (
  <div className="ph3 ph4-l pad-bottom">
    <div className="measure center lh-copy">
      <p className="mt0">
        Quizas.fm features the different types of jazz music all around the world.
      </p>
      <p className="mb4">
        Whether you’re into Classic Jazz, Jazz-Funk, Blues, or Soul Jazz…
        we have you covered!
      </p>

      <Stat statName="Featuring…" statNumber={mixes.length} statWord="mixes" />
      {/* play_count */}
      <Stat
        statName="Played…"
        statNumber={mixes.reduce((accum, current) => accum + current.play_count, 0)}
        statWord="times"
      />
      {/* audio_length */}
      <Stat
        statName="With…"
        statNumber={mixes.reduce((accum, current) => accum + current.audio_length, 0)}
        statWord="seconds"
      />
    </div>
  </div>
);

// here we connect our component to the redux state
// we pass it our entire state and all of our actions
// this is a higher order component (a wrapper component)
// that provides our About component with all our data
export default connect(state => state)(About);
