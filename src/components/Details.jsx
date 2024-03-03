import React, { useState, useEffect, useMemo } from "react";

export default function Details(props) {
  const { url, dataId } = props;
  const [personDetails, setPersonDetails] = useState();
  const [isLoading, setLoading] = useState(false);

  const fetchData = useMemo(() => {
    const fetchPersonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${dataId}.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setPersonDetails(data);
      } catch (e) {
        console.log("Error fetching data:", e.message);
      } finally {
        setLoading(false);
      }
    };

    return fetchPersonDetails;
  }, [dataId, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <React.Fragment key="details-fragment">
      {isLoading && <p className="loading">Loading...</p>}
      {personDetails && (
        <div id={personDetails.id} className="details">
          <img alt="" src={personDetails.avatar} />
          <p className="name">{personDetails.name}</p>
          <p>City: {personDetails.details.city}</p>
          <p>Company: {personDetails.details.company}</p>
          <p>Position: {personDetails.details.position}</p>
        </div>
      )}
    </React.Fragment>
  );
}
