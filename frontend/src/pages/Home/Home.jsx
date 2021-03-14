import React, { useEffect, useState } from 'react';
import useArray from '../../hooks/useArray';
import useEndpoint from '../../hooks/useEndpoint';
import RecordsProvider from '../../context/recordsContext';
import Header from '../../components/header/header';
import Records from '../../containers/Records/Records';
import StatsDetails from '../../containers/StatsDetails/StatsDetails';
import ConditionalRender from '../../components/conditionalRender/conditionalRender';
import Loading from '../../components/loading/loading';
import Error from '../../components/error/Error';
import { shuffleArray } from '../../global/utils';
import { API } from '../../global/endpoints';
import { METHOD } from '../../global/constants';

const Home = () => {
  const { value, setValue, removeByIndex } = useArray([]);
  const [showStats, setShowStats] = useState(false);

  const obj = {
    method: METHOD.GET,
    url: API.ALL_EVENTS,
  };
  const response = useEndpoint(obj);
  const { pending, error, complete } = response;

  useEffect(() => {
    if (response.data) {
      setValue(response.data.records);
    }
  }, [response]);

  const handleSetShowStats = showStats => {
    setShowStats(false);
    setShowStats(showStats)
  }

  const handleRemoveEvent = index => {
    setShowStats(false);
    removeByIndex(index);
  }

  const handleRandomShuffle = () => {
    setShowStats(false);
    const shuffledEvents = shuffleArray([...value]);
    setValue(shuffledEvents);
  }

  const showData = () => (
    <>
      <Header events={value} onToggleStats={handleSetShowStats} showStats={showStats} onRandomShuffle={handleRandomShuffle} />
      <RecordsProvider removeRecord={index => handleRemoveEvent(index)}>
        <Records records={value} />
      </RecordsProvider>
      <ConditionalRender shouldRender={showStats}>
        <StatsDetails events={value} />
      </ConditionalRender>
    </>
  )
  return (
    <div>
      <ConditionalRender shouldRender={pending}>
        <Loading />
      </ConditionalRender>
      <ConditionalRender shouldRender={error}>
        <Error />
      </ConditionalRender>
      <ConditionalRender shouldRender={complete && value.length > 0}>
        {showData()}
      </ConditionalRender>
    </div>
  );
};

export default Home;
