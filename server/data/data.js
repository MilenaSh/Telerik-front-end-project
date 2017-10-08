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

    const getPhotos = (page) => {
        return db.collection('finalproject-photos')
            .find()
            .toArray()
            .then((photos) => {
                const photosLength = photos.length;
                const PhotosPerPage = 15;
                if (page) {
                    photos = photos.slice((page - 1) * PhotosPerPage, page * PhotosPerPage);
                }
                const result = {
                    photos: photos,
                    maxPage: Math.ceil(photosLength / PhotosPerPage)
                };
                return Promise.resolve(photos);
            })
    };

    const getPhotoById = (id) => {
        return db.collection('finalproject-photos')
            .findOne({ 'id': id })
            .then((photo) => {
                return Promise.resolve(photo);
            })
    };

    const data = { getMissions, getMissionById, getPhotos, getPhotoById };

    return Promise.resolve(data);
}

module.exports = { init };