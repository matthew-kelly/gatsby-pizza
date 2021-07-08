import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return <div>CurrentlySlicing</div>;
}

function HotSlices({ hotSlices }) {
  return <div>HotSlices</div>;
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza in Town!</h1>
      <p>Open 11AM to 11PM Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
