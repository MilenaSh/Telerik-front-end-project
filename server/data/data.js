// Getting info from thr data base

const init = (db) => {
    const getMissionById = (id) => {
        return db.collection('missions')
            .findOne({ 'id': id })
            .then((mission) => {
                return Promise.resolve(mission);
            })
    };

    const data = { getMissionById };

    Promise.resolve(data);
}

module.exports = { init };
