import React, { useState } from "react";
import UploadFile from "./components/fileSelector";
import FileView from "./components/tableView";
import "bootstrap/dist/css/bootstrap.css";
import SearchInput from "./components/searchInput";
import Popup from "./components/Modals/popup/popupModal";
import Success from "./components/Modals/success/successModal";

export type GetTableValue = {
  no: string;
  legibleKey: string;
  facilityCode: string;
  cardNumber: string;
  signature: string;
};

function App() {
  const [step, setStep] = useState("Step-1");

  // state to store parsed data
  const [parsedData, setParsedData] = useState<object[] | []>([]);
  // state to store return value on search input
  const [search, setSearch] = useState<string>("");
  // state to store table values
  const [tableValues, setTableValues] = useState<GetTableValue[]>([]);
  const [openPopupModel, setOpenPopupModel] = useState<boolean>(false);

  const [openSuccessModel, setOpenSuccessModel] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="App">
      <div>
        <div>
          {step === "Step-1" && (
            <UploadFile setParsedData={setParsedData} setStep={setStep} />
          )}
        </div>
        <div>{step === "Step-1" && <FileView parsedData={parsedData} />}</div>
      </div>
      <div>
        <div>
          {step === "Step-2" && openPopupModel && (
            <Popup
              tableValues={tableValues}
              setOpenPopupModel={setOpenPopupModel}
              setOpenSuccessModel={setOpenSuccessModel}
            />
          )}
        </div>
        <div>{step === "Step-2" && openSuccessModel && <Success />}</div>
        <div>
          {step === "Step-2" && (
            <SearchInput setSearch={setSearch} setStep={setStep} />
          )}
        </div>
        <div>
          {step === "Step-2" && (
            <FileView
              parsedData={parsedData}
              search={search}
              setTableValues={setTableValues}
              setOpenPopupModel={setOpenPopupModel}
              success={success}
              setSuccess={setSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
