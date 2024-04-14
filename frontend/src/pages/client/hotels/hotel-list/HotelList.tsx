import React from "react";
import { get } from "lodash";
import { Card, Col, Row, Spin, notification } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import useData from "hooks/useData";
import { getImageUrl } from "helpers/common.helper";

import "./HotelList.scss";

const { Meta } = Card;

const HotelList: React.FC = () => {
  const { data, isLoading, error } = useData({ url: "/hotels" });

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
    <div className="hotel-list">
      <Spin spinning={isLoading}>
        <div className="hotel-list-wrapper">
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <h2>List of Hotels</h2>
            </Col>
            {(data || []).map((item: any, index) => (
              <Col span={8} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={<img alt="example" src={getImageUrl(item.image)} />}
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default HotelList;
