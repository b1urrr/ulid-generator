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

  const checkValidity = (e) => {
    let value = e.target.value
    if (value.length !== 36) {
      alert('Input value is not 36 characters long, you probably copied the origClientId incorrectly')
      return
    }
    if (value.charAt(8) !== '-' || (value.charAt(13) !== '-') || (value.charAt(18) !== '-') || (value.charAt(23) !== '-')) {
      alert('Input value is invalid, you probably copied the origClientId incorrectly')
      return
    } else {
      toast.success('origClientId pasted successfully')
    }
    setOrigClientId(e.target.value)
  }
  return (
    <>
      <div className="form">
      <h2>clientId Generator</h2>
          <input
            type="text"
            placeholder="Enter valid origClientId"
            value={origClientId}
            onChange={checkValidity}
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
        limit={2}
         />
      </div>
    </>
  );
};

export default Generator;
