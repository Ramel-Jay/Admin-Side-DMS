const express = require('express');
const router = express.Router();
const { InKind } = require('../models');
const { validateToken } = require("../middleware/JWT");

router.get("/", validateToken,async (req, res) => {
    const listOfInKindPost = await InKind.findAll();
    res.json(listOfInKindPost);
});

router.get("/byId/:id", validateToken,async (req, res) => {
    const id = req.params.id;
    const inKindPost = await InKind.findByPk(id);
    res.json(inKindPost);
});

router.put("/approverequest", validateToken,async (req, res) => {
    const username = req.user.username;
    const { request = 1, id } = req.body;
    await InKind.update({request: request, username: username}, {where: {id: id}});
    res.json(request);
});

router.put("/disapproverequest", validateToken,async (req, res) => {
    const username = req.user.username;
    const { request = 0, id } = req.body;
    await InKind.update({request: request, username: username}, {where: {id: id}});
    res.json(request);
});

module.exports = router;