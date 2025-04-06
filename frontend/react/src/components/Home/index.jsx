// App.js
import React, { useState } from "react";
import "./styles.css";
import request from "../../utils/remote/axios";
import requestMethods from "../../utils/enums/request.methods";

const HomeComponent = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalSteps,setTotalSteps] = useState(0);
  const [totalDistance,setTotalDistance] = useState(0);
  const [totalMinutes,setTotalMinutes] = useState(0);
  const [loading,setLoading] = useState(false);


  const handleFilter = async() => {
   try {
    setLoading(true)
    console.log(startDate)
    console.log(endDate)
    const response = await request({
        method:requestMethods.POST,
        route:"api/v0.1/data",
        body:{
             "start_date":startDate,
            "end_date":endDate
        }
    })
    console.log(response)
    if(response.success){
        setTotalDistance(response.data.total_distance)
        setTotalMinutes(response.data.total_minutes)
        setTotalSteps(response.data.total_steps)
    }
    setLoading(false)
   } catch (error) {
    console.log(error)
   }
   
  };

  return (
    <div className="app">
      <div className="filter">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      {loading?<p>Please Wait...</p>:""}
      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Steps</h3>
          <p>{totalSteps}</p>
        </div>
        <div className="stat-box">
          <h3>Total Distance (km)</h3>
          <p>{totalDistance}</p>
        </div>
        <div className="stat-box">
          <h3>Total Minutes</h3>
          <p>{totalMinutes}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
