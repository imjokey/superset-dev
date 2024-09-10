/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { SupersetTheme } from '@superset-ui/core';
import { t, css } from '@superset-ui/core';
import { useState, FC } from 'react';
import { Spin } from 'antd';
import { Upload as AntdUploadFile } from 'antd-v5';
import {
  UploadProps as AntdUploadProps,
  RcFile,
  UploadChangeParam,
} from 'antd-v5/lib/upload';

export interface UploadProps extends AntdUploadProps {
  children?: React.ReactNode;
  onChange?: () => void;
}

const Upload: FC<UploadProps> = ({ children, onChange, ...props }: UploadProps) => {
  const [loading, setLoading] = useState(false);

  // 上传之前
  const beforeUpload = (file: RcFile) => {
    setLoading(true);
    return true;
  };

  // 上传成功的回调
  const handleChange = (data: UploadChangeParam) => {
    if (data.file.status === 'done') {
      onChange?.()
      setLoading(false);
      console.log(data);
    }
    if (data.file.status === 'error') {
      setLoading(false);
    }
  };
  return (
    <Spin
      spinning={loading}
      css={css`
        > div {
          width: 100%;
        }
      `}
    >
      <AntdUploadFile
        {...props}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        {children}
      </AntdUploadFile>
    </Spin>
  );
};

export default Upload;
