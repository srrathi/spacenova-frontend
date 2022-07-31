import { createRef } from "react";
import { toast } from "react-toastify";
import { APP_CONSTANTS } from "../../constants";
import Top from "../top";
import { useHistory } from "react-router-dom";

function PostItem() {
  const nameRef = createRef();
  const amountRef = createRef();
  const warrantyRef = createRef();

  const history = useHistory();

  const redirectToHome = () => {
    history.push("/");
  };

  const submitProduct = () => {
    let productDetails = {
      name: nameRef.current.value,
      amount: amountRef.current.value,
      warranty: warrantyRef.current.value,
    };

    // check if details have been provided, if not throw error
    console.log(productDetails);
    fetch({
      method: "post",
      url: `http://${APP_CONSTANTS.BACKEND_API}/addProduct`,
      body: productDetails,
    }).then((res) => {
      toast.success("Successfully added product");
      redirectToHome();
    });
  };
  return (
    <>
      <Top text="Sell Your Product" />
      <div className="main">
        <div className="form">
          <div className="option">
            <p>Name</p>
            <input type="text" ref={nameRef} />
          </div>
          <div className="option">
            <p>Price</p>
            <input type="number" step="0.1" ref={amountRef} />
          </div>
          <div className="option">
            <p>Warranty</p>
            <input type="number" step="1" ref={warrantyRef} />
          </div>
          <div className="option">
            <button id="submit" onClick={submitProduct}>
              Submit Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;
