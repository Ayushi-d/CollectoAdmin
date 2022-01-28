/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import { Space } from 'antd';

export const bookingConstants = {
  GET_ALL_BOOKING_REQUEST: 'GET_ALL_BOOKING_REQUEST',
  GET_ALL_BOOKING_SUCCESS: 'GET_ALL_BOOKING_SUCCESS',
  GET_ALL_BOOKING_FAILURE: 'GET_ALL_BOOKING_FAILURE',
};

export const BookingTableColumns = [
  {
    title: 'Booking Date',
    dataIndex: 'bookingDate',
    key: 'bookingDate',
  },
  {
    title: 'Booking Time',
    dataIndex: 'bookingTime',
    key: 'bookingTime',
  },
  {
    title: 'Pickup Address',
    dataIndex: 'pickupAddress',
    key: 'pickupAddress',
  },
  {
    title: 'Destination Address',
    dataIndex: 'destinationAddress',
    key: 'destinationAddress',
  },
  {
    title: 'Ride Amount',
    dataIndex: 'rideAmount',
    key: 'rideAmount',
  },
  {
    title: 'Ride Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    // eslint-disable-next-line react/display-name
    render: (text, record) => (
      <Space size="middle">
        <Link to="">Detail</Link>
      </Space>
    ),
  },
];
