import { useState } from "react";
import { Coder } from "id128/utils";
import "./generator.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Generator = () => {
  const [origClientId, setOrigClientId] = useState("");
  const getEncExperienceId = (origExpId) => {
    const binary = Coder.Uuid.decodeTrusted(origExpId);
    return Coder.Crockford32.encodeTrusted(binary);
  };
  return (
    <>
      <div className="form">
      <h2>clientId Generator</h2>
          <input
            type="text"
            placeholder="Enter valid origClientId"
            value={origClientId}
            onChange={(e) => setOrigClientId(e.target.value)}
          />
          <input
            type="text"
            value={origClientId ? getEncExperienceId(origClientId) : "clientId" }
            disabled
          />
        <button
          onClick={() => {
            navigator.clipboard.writeText(getEncExperienceId(origClientId));
          }}
          onClickCapture={() => {toast.info(`${getEncExperienceId(origClientId)} 
          copied to clipboard.`)}}
        >
          Copy to clipboard
        </button>
        <ToastContainer 
        position="top-center"
        theme="light"
        closeButton={false}
         />
      </div>
    </>
  );
};

export default Generator;
