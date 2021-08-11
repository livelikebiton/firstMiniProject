const dal = require("../data-access-layer/dal");

async function getAllGroupsAsync () {
    const sql = `SELECT * FROM groups`;
    const categories = await dal.executeAsync(sql);
    return categories;
}

async function getAllMeetingsAsync (group) {
    const sql = `SELECT meetingId, groupName,DATE_FORMAT(meetingFrom,'%y-%m-%d %H:%i:%S') AS meetingFrom,DATE_FORMAT(meetingTo,'%y-%m-%d %H:%i:%S') meetingTo, description, meetingRoom FROM meetings JOIN groups
    ON groups.groupId = meetings.groupId WHERE groups.groupId = ${group}`;
    const meetings = await dal.executeAsync(sql);
    return meetings;
}

async function addMeetingAsync(meeting) {
    const sql = `INSERT INTO meetings VALUES(DEFAULT, ${meeting.groupId}, '${meeting.meetingFrom}','${meeting.meetingTo}', '${meeting.description}', '${meeting.meetingRoom}')`;
    const info = await dal.executeAsync(sql);
    meeting.meetingId = info.insertId;
    return meeting;
}

module.exports = {
    getAllGroupsAsync,
    getAllMeetingsAsync,
    addMeetingAsync
};