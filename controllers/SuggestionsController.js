const Suggestions = require("../models/Suggestions")

exports.index = async (req, res) => {
    const role = req.query.role
    const data = await Suggestions.findAll({
        where: {
            keyword: role
        }
    })
    res.status(200).json(data)
}