import React, { useEffect, useState } from "react";
import { File } from "../file/File";
import axios from "../../axios";
import cn from "classnames";
import "./folder.module.css";

export const Folder = ({ title, id }) => {
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    axios
      .get(`/?dirId=${id}`)
      .then((data) => {
        setData(data.data.children);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoaded]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something wrong</div>;
  }

  function handleClick() {
    if (!data.length) {
      setIsLoaded(true);
    }
    setIsShown((prevState) => !prevState);
  }

  return (
    <div>
      <span
        className={cn("caret", { "caret-down": isShown })}
        onClick={handleClick}
      />
      <span className="folder">{title}</span>
      {isShown && (
        <div className="sub-folder">
          {data &&
            data.map((item) => {
              if (item.children) {
                return <Folder key={item.id} title={item.title} id={item.id} />;
              } else {
                return <File key={item.id} title={item.title} id={item.id} />;
              }
            })}
        </div>
      )}
    </div>
  );
};
