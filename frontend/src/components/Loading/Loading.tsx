import React from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <div className="loading-global">
      <div className="loading">
        <Spin size="large" />
      </div>
    </div>
  );
}

export default Loading;
