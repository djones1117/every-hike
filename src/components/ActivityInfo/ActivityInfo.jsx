export default function ActivityInfo({ activity }) {
  const textColorStyle = { color: "yellow" }; // Change 'blue' to the desired color

  return (
    <div>
      <h1 style={textColorStyle}>Designation: {activity.designation}</h1>
      <h2 style={textColorStyle}>Fullname: {activity.fullName}</h2>
      <h2 style={textColorStyle}>Name: {activity.name}</h2>
      <h3 style={textColorStyle}>Parkcode: {activity.parkCode}</h3>
      <h4 style={textColorStyle}>
        URL:{" "}
        <a href={activity.url} style={textColorStyle}>
          {activity.url}
        </a>
      </h4>
    </div>
  );
}
