import React, { useState, useEffect } from "react";
import { Folder } from "./components/folder/Folder";
import axios from "./axios";

import "./app.module.css";

export const App = () => {
  const [rootDir, setRootDir] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/")
      .then((data) => {
        setRootDir(data.data.children);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something wrong</div>;
  }

  return (
    <>
      <div>Digital Habits. Entrance test</div>
      {rootDir.map((item) => (
        <Folder key={item.id} title={item.title} id={item.id} />
      ))}
    </>
  );
};
