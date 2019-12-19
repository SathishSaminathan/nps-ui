import React, { useState } from "react";
import { Col } from "antd";
import { FiCheck } from "react-icons/fi";

const Product = ({ product, selectedProducts, handleProductClick }) => {
  const checkIfSelected = name => selectedProducts.includes(name);
  return (
    <Col xl={4} className="productContainer">
      <Col
        className="imageContainer"
        onClick={() => handleProductClick(product.productName)}
      >
        <img src={product.image} className="image" />
        {checkIfSelected(product.productName) && (
          <Col className="checked">
            <FiCheck />
          </Col>
        )}
      </Col>
      <Col
        className={`productName ${
          checkIfSelected(product.productName) ? "selected" : ""
        }`}
      >
        {product.productName}
      </Col>
    </Col>
  );
};

export default Product;
