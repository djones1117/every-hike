import { Grid } from "semantic-ui-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import PageHeader from "../../components/Header/Header";
import { useState, useEffect } from "react";
import ActivityInfo from "../../components/ActivityInfo/ActivityInfo";

export default function ExplorePage({ handleLogout, user }) {
  const [searchTerm, setSearchTerm] = useState("hiking");
  const [activity, setActivity] = useState(null);

  function getActivitySearch(activityTitle) {
    setSearchTerm(activityTitle);
  }

  useEffect(() => {
    const npsUrl = `https://developer.nps.gov/api/v1/activities/parks?q=${searchTerm}&limit=1&api_key=QfgWVdHaVt0u8a5RF6Q96e47ieeueLpA7oBMpYLA`;

    async function getActivityInfo() {
      try {
        const apiResponse = await fetch(npsUrl);

        const data = await apiResponse.json();
        console.log(data);

        setActivity(data.data[0].parks[0]);
        
      } catch (err) {
        console.log(err, "error from api call");
      }
    }

    getActivityInfo();
  }, [searchTerm]);
  console.log(activity)
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <SearchBar getActivitySearch={getActivitySearch}/>
          <p>The user is searching for{searchTerm}</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        { activity ? <ActivityInfo activity={activity}/> : null}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
