export default function ActivityInfo({ activity }) {
  return (
    <div>
      <h1>Designation:{activity.designation}</h1>
      <h2>Fullname: {activity.fullName} </h2>
      <h2>Name: {activity.name} </h2>
      <h3>Parkcode: {activity.parkCode}</h3>
      <h4>URL: <a href={activity.url}>{activity.url}</a></h4>
    </div>
  );
}
