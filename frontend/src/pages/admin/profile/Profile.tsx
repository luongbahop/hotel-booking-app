import React from "react";
import { Card, Avatar, Typography, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStore } from "providers/StoreProvider";
import useData from "hooks/useData";
import moment from "moment";
import { groupBy } from "lodash";

const { Title, Paragraph } = Typography;

const Profile = () => {
  const { auth, changeAuth } = useStore();
  const bookedSlotsResponse: any = useData({
    url: `bookings`,
    params: JSON.stringify({
      filter_key_1: "created_by",
      filter_value_1: auth.userInfo.user_id,
    }),
    execute: true,
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let combinedBookedSlots = groupBy(
    bookedSlotsResponse?.data,
    (item: any) => item.room_id
  );
  let finalCombinedBookedSlots = Object.entries(combinedBookedSlots).map(
    ([room, slots]) => ({ room: slots[0].room, slots })
  );

  if (!auth.isAuthenticated) {
    return <div>Please login to view your profile</div>;
  }
  return (
    <div>
      <Card style={{ width: "100%", marginTop: 30 }}>
        <Card.Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} />}
          title={<Title level={4}>{auth?.userInfo?.fullname}</Title>}
          description={<Paragraph>Email: {auth?.userInfo?.email}</Paragraph>}
        />
      </Card>
      <br />
      <Title level={3}>List of Booked Slots</Title>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={finalCombinedBookedSlots || []}
        renderItem={(item: any) => (
          <List.Item>
            <Card title={`${item.room?.hotel?.title} -  ${item.room?.title}`}>
              <div>
                {item.slots.map((slot: any) => (
                  <Card>
                    <p>
                      Check-in:{" "}
                      {moment(slot.check_in_date).format("DD-MMM-YYYY")}
                    </p>
                    <p>
                      Check-out:{" "}
                      {moment(slot.check_out_date).format("DD-MMM-YYYY")}
                    </p>
                    <p>Total Price: {formatter.format(slot.total_price)}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;
