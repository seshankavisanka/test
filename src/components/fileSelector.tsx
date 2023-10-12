import Papa from "papaparse";
import React, { useEffect, useRef, useState } from "react";
import Button from "./button";

interface UploadFileProps {
  setParsedData?: React.Dispatch<React.SetStateAction<object[] | []>>;
  setStep?: React.Dispatch<React.SetStateAction<string>>;
}

function UploadFile(props: UploadFileProps) {
  const [selectedFiles, setFiles] = useState<File[] | []>([]);
  // console.log("Selected Files", selectedFiles);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    console.log("file", file);

    if (file) {
      // if the selected file type isn't "text/csv" return a alert
      if (!(file.type === "text/csv"))
        alert("Please select only vallid CSV files");
      setFiles([file]);
    }
  };

  // if file input is not empty, reset file input to user can select same file again
  if (fileInputRef.current) fileInputRef.current.value = "";

  const handleOnParsedData = () => {
    // passing file data to parse using Papa.parse
    Papa.parse(selectedFiles[0], {
      // first row of parsed data will be interpreted as field names
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<object[]>) => {
        console.log("Results Data: ", results.data);

        if (props.setParsedData) props.setParsedData(results.data);
      },
    });
  };

  const handleOnStep = () => {
    if (props.setStep) props.setStep("Step-2");
  };

  useEffect(() => {
    if (props.setParsedData) props.setParsedData([]);
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <div className="container text-center">
        <div className="row">
          <div className="col mt-3 mb-4">
            <h3 style={{ color: "darkblue" }}>CSV File Upload</h3>
          </div>
          <div className="col mt-3 mb-4">
            <Button
              className="btn btn-primary"
              onClick={() => fileInputRef.current?.click()}
              iconClassName={"fa fa-file"}
              children={"  Choose File"}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <input
              type="file"
              accept=".csv" // define the file type
              // multiple // allow selecting multiple files
              ref={fileInputRef}
              onChange={handleOnChange}
              style={{ display: "none" }}
            />
            {selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => (
                <li key={index} style={{ listStyleType: "none" }}>
                  <Button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleOnParsedData();
                    }}
                    children={file.name}
                  />
                </li>
              ))
            ) : (
              <p style={{ color: "red" }}>No files selected</p>
            )}
          </div>
          <div className="col">
            <Button
              className="btn btn-outline-info"
              onClick={() => {
                handleOnParsedData();
              }}
              disabled={selectedFiles.length === 0}
              children={"Preview"}
            />
          </div>
          <div className="col">
            <Button
              className="btn btn-outline-success"
              onClick={() => {
                handleOnParsedData();
                handleOnStep();
              }}
              disabled={selectedFiles.length === 0}
              children={"Conform"}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UploadFile;
