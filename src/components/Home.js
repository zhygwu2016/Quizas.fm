import React from 'react';
import {connect} from 'react-redux';
import Mix from './Mix';

const Home = ({mixes, ...props}) => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-l mb5">
    {/* here we loop through all of our mixes */}
    {/* we slice the array by starting at 0 and taking the first 6 */}
    {mixes.slice(0, 6).map(mix => (
      <div className="mix mb4">
        {/* our mix goes in here */}
        {/* here we just pass the props straight through */}
        {/* here we pass through an id for the mix to play with */}
        {/* <Mix {...props} {...mix} id={mix.key} /> */}
        <Mix {...props} {...mix} />
      </div>
    ))}

    {/* <div className="mix mb4">
      <Mix name="Ambient Treasures"
        id='/salvatore-muscat/ambient-treasures-vol1-towards-the-dream/'
        {...props} />
      </div>

      <div className="mix mb4">
      <Mix name="WavyWednesdays MIX 017"
        id='/djmattrichards/wavywednesdays-mix-017-quavo-djmattrichards/'
        {...props} />
    </div> */}

  </div>
);

export default connect(state => state)(Home);
