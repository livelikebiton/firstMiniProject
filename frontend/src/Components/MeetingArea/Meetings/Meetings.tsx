import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import GroupModel from "../../../Models/GroupModel";
import MeetingModel from "../../../Models/MeetingModel";
import "./Meetings.css";

function Meetings(): JSX.Element {
    const history = useHistory();
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [meetings, setMeetings] = useState<MeetingModel[]>([]);
    const { register, handleSubmit } = useForm<MeetingModel>();

    useEffect(() => {
        axios.get<GroupModel[]>("http://localhost:3001/api/groups")
            .then(response => {
                setGroups(response.data);
                if (sessionStorage.getItem("groupId")) {
                    const group = new GroupModel();
                    group.groupId = +sessionStorage.getItem("groupId");
                    send(group);
                }
            })
            .catch(err => console.log(err));
    }, []);

    async function send(group: GroupModel) {
        try {
            const id = group.groupId;
            const response = await axios.get<MeetingModel[]>(`http://localhost:3001/api/meetings/${id}`);
            setMeetings(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="Meetings">
            <h4>meetings</h4>

            <form onChange={handleSubmit(send)}>
                <select defaultValue="disabledOption" {...register("groupId")}>
                    <option key="disabledOption" selected disabled>Select Category</option>
                    {groups.map(g => <option selected={g.groupId === +sessionStorage.getItem("groupId")} key={g.groupId} value={g.groupId}>{g.groupName}</option>)}
                </select>
            </form>

			 {meetings.map(m => <div key={m.meetingId} className="meetingCard">
                <p><strong>{m.groupName}</strong> <br />
                From: {m.meetingFrom} <br />
                To: {m.meetingTo} <br />
                Description: {m.description} <br />
                Room: {m.meetingRoom}
            </p></div>)}
        </div>
    );
}

export default Meetings;
