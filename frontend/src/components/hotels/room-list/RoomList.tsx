import React from "react";
import { Badge, Button, Card, Col, Row } from "antd";
import { IRoom } from "interfaces/hotel.interface";
import { getImageUrl } from "helpers/common.helper";

interface RoomListProps {
  rooms: IRoom[];
}

const RoomList: React.FC<RoomListProps> = (props) => {
  const { rooms } = props;

  if (rooms?.length <= 0) {
    return <div>No rooms available</div>;
  }

  return (
    <div className="room-list">
      <Row gutter={30}>
        {rooms.map((room: IRoom, index: number) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              cover={<img alt={room.title} src={getImageUrl(room.image)} />}
            >
              <Card.Meta title={room.title} description={room.description} />
              <div>From ${room.price} / night</div>
              <div>Capacity: {room.capacity} guests</div>
              <div>
                Booked: {room.booked_slots} / {room.number_of_rooms} rooms
              </div>
              <Badge
                style={{ marginRight: "10px" }}
                status={
                  room.status === "active" && room.is_available
                    ? "success"
                    : "error"
                }
                text={
                  room.status === "active" && room.is_available
                    ? "Available"
                    : "Un-Available"
                }
              />
              <Button type="primary" disabled={!room.is_available}>
                Book Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RoomList;
