exports.allAcess = (req, res) => {
    res.status(200).send('public content.')
}

exports.userBoard = (req, res) => {
    res.status(200).send('user content.')
}

exports.adminBoard = (req, res) => {
    res.status(200).send('admin content.')
}

exports.moderatorBoard = (req, res) => {
    res.status(200).send('moderator content.')
}