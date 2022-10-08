const Suggestions = require("../models/Suggestions")

exports.index = async (req, res) => {
    const data = await Suggestions.findAll({})
    res.status(200).json(data)
}