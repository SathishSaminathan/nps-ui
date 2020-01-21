import React, { Component } from "react";
import { Layout, Menu, Icon, Row, Col } from "antd";
import Survey from "components/Survey";
import DashboardComponent from "components/shared/DashboardComponent";
import WelcomeComponent from "components/shared/WelcomeComponent";
import { HomeRoutes } from "config/routes";

const { Header, Content, Footer, Sider } = Layout;
export default class Home extends Component {
  state = {
    collapsed: true
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          // breakpoint="lg"
          collapsible
          // onBreakpoint={broken => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
        >
          <div className="logo">
            <img
              src="http://www.igraphicinc.com/wp-content/uploads/2016/05/Perfect-Logo-Design-for-You-How-to-Choose.png"
              className="image"
            ></img>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={() => this.props.history.push("/dashboardWithoutData")}
            >
              <Icon type="dashboard" />
              <span className="nav-text">Dashboard</span>
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => this.props.history.push("/dashboardWithData")}
            >
              <Icon type="dashboard" />
              <span className="nav-text">Dashboard</span>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => this.props.history.push("/survey")}
            >
              <Icon type="solution" />
              <span className="nav-text">Survey</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="usergroup-add" />
              <span className="nav-text">Customers</span>
            </Menu.Item>
            <Menu.Item
              key="5"
              onClick={() => this.props.history.push("/textAnalytics")}
            >
              <Icon type="area-chart" />
              <span className="nav-text">Text Analysis</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="notification" />
              <span className="nav-text">Responses</span>
            </Menu.Item>
            <Menu.Item
              key="7"
              onClick={() => this.props.history.push("/integrations")}
            >
              <Icon type="setting" />
              <span className="nav-text">Integrations</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>{/*  */}</Header>
          <Content
            style={{
              margin: "24px 16px 0",
              backgroundColor: "white",
              minHeight: "fit-content"
            }}
          >
            <div
              style={{ padding: 0, background: "#fff", height: "max-content" }}
            >
              <HomeRoutes />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
