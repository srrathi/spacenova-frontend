
function Product({productDetails, buy}) {
    // does not show anything if product is already bought
    return productDetails.buyTs ? null : (
        <div className="product">
            <div>
                <p>name: {productDetails.name}</p>
                <p>waranty: {productDetails.warrantyPeriod} days</p>
                <p>price: {productDetails.price} dollar</p>
            </div>
            <button id="buy" onClick={buy}>Buy</button>
        </div>  
    ) 
}

export default Product