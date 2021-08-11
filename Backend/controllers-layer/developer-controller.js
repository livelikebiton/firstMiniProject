const express = require("express");
const logic =require("../business-logic-layer/developer-logic");
const router = express.Router();


router.get("/groups", async (request, response) => {
    try {
        const groups = await logic.getAllGroupsAsync();
        response.json(groups);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

router.get("/meetings/:id",async (request, response)=> {
    try {
        const id = +request.params.id;
        const whichGroup = await logic.getAllMeetingsAsync(id);
        if (!whichGroup) return response.status(404).send(`groups ${id} is not found.`);
        response.json(whichGroup);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

router.post("/meetings", async (request, response) => {
    try {
        const meeting = request.body;
        const addedMeeting = await logic.addMeetingAsync(meeting);
        response.status(201).json(addedMeeting);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

module.exports = router;