import React, { useEffect, useState } from "react";
import { GetTableValue } from "../App";

interface FileProps {
  setStep?: React.Dispatch<React.SetStateAction<string>>;
  parsedData?: object[];
  search?: string;
  setTableValues?: React.Dispatch<React.SetStateAction<GetTableValue[]>>;
  setOpenPopupModel?: React.Dispatch<React.SetStateAction<boolean>>;
  success?: boolean;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

function FileView(props: FileProps) {
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [rowValues, setRowValues] = useState<string[][]>([]);

  const columnNamesArray: string[][] = [];
  const valuesArray: string[][] = [];

  useEffect(() => {
    props.parsedData?.map((data: object) => {
      columnNamesArray.push(Object.keys(data));
      valuesArray.push([...Object.values(data), false]);
    });

    setColumnNames(columnNamesArray[0]);
    setRowValues(valuesArray);
  }, [props.parsedData, props]);

  const handleOnGetTableValue = (value: string[]) => {
    if (props.setTableValues && props.setOpenPopupModel && props.setSuccess) {
      // assuming value of selected table row
      const values: GetTableValue = {
        no: value[0],
        legibleKey: value[1],
        facilityCode: value[2],
        cardNumber: value[3],
        signature: value[4],
      };

      console.log(value[6]);

      // adding the state with the new values
      props.setTableValues([values]);

      props.setSuccess(true);
      props.setOpenPopupModel(true);
    }
  };

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div style={{ maxHeight: "600px", overflow: "scroll" }}>
          {columnNames && rowValues ? (
            <table className="table table-striped table-hover">
              <thead style={{ position: "sticky", top: "0px", zIndex: 1 }}>
                <tr>
                  {columnNames?.map((rows, index) => {
                    return <th key={index}>{rows}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rowValues
                  ?.filter((values) => {
                    if (props.search) return values[1].includes(props.search);
                    return values;
                  })
                  .map((value, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          if (!value[6]) handleOnGetTableValue(value);
                        }}
                      >
                        {value.map((val, i) => {
                          return <td key={i}>{val}</td>;
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default FileView;
