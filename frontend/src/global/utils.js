// checks if array is sorted
// returns the array (while sorting it if needed)
export const sortGuard = (arr, prop) => checkIfArrayIsSorted(arr, prop) ? arr : sortArrayByProperty([...arr], prop);

// sorts an array of numbers by a given property 
// (todo: if the data isn't sorted, find the best algorithm for sorting out the data)
export const sortArrayByProperty = (arr, prop) => arr.sort((a, b) => a[prop] - b[prop]);

// boolean value based if an array if sorted or not by a given property
export const checkIfArrayIsSorted = (arr, prop) => {
    const arrLength = arr.length;
    let sorted = true;
    for (let index = 0; index < arrLength; index++) {
        const currentElement = arr[index];
        const nextElement = arr[index + 1];

        if (index !== arrLength - 1 && currentElement[prop] > nextElement[prop]) {
            sorted = false;
            break;
        }
    }
    return sorted;
}

// ms to readable time conversion
export const msToTime = duration => {

    const units = [
        {
            unitType: "h",
            unitInMs: 3600000
        },
        {
            unitType: "m",
            unitInMs: 60000
        },
        {
            unitType: "s",
            unitInMs: 1000
        },
        {
            unitType: "ms",
            unitInMs: 1
        }
    ];

    const timeInArray = units.reduce((portions, el) => {
        const currentUnit = Math.trunc(duration / el.unitInMs);
        if (currentUnit > 0) {
            portions.push(`${currentUnit}${el.unitType}`);
            duration = duration - (currentUnit * el.unitInMs);
        }
        return portions;
    }, []);

    return timeInArray.join(' ');
}


export const timestampToReadableDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


