import React from "react";
import moment from "moment";
import { filter, get } from "lodash";
import { useParams } from "react-router-dom";
import {
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Spin,
  Typography,
  notification,
} from "antd";
import useData from "hooks/useData";
import { getImageUrl } from "helpers/common.helper";
import RoomList from "components/hotels/room-list/RoomList";
import SearchForm from "components/hotels/search-form/SearchForm";
import { IHotel, IRoom, IRoomFilters } from "interfaces/hotel.interface";

import "./HotelDetail.scss";

const { Title } = Typography;

interface IHotelResponse {
  data: IHotel | null;
  isLoading: boolean;
  error: any;
}

interface IRoomsResponse {
  data: IRoom[] | null;
  isLoading: boolean;
  error: any;
}

const HotelDetail: React.FC = () => {
  const params = useParams();
  const [filters, setFilters] = React.useState({
    capacity: 2,
    hotel_id: Number(params.id),
    check_in_date: moment().startOf("day").format(),
    check_out_date: moment().add(1, "day").endOf("day").format(),
  } as IRoomFilters);
  const hotelResponse: IHotelResponse = useData({
    url: `hotel/${params.id}`,
    execute: true,
  });

  const availableRoomsResponse: IRoomsResponse = useData({
    url: `rooms`,
    params: JSON.stringify({
      filter_key_1: "hotel_id",
      filter_value_1: filters.hotel_id,
      filter_key_2: "capacity",
      filter_value_2: filters.capacity,
      filter_operator_2: "gte",
      check_in_date: filters.check_in_date,
      check_out_date: filters.check_out_date,
    }),
    execute: !!params.id,
  });

  React.useEffect(() => {
    if (hotelResponse.error) {
      console.log("error", hotelResponse.error);
      notification.error({
        message: "Login Failed!",
        description: get(
          hotelResponse.error,
          "response.data.error",
          "Internal Server Error!"
        ),
      });
    }
  }, [hotelResponse.error]);

  const onChangeFilters = (values: IRoomFilters) => {
    setFilters(values);
  };

  if (!hotelResponse.data) {
    return null;
  }

  return (
    <div className="hotel-detail">
      <Spin spinning={hotelResponse.isLoading}>
        <Card hoverable style={{ width: "100%" }}>
          <Row gutter={30}>
            <Col span={8}>
              <Image
                alt="example"
                src={getImageUrl(hotelResponse?.data?.image)}
                style={{ maxWidth: "300" }}
              />
            </Col>
            <Col span={16}>
              <Title level={2}>{hotelResponse?.data?.title}</Title>
              <Descriptions title="Hotel Info">
                <Descriptions.Item label="Phone">
                  {hotelResponse?.data?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  {hotelResponse?.data?.address}
                </Descriptions.Item>
              </Descriptions>
              <p>{hotelResponse?.data?.description}</p>
            </Col>
          </Row>
        </Card>
        <br />
        <Row>
          <Col span={24}>
            <Title level={2}>List of Rooms</Title>
            <SearchForm filters={filters} onChangeFilters={onChangeFilters} />
            <RoomList rooms={availableRoomsResponse?.data || []} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default HotelDetail;
