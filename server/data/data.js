// Getting info from thr data base

const init = (db) => {
    const getMissions = (page) => {
        return db.collection('finalproject-missions')
            .find()
            .toArray()
            .then((missions) => {
                const missionsLength = missions.length;
                const MissionsPerPage = 2;
                if (page) {
                    missions = missions.slice((page - 1) * MissionsPerPage, page * MissionsPerPage);
                }
                const result = {
                    missions: missions,
                    maxPage: Math.ceil(missionsLength / MissionsPerPage)
                };
                return Promise.resolve(missions);
            })
    };

    const getMissionById = (id) => {
        return db.collection('finalproject-missions')
            .findOne({ 'id': id })
            .then((mission) => {
                return Promise.resolve(mission);
            })
    };

    const data = { getMissions, getMissionById };

    return Promise.resolve(data);
}

module.exports = { init };