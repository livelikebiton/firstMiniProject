import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import GroupModel from "../../../Models/GroupModel";
import MeetingModel from "../../../Models/MeetingModel";
import "./AddMeeting.css";

function AddMeeting(): JSX.Element {
    const history = useHistory();
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const { register, handleSubmit } = useForm<MeetingModel>();

    useEffect(() => {
        axios.get<GroupModel[]>("http://localhost:3001/api/groups")
            .then(response => setGroups(response.data))
            .catch(err => console.log(err));
    }, []);

    async function send(meeting: MeetingModel) {
        try {
            const response = await axios.post<MeetingModel>("http://localhost:3001/api/meetings", meeting);
            const addedMeeting = response.data;
            alert("product has been added, ID:" + addedMeeting.meetingId);
            sessionStorage.setItem("groupId", meeting.groupId.toString());
            history.push("/meetings");        
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="AddMeeting">
			 <form onSubmit={handleSubmit(send)}>
                 <label>Group Id: </label>
                <select defaultValue="disabledOption" {...register("groupId", {required: true})}>
                    <option key="disabledOption" selected disabled>Select Category</option>
                    {groups.map(g => <option key={g.groupId} value={g.groupId}>{g.groupName}</option>)}
                </select>

                <label>From: </label>
                <input type="datetime-local" {...register("meetingFrom", {required: true})} />

                <label>To: </label>
                <input type="datetime-local" {...register("meetingTo", {required: true})} />

                <label>Description: </label>
                <input type="text" {...register("description", {required: true})} />
                
                <label>Meeting Room: </label>
                <input type="text" {...register("meetingRoom", {required: true})} />

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddMeeting;
