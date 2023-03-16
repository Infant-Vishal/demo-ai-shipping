import React, { useEffect, useState } from "react";
import axios from "axios";

const ChartHOC = (Com, text) => {
  return function ChildComp(props) {
    const [data, setData] = useState();

    useEffect(() => {
      function fetchMyAPI() {
        axios
          .get("https://backend-ai-postgres.herokuapp.com/activeCards")
          .then(function (response) {

            setData(response.data.activeUser);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      fetchMyAPI();
    }, []);

    return <Com dashboardActiveUser={data} />;
  };
};

export default ChartHOC;