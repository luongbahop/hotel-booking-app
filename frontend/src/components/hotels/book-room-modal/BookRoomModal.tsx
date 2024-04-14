import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { get } from "lodash";
import { Button, Modal, Form, Input, DatePicker, notification } from "antd";
import { IRoom, IRoomFilters } from "interfaces/hotel.interface";
import { useStore } from "providers/StoreProvider";

import getEnvVars from "environment";

const CONFIGS = getEnvVars();

interface BookRoomModalProps {
  data: IRoom;
  filters: IRoomFilters;
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}
const BookRoomModal: React.FC<BookRoomModalProps> = (props) => {
  const navigate = useNavigate();
  const { auth } = useStore();
  const { data, filters, isOpen, onOpen, onClose } = props;
  const [info, setInfo] = useState(auth.userInfo);

  console.log(333, auth);
  if (!auth.isAuthenticated) {
    notification.error({
      message: "Login Required!",
      description: "Please login to book a room",
    });
  }

  const diffInDays = moment(filters.check_out_date)
    .endOf("day")
    .diff(moment(filters.check_in_date).startOf("day"), "days");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const pricePerNight = data.price;
  const totalPrice = data.price * diffInDays;

  const onFinish = async () => {
    try {
      const bookingData = {
        room_id: data.room_id,
        check_in_date: filters.check_in_date,
        check_out_date: filters.check_out_date,
        total_price: totalPrice,
        created_by: auth.userInfo.user_id,
      };
      const bookResponse = await axios.post(
        `${CONFIGS.API_URL}/api/v1/booking`,
        bookingData
      );
      navigate("/profile");
      notification.success({
        message: "Book Room Success!",
        description: "You have successfully booked the room",
      });
      onClose();
    } catch (error) {
      notification.error({
        message: "Book Room Failed!",
        description: get(
          error,
          "response.data.error",
          "Internal Server Error!"
        ),
      });
    }
  };

  return (
    <div>
      <Modal
        title={`Book Room - ${data.title}`}
        visible={isOpen}
        onOk={onFinish}
        onCancel={onClose}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              placeholder="Enter your name"
              value={info.fullname}
              readOnly
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input placeholder="Enter your email" value={info.email} readOnly />
          </Form.Item>
          <Form.Item label="Check-in Date">
            <DatePicker
              disabled
              format={"DD-MMM-YYYY"}
              style={{ width: "100%" }}
              value={moment(filters.check_in_date).startOf("day")}
            />
          </Form.Item>
          <Form.Item label="Check-out Date">
            <DatePicker
              disabled
              format={"DD-MMM-YYYY"}
              style={{ width: "100%" }}
              value={moment(filters.check_out_date).endOf("day")}
            />
          </Form.Item>
          <Form.Item label="">
            Price: {formatter.format(pricePerNight)} / night
            <br />
            Total: {formatter.format(totalPrice)} for {diffInDays} nights
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookRoomModal;
