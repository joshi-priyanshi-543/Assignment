import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Typography, Spin, Row, Col, Button } from "antd";
import axios from "axios";
import "../css/dashboard.css";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Replace with your API key from NewsAPI.org
  const API_KEY = "73735d837eb34b2e9cf9126176c497df";
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="logo">News Dashboard </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Button
              type="link"
              onClick={() => {
                localStorage.removeItem("userLoggedIn");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="dashboard-content">
        <Title level={2} style={{ textAlign: "center", margin: "20px 0" }}>
          Latest News
        </Title>
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {news.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    article.urlToImage && (
                      <img
                        alt="article thumbnail"
                        src={article.urlToImage}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    )
                  }
                >
                  <Title level={4} ellipsis>
                    {article.title}
                  </Title>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {article.description}
                  </Paragraph>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        News Dashboard ©2025 Created by YourName
      </Footer>
    </Layout>
  );
};

export default Dashboard;
