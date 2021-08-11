import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import AddMeeting from "../../MeetingArea/AddMeeting/AddMeeting";
import Meetings from "../../MeetingArea/Meetings/Meetings";
import Home from "../Home/Home";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <h1 className="display-1 text-left">Developer Meeting</h1>
            </header>
                <nav className="btn btn-light">
                    <NavLink to="/home">Home</NavLink>
                    <span>  |  </span>
                    <NavLink to="/meetings">meetings</NavLink>
                    <span>  |  </span>
                    <NavLink to="/meetings/new">Add Meeting</NavLink>
                </nav>
                <Switch>
                    <Route path="/home" component={Home} exact />
                    <Route path="/meetings" component={Meetings} exact />
                    <Route path="/meetings/new" component={AddMeeting} exact />
                    <Redirect from="/" to="/home" exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
