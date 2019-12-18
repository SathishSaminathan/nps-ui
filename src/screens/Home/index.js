import React, { Component } from "react";
import { Layout, Menu, Icon, Row, Col } from "antd";
import { Doughnut } from "react-chartjs-2";
import DashboardCountComponent from "components/shared/DashboardCountComponent";

const { Header, Content, Footer, Sider } = Layout;

const data = {
  labels: ["PROMOTERS", "PASSIVES", "DETRACTORS"],
  datasets: [
    {
      data: [20, 50, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

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
          <Header
            style={{ background: "#fff", padding: 0 }}
          >
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            /> */}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Row>
                <Col xl={24}>
                  <Col xl={12}>
                    <Col xl={12}>
                      <DashboardCountComponent
                        name="Total NPS values"
                        count={100}
                      />
                    </Col>
                    <Col xl={12}>
                      <DashboardCountComponent name="Promoters" count={20} />
                    </Col>
                    <Col xl={12}>
                      <DashboardCountComponent name="Passives" count={50} />
                    </Col>
                    <Col xl={12}>
                      <DashboardCountComponent name="Detractors" count={30} />
                    </Col>
                  </Col>
                  <Col xl={12}>
                    <Doughnut data={data} />
                  </Col>
                </Col>
              </Row>
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
