import React, { useState } from "react";


//make sure this doesnt push to main

export default function SearchBar({getActivitySearch}) {
  const [activityFormState, setActivityFormState] = useState('');

  
  function handleChange(e) {
    console.log(e.target.value)
    setActivityFormState(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    getActivitySearch(activityFormState);
    setActivityFormState('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search Activity" value={activityFormState} onChange={handleChange} name="activity"/>
    </form>
  );
}
