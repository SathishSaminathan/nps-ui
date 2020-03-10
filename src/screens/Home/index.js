import React, { Component, Fragment } from "react";
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
      <Fragment>
        <Header
          style={{ background: "#fff", padding: 0 }}
          className="headerClass"
        >
          <div className="logo">
            <img
              src="http://roundsedge.com/assets/images/foot-logo.png"
              className="image"
            ></img>
            <span>Round's Edge</span>
          </div>
          {/* <Row type="flex" justify="end" align="middle">
         <Col> */}
          <Icon
            style={{ fontSize: 30 }}
            type="logout"
            onClick={() => {
              this.props.history.push("/login");
              localStorage.clear();
            }}
          />
          {/* </Col>
       </Row> */}
        </Header>
        <Layout style={{ height: "calc(100vh - 64px)" }}>
          <Sider
            style={
              {
                // marginTop: 64
              }
            }
            // breakpoint="lg"
            collapsible
            // onBreakpoint={broken => {
            //   console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //   console.log(collapsed, type);
            // }}
          >
            {/* <div className="logo">
       <img
         src="http://roundsedge.com/assets/images/foot-logo.png"
         className="image"
       ></img>
       <span>Round's Edge</span>
     </div> */}
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
                <span className="nav-text">Dashboard1</span>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => this.props.history.push("/dashboardWithData1")}
              >
                <Icon type="dashboard" />
                <span className="nav-text">Dashboard2</span>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => this.props.history.push("/survey")}
              >
                <Icon type="solution" />
                <span className="nav-text">Survey</span>
              </Menu.Item>
              <Menu.Item key="5" disabled>
                <Icon type="usergroup-add" />
                <span className="nav-text">Customers</span>
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => this.props.history.push("/textAnalytics")}
              >
                <Icon type="area-chart" />
                <span className="nav-text">Text Analysis</span>
              </Menu.Item>
              <Menu.Item
                key="7"
                onClick={() => this.props.history.push("/textAnalytics1")}
              >
                <Icon type="dot-chart" />
                <span className="nav-text">Sentiment</span>
              </Menu.Item>
              <Menu.Item
                key="8"
                onClick={() => this.props.history.push("/rawData")}
              >
                <Icon type="bar-chart" />
                <span className="nav-text">Raw Data</span>
              </Menu.Item>
              <Menu.Item key="9" disabled>
                <Icon type="notification" />
                <span className="nav-text">Responses</span>
              </Menu.Item>
              <Menu.Item
                key="10"
                onClick={() => this.props.history.push("/integrations")}
              >
                <Icon type="setting" />
                <span className="nav-text">Integrations</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{
                margin: 16,
                backgroundColor: "white",
                minHeight: "fit-content"
                // marginTop: 80
              }}
            >
              <div
                style={{
                  padding: 0,
                  background: "#fff",
                  height: "max-content"
                }}
              >
                <HomeRoutes />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              NPS ©2020 Created by Round's Edge Technologies
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
