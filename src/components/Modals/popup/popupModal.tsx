import { writeFile } from "fs/promises";
import React, { CSSProperties } from "react";
import { GetTableValue } from "../../../App";
import Button from "../../button";
import "./popupModal.css";

interface PopupProps {
  tableValues: GetTableValue[];
  setOpenPopupModel?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Popup(props: PopupProps) {
  const fileSave = () => {
    // data which will write in a file
    let data = `Row no: ${props.tableValues[0]?.no}
    Facility code: ${props.tableValues[0]?.facilityCode}
    Legible key: ${props.tableValues[0]?.legibleKey}
    Card number: ${props.tableValues[0]?.cardNumber}
    Signature: ${props.tableValues[0]?.signature}`;

    console.log(data);

    const fs = window.require("fs");
    const path = window.require("path");

    fs.writeFile("./src/assert/text.txt", data, (error: Error) => {
      if (error) throw error;
      else if (props.setOpenSuccessModel) {
        props.setOpenSuccessModel(true);
        setTimeout(() => {
          if (props.setOpenSuccessModel) props.setOpenSuccessModel(false);
        }, 1000);
      }
    });
  };
  return (
    <React.Fragment>
      <div className="popupModalP">
        <div className="modalContainerP">
          <div className="title">
            <h1 style={{ color: "#00008B" }}>Batch Data</h1>
          </div>
          <div className="body">
            <table style={{ margin: 20, fontSize: 18 }}>
              <tbody>
                <tr>
                  <td>Row no:&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>{props.tableValues[0]?.no}</td>
                </tr>
                <tr>
                  <td>Facility code:&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>{props.tableValues[0]?.facilityCode}</td>
                </tr>
                <tr>
                  <td>Legible key:&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>{props.tableValues[0]?.legibleKey}</td>
                </tr>
                <tr>
                  <td>Card number:&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>{props.tableValues[0]?.cardNumber}</td>
                </tr>
                <tr>
                  <td>Signature:&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>{props.tableValues[0]?.signature}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="footer">
            <Button
              className="btn btn-success"
              onClick={() => {
                if (props.setOpenPopupModel) props.setOpenPopupModel(false);
                fileSave();
              }}
              children={"Write"}
              style={{ marginRight: 10 }}
            />
            <Button
              className="btn btn-danger"
              onClick={() => {
                if (props.setOpenPopupModel) props.setOpenPopupModel(false);
              }}
              children={"Cancel"}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Popup;
