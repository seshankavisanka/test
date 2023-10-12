import React, { useState } from "react";
import Button from "./button";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput(props: SearchProps) {
  const handleOnStep = () => {
    props.setStep("Step-1");
  };

  return (
    <React.Fragment>
      <div className="row g-4 align-items-center m-3">
        <div className="col-auto">
          <label
            className="col-form-label"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Legible Key
          </label>
        </div>
        <div className="col-auto">
          <input
            className="form-control"
            onChange={(even) => {
              props.setSearch(even.target.value);
            }}
            type="text"
            placeholder="legible key number"
            aria-label="default input example"
            style={{ width: 500, fontSize: "18px" }}
          ></input>
        </div>
        <div className="col-auto">
          <Button
            onClick={handleOnStep}
            className="btn btn-warning"
            children={"Reset"}
          />
        </div>
        <div className="col-auto">
          <Button className="btn btn-outline-danger" children={"Exit"} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchInput;
