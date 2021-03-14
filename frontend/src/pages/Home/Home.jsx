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
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

const Home = () => {
  const { value, setValue, removeByIndex } = useArray([]);
  const [showStats, setShowStats] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [eventIndex, setEventIndex] = useState("");
  const [editMode, setEditMode] = useState(false);

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

  const handleEditEvent = index => {
    const clonedEl = JSON.parse(JSON.stringify(value[index]));
    setEventIndex(index);
    setInputVal(clonedEl.event.type);
    setEditMode(true);
  }

  const handleEditChange = e => {
    setInputVal(e.target.value);
  }

  const handleUpdateClick = () => {
    const clonedValue = [...value];
    clonedValue[eventIndex].event.type = inputVal;
    setValue(value);
    resetFields();
  }

  const handleRandomShuffle = () => {
    resetFields();
    const shuffledEvents = shuffleArray([...value]);
    setValue(shuffledEvents);
  }

  const resetFields = () => {
    setShowStats(false);
    setEditMode(false);
    setEventIndex("");
    setEventIndex(null);
  }

  const showData = () => (
    <>
      <Header events={value} onToggleStats={handleSetShowStats} showStats={showStats} onRandomShuffle={handleRandomShuffle} />
      <RecordsProvider removeRecord={index => handleRemoveEvent(index)} editRecord={index => handleEditEvent(index)}>
        <Records records={value} />
      </RecordsProvider>
      <ConditionalRender shouldRender={editMode}>
        <Input type="text" value={inputVal} onChange={(e) => handleEditChange(e)} />
        <Button onClick={handleUpdateClick} disabled={false} secondary>
          Save
         </Button>
      </ConditionalRender>
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
