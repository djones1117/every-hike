import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment
      clearing
      className="sticky-header"
      style={{ backgroundColor: "grey", display: "flex", justifyContent: "space-between" }}
    >
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home" color="green"></Icon>
        </Link>
        <Link to="" onClick={handleLogout} style={{ color: "lightgreen" }}>
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
      <Header as="h2">
        <Link to="/explore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="search" color="green"></Icon>
        </Link>
      </Header>
      <Header as="h2">
        <Link to="/">
          <Icon name="home" color="green"></Icon>
        </Link>

      </Header>
    </Segment>
  );
}
