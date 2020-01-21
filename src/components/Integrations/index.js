import React, { Component } from "react";
import { Row, Col } from "antd";
import { FiCheck } from "react-icons/fi";

import "./integrations.scss";
import CustomText from "components/shared/CutomText";
import { Colors } from "constants/themeConstants";
import Product from "./Product";

const products = [
  {
    productName: "Zapier",
    image: "https://cdn.zapier.com/zapier/images/logos/zapier-logomark.png"
  },
  {
    productName: "Slack",
    image: "https://www.stickpng.com/assets/images/5cb480cd5f1b6d3fbadece79.png"
  },
  {
    productName: "MailChimp",
    image:
      "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f4dd94ee3176b010c9776014e68ccf38/mailchimp.png"
  },
  {
    productName: "Whatsapp",
    image:
      "http://pluspng.com/img-png/whatsapp-png-whatsapp-transparent-png-image-1012.png"
  },
  {
    productName: "Gmail",
    image: "https://image.flaticon.com/icons/png/512/281/281769.png"
  },
  {
    productName: "Yahoo Mail",
    image:
      "http://pluspng.com/img-png/yahoo-png-free-icons-png-yahoo-icon-512.png"
  },
  {
    productName: "Intercom",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/62/Intercom_logo.png"
  }
];

export default class Integrations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProducts: ["Zapier"]
    };
  }

  handleProductClick = productName => {
    const { selectedProducts } = this.state;
    let index = selectedProducts.indexOf(productName);
    if (index === -1) {
      selectedProducts.push(productName);
    } else {
      selectedProducts.splice(index, 1);
    }
    this.setState({
      selectedProducts
    });
  };

  render() {
    const { selectedProducts } = this.state;
    return (
      <Row style={{ padding: 24 }}>
        <Col xl={24}>
          <Row type="flex" justify="center">
            <Col xl={16} className="integrationContainer">
              <Col xl={24} className="descArea">
                <CustomText style={{ color: Colors.primaryThemeColor }}>
                  Connect NPS to your favorite services
                </CustomText>
                <CustomText style={{ fontSize: 15 }}>
                  Integrations allow you to easily connect NPS account to the
                  services you're already using
                </CustomText>
              </Col>
              <Col xl={24} className="productsArea">
                {products.map((product, i) => (
                  <Product
                    key={i}
                    product={product}
                    selectedProducts={selectedProducts}
                    handleProductClick={this.handleProductClick}
                  />
                ))}
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
