import { useEffect, useState } from "react";
import { BoxLoading } from "react-loadingg";
import { APP_CONSTANTS } from "../../constants";
import Product from "../Product";
import Top from "../top";
import { ethers } from "ethers";
import Warranty from "../../artifiacts/contracts/warranty.sol/warrantyToken.json";
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    return fetch(`http://${APP_CONSTANTS.BACKEND_API}/products`);
  };

  const mintToken = async (id) => {
    //
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

    //
    const conn = contract.connect(signer);
    const addr = conn.address;
    const newTokenId = contract.payToMint(
      addr,
      `http://${APP_CONSTANTS.BACKEND_API}/product/${id}`,
      {
        value: ethers.utils.parseEther("0.0"),
      }
    );
    return newTokenId;
  };

  const updateBuyTimestamp = (id) => {
    return fetch(`http://${APP_CONSTANTS.BACKEND_API}/buy/${id}`);
  };

  useEffect(() => {
    if (!products.length) {
      getProducts()
        .then((resp) => {
          return resp.json();
        })
        .then((_products) => {
          setProducts(_products);
        })
        .catch(console.error);
    }
  }, [products, setProducts]);

  return (
    <>
      <Top text="Buy Products" />
      <div className="main">
        {products.length ? (
          products.map((product, idx) => {
            return (
              <Product
                key={idx}
                productDetails={product}
                buy={async () => {
                  updateBuyTimestamp(product.id);
                  let id = await mintToken(product.id);
                  toast.success(`Token id is ${id}`);
                }}
              />
            );
          })
        ) : (
          <BoxLoading />
        )}
      </div>
    </>
  );
}

export default ProductList;
