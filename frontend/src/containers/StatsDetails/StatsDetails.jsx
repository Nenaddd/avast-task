import React, { useState, useEffect } from 'react';
import { Text } from '../../components/text/text';
import { names } from '../../global/constants';
import { sortGuard, msToTime } from '../../global/utils';
import styles from './styles.module.scss';

const StatsDetails = ({ events }) => {

    const [stats, setStats] = useState({});
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        createStats(events);
    }, []);


    const createStats = events => {

        // guard if there is only a single event
        if (!events[1]) {
            setShowErrorMessage(true);
            return;
        }
        // sort the array by time
        // in case it hasn't been sorted
        const { time } = names;
        const eventsArray = sortGuard(events, time);

        const statsData = {
            eventTypes: {},
            minDelay: events[1].time - events[0].time,
            maxDelay: events[1].time - events[0].time,
            meanDelay: 0,
            longestSequence: 0,
            currentLongest: 0,
            totalTime: 0,
        }

        const stats = eventsArray.reduce(reducer, statsData);
        stats.minDelay = msToTime(stats.minDelay);
        stats.maxDelay = msToTime(stats.maxDelay);
        stats.meanDelay = msToTime(stats.totalTime / events.length);
        stats.totalTime = msToTime(stats.totalTime);
        // we no longer need this property
        delete stats.currentLongest;
        setStats(stats);

    }

    const reducer = (obj, el, i, arr) => {
        // counts of different event types
        obj.eventTypes[el.event.type] = (obj.eventTypes[el.event.type] || 0) + 1;
        // min/max/total time in ms
        obj = getAllDelaysAndTotalInMs(arr, i, el, { ...obj });
        // longest sequence
        const { current, longest } = getLongestSequence(el.event.type, obj.currentLongest, obj.longestSequence);
        obj.currentLongest = current;
        obj.longestSequence = longest;
        return obj;
    }

    const getLongestSequence = (type, current, longest) => {
        const data = {
            current,
            longest
        }
        // refactor to data driven (more generic) in case we want to filter
        // by other properties instead of just "focus"
        switch (type) {
            case names.input:
                data.current += 1;
                break;
            case names.focus:
                return data;
            default:
                data.longest = data.current > data.longest ? data.current : data.longest;
                data.current = 0;
        }

        return data;
    }

    const getAllDelaysAndTotalInMs = (arr, i, currentEl, obj) => {
        const nextElement = arr[i + 1];

        if (nextElement) {
            const delay = getDelay(nextElement.time, currentEl.time);
            obj.minDelay = delay < obj.minDelay ? delay : obj.minDelay;
            obj.maxDelay = delay > obj.maxDelay ? delay : obj.maxDelay;
            obj.totalTime += delay;
        }

        return obj;
    }

    const getDelay = (nextEl, currentEl) => nextEl - currentEl;

    const showStats = () => (
        <>
            <div className={styles.column}>
                {stats && stats.eventTypes && Object.keys(stats?.eventTypes).map((el) => <Text key={el}>Event type {el}: <Text semibold>{stats.eventTypes[el]}</Text></Text>)}
            </div>
            <div className={styles.column}>
                <Text>Longest sequence: <Text semibold>{stats.longestSequence}</Text></Text>
                <Text>Max delay: <Text semibold>{stats.maxDelay}</Text></Text>
                <Text>Mean delay: <Text semibold>{stats.meanDelay}</Text></Text>
                <Text>Min delay: <Text semibold>{stats.minDelay}</Text></Text>
                <Text>Total time: <Text semibold>{stats.totalTime}</Text></Text>
            </div>
        </>
    )

    return (
        <div className={styles.stats}>
            {showErrorMessage ? <div>Not enough data</div> : showStats()}
        </div>
    );
};

export default StatsDetails;
