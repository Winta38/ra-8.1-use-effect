import React, { useState, useEffect, useMemo } from "react";

export default function List(props) {
  const { url } = props;
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = useMemo(() => {
    const fetchUserList = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}users.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setUserList(data);
      } catch (e) {
        console.log("Error fetching data:", e.message);
      } finally {
        setLoading(false);
      }
    };

    return fetchUserList;
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = (id) => {
    props.onClickItem(id);
  };

  return (
    <React.Fragment key="list-fragment">
      {isLoading && <p className="loading">Loading...</p>}
      {userList.length > 0 ? (
        <ul>
          {userList.map((item) => (
            <li key={item.id} onClick={() => handleClick(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data to display.</p>
      )}
    </React.Fragment>
  );
}
