const processFile = (err, data) => {
    if (err) return {err};
    return JSON.parse(data);
}

module.exports.processFile = processFile;