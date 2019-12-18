import React, { Component } from "react";
import { Layout, Menu, Icon, Row, Col } from "antd";
import Survey from "components/Survey";
import DashboardComponent from "components/shared/DashboardComponent";
import WelcomeComponent from "components/shared/WelcomeComponent";

const { Header, Content, Footer, Sider } = Layout;
export default class Home extends Component {
  state = {
    collapsed: true
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsible
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">
            <img
              src="http://www.igraphicinc.com/wp-content/uploads/2016/05/Perfect-Logo-Design-for-You-How-to-Choose.png"
              className="image"
            ></img>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span className="nav-text">Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="solution" />
              <span className="nav-text">Campaign</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="usergroup-add" />
              <span className="nav-text">Customers</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="notification" />
              <span className="nav-text">Responses</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="setting" />
              <span className="nav-text">Integrations</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>{/*  */}</Header>
          <Content style={{ margin: "24px 16px 0", backgroundColor: 'white', }}>
            <div style={{ padding: 24, background: "#fff", height: "max-content" }}>
              {/* <DashboardComponent /> */}
              {/* <WelcomeComponent /> */}
              <Survey />
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
