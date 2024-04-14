import React from "react";
import { Badge, Button, Card, Col, Row } from "antd";
import { IRoom, IRoomFilters } from "interfaces/hotel.interface";
import { getImageUrl } from "helpers/common.helper";
import BookRoomModal from "../book-room-modal/BookRoomModal";
interface RoomListProps {
  rooms: IRoom[];
  filters: IRoomFilters;
}

const RoomList: React.FC<RoomListProps> = (props) => {
  const [currentRoom, setCurrentRoom] = React.useState({} as IRoom);
  const [isOpenBookRoomModal, setIsOpenBookRoomModal] = React.useState(false);
  const { rooms, filters } = props;

  const onStartBookRoom = (room: IRoom) => {
    setIsOpenBookRoomModal(true);
    setCurrentRoom(room);
  };

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
              <Button
                type="primary"
                disabled={!room.is_available}
                onClick={() => onStartBookRoom(room)}
              >
                Book Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <BookRoomModal
        isOpen={isOpenBookRoomModal}
        onOpen={() => setIsOpenBookRoomModal(true)}
        data={currentRoom}
        filters={filters}
        onClose={() => {
          setIsOpenBookRoomModal(false);
          setCurrentRoom({} as IRoom);
        }}
      />
    </div>
  );
};

export default RoomList;
