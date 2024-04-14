import React from "react";
import moment from "moment";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IRoomFilters } from "interfaces/hotel.interface";

import "./SearchForm.scss";

const { RangePicker } = DatePicker;

interface SearchFormProps {
  filters: IRoomFilters;
  onChangeFilters(filters: IRoomFilters): void;
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { filters, onChangeFilters } = props;
  const onFinish = (values: IRoomFilters) => {
    onChangeFilters(values);
  };

  return (
    <div className="search-rooms">
      <Form onFinish={onFinish} layout="inline">
        <Form.Item
          label="Guests"
          rules={[
            { required: true, message: "Please input the number of guests!" },
          ]}
        >
          <InputNumber
            min={1}
            value={filters?.capacity}
            onChange={(val) =>
              onChangeFilters({ ...filters, capacity: Number(val) })
            }
          />
        </Form.Item>

        <Form.Item
          label="Check-in/Check-out"
          rules={[
            { required: true, message: "Please select the booking date!" },
          ]}
        >
          <RangePicker
            clearIcon={null}
            allowEmpty={[false, false]}
            value={[
              moment(filters.check_in_date).startOf("day"),
              moment(filters.check_out_date).endOf("day"),
            ]}
            format={"DD-MMM-YYYY"}
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
            ranges={{
              "This Week": [moment().startOf("week"), moment().endOf("week")],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
            }}
            onChange={(dates) =>
              onChangeFilters({
                ...filters,
                check_in_date: dates?.[0]?.startOf("day")?.format(),
                check_out_date: dates?.[1]?.endOf("day")?.format(),
              })
            }
          />
        </Form.Item>

        {/* <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Search
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default SearchForm;
