import React from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { Card, Col, Row, Spin, notification } from "antd";
import useData from "hooks/useData";
import { getImageUrl } from "helpers/common.helper";

import "./Home.scss";

const { Meta } = Card;

const Home: React.FC = () => {
  const { data, isLoading, error } = useData({ url: "/hotels", execute: true });
  React.useEffect(() => {
    if (error) {
      console.log("error", error);
      notification.error({
        message: "Login Failed!",
        description: get(
          error,
          "response.data.error",
          "Internal Server Error!"
        ),
      });
    }
  }, [error]);

  return (
    <div className="home-page">
      <div className="hotel-list">
        <Spin spinning={isLoading}>
          <div className="hotel-list-wrapper">
            <Row gutter={[30, 30]}>
              <Col span={24}>
                <h2>List of Hotels</h2>
              </Col>
              {(data || []).map((item: any, index) => (
                <Col span={8} key={index}>
                  <Link to={`/hotel/${item.hotel_id}`}>
                    <Card
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <img alt={item.title} src={getImageUrl(item.image)} />
                      }
                    >
                      <Meta
                        title={item.title}
                        description={
                          <>
                            <div>Address: {item.address}</div>
                            <div>Phone: {item.phone}</div>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Home;
