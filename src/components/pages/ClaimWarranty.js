import Top from "../top";
import { createRef } from "react";
import { toast } from "react-toastify";
import { APP_CONSTANTS } from "../../constants";
import { ethers } from "ethers";
import Warranty from "../../artifiacts/contracts/warranty.sol/warrantyToken.json";

function ClaimWarranty() {
  const tokenInputRef = createRef();

  const getCurrentTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  const isTokenWarrantyValid = async (tokenData) => {
    // tokenData is just the url for the data to be used
    let data = await fetch(tokenData);

    // check validity
    const currentTimestamp = getCurrentTime();
    if (data.buyTs + data.warrantyPeriod * 24 * 60 * 60 > currentTimestamp) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    // get the end user
    const signer = provider.getSigner();
    // get the smart contract
    const contract = new ethers.Contract(
      APP_CONSTANTS.CONTRACT_ADDRESS,
      Warranty.abi,
      signer
    );

    let tokenInput = tokenInputRef.current.value;
    const tokenData = contract.tokenURI(tokenInput);
    if (!tokenData) {
      if (isTokenWarrantyValid(tokenData)) {
        setTimeout(
          toast.info("The warranty for this product has expired"),
          3000
        );
        contract.burn(tokenInput);
      } else {
        toast.success(
          "The product is under the warranty period. The seller has been notified and you will be notified about any later changes via email"
        );
      }
    } else {
      toast.error("Invalid token");
    }
    console.log(tokenInput);
  };
  return (
    <>
      <Top text="Claim Warranty" />
      <div className="main">
        <div className="form">
          <div className="option">
            <p>Token Id</p>
            <input type="text" ref={tokenInputRef} />
          </div>

          <div className="option">
            <button id="submit" onClick={handleSubmit}>
              Submit Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaimWarranty;
