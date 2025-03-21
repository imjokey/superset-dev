/* eslint-disable prettier/prettier */
import { useState, FC } from 'react';
import { styled, t } from '@superset-ui/core';
import { Radio, Input, Table } from 'antd';
import {
  DesktopOutlined,
  MobileOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined,
  SearchOutlined,
  DeleteColumnOutlined,
  DeleteRowOutlined,
  AppstoreOutlined,
  PicRightOutlined,
  BarsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

const DashboardContent: FC = () => {
  const AiModalContent = styled.div`
    margin-top: -16px;
    background: #fff;
    .headers {
      background: #dedede;
      width: 100%;
      height: auto;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      .rightSearch {
        display: flex;
        align-items: center;
        .input {
          width: 200px;
        }
      }
    }
    .typeBox {
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      justify-content: space-between;
      .sortBox {
        display: flex;
        align-items: center;
        div {
          margin: 0 5px;
          cursor: pointer;
        }
        .active {
          color: #45bed6;
        }
      }
    }
    .listBox {
      width: 100%;
      padding: 0 20px;
      .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 2px solid #45bed6;
        .title {
          font-size: 16px;
        }
      }
      .listStyle {
        .listItem {
          width: 230px;
          cursor: pointer;
          float: left;
          background: #fff;
          border: 1px solid #ddd;
          -webkit-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin-right: 28px;
          margin-bottom: 30px;
          position: relative;
          .listItemImg {
            width: 100%;
            padding: 10px;
            height: 164px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .listItemInfo {
            border-top: 1px solid #ddd;
            padding: 14px;
            .title {
              color: #333;
              font-size: 14px;
              margin-bottom: 9px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 400;
            }
            .user {
              font-size: 12px;
              color: #666;
              overflow: hidden;
              display: flex;
              justify-content: space-between;
              .name {
              }
              .time {
                color: #999;
                font-weight: 400;
              }
            }
          }
        }
      }

      .listStyles {
        .listItem {
          width: auto;
          cursor: pointer;
          float: left;
          background: #fff;
          border: 1px solid #ddd;
          -webkit-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin-right: 28px;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          padding: 10px;
          .listItemImg {
            width: 80px;
            height: 67px;
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .listItemInfo {
            .title {
              color: #333;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 400;
            }
            .user {
              font-size: 12px;
              color: #666;
              overflow: hidden;
              .name {
                margin: 6px 0;
              }
              .time {
                color: #999;
                font-weight: 400;
              }
            }
          }
        }
      }
      .listContent {
        padding: 20px 20px 0 20px;
        height: auto;
        position: relative;

        .listContentLine {
          width: 100%;
          height: 2px;
          clear: both;
        }
      }
      .listContent:before {
        content: '';
        height: calc(100% + 22px);
        border-right: 2px dashed #ddd;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      .listContent:after {
        content: '';
        width: 15px;
        height: 2px;
        background: #ddd;
        position: absolute;
        top: calc(100% + 23px);
        left: 0px;
      }
      .titleBoxChildren {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        margin-left: 20px;
        border-bottom: 2px solid #45bed6;
        .title {
          font-size: 16px;
        }
      }
      .listContentChildren {
        margin-left: 20px;
        padding: 20px 20px 0 20px;
        height: auto;
        position: relative;
        .listContentLine {
          width: 100%;
          height: 2px;
          clear: both;
        }
      }
      .listContentChildren:before {
        content: '';
        height: 50%;
        border-right: 2px dashed #ddd;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      .listContentChildren:after {
        content: '';
        width: 15px;
        height: 2px;
        background: #ddd;
        position: absolute;
        top: calc(50% - 1px);
        left: 0px;
      }
    }
  `;
  const dataSource = [
    { key: '1', title: '财务总览', name: '星光', time: '2020-10-27 22:27:23' },
    { key: '2', title: '财务总览', name: '星光', time: '2020-10-27 22:27:23' },
  ];

  const columns = [
    { title: '报表名称', dataIndex: 'title', key: 'title' },
    { title: '拥有着', dataIndex: 'name', key: 'name' },
    { title: '最后编辑时间', dataIndex: 'time', key: 'time' },
  ];

  const [type, setType] = useState('1');
  const onChange = (e: any) => {
    setType(e.target.value);
  };
  const [maintype, setMaintype] = useState('1');
  const onMaintypeChange = (e: any) => {
    setMaintype(e.target.value);
  };
  const [modaltype, setModaltype] = useState('1');
  const onChanges = (e: any) => {
    setModaltype(e.target.value);
  };
  const [showStyle, setShowStyle] = useState('1');
  const onChangeShowStyle = (e: any) => {
    setShowStyle(e.target.value);
  };

  const [sort, setSort] = useState('1');
  const onChangeSort = (e: any) => {
    setSort(e);
  };

  return (
    <AiModalContent>
      <div className="headers">
        <Radio.Group
          value={type}
          onChange={onChange}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="1">
            <DesktopOutlined style={{ marginRight: 6 }} />
            PC端
          </Radio.Button>
          <Radio.Button value="2">
            <MobileOutlined style={{ marginRight: 6 }} />
            移动端
          </Radio.Button>
          <Radio.Button value="3">
            <FundProjectionScreenOutlined style={{ marginRight: 6 }} />
            大屏
          </Radio.Button>
          <Radio.Button value="4">
            <BarChartOutlined style={{ marginRight: 6 }} />
            报表
          </Radio.Button>
        </Radio.Group>
        <div className="rightSearch">
          <div className="input">
            <Input placeholder="请输入内容" prefix={<SearchOutlined />} />
          </div>
          <Radio.Group
            value={modaltype}
            onChange={onChanges}
            optionType="button"
            buttonStyle="solid"
            size="small"
            style={{ marginRight: 6, marginLeft: 6 }}
          >
            <Radio.Button value="1">
              <DeleteColumnOutlined />
            </Radio.Button>
            <Radio.Button value="2">
              <DeleteRowOutlined />
            </Radio.Button>
          </Radio.Group>
          <Radio.Group
            value={showStyle}
            onChange={onChangeShowStyle}
            optionType="button"
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value="1">
              <AppstoreOutlined />
            </Radio.Button>
            <Radio.Button value="2">
              <PicRightOutlined />
            </Radio.Button>
            <Radio.Button value="3">
              <BarsOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="typeBox">
        <Radio.Group
          value={maintype}
          onChange={onMaintypeChange}
          optionType="button"
          buttonStyle="solid"
          size="large"
        >
          <Radio.Button value="1">
            <UsergroupAddOutlined style={{ marginRight: 6 }} />
            共享报告
          </Radio.Button>
          <Radio.Button value="2">
            <UserOutlined style={{ marginRight: 6 }} />
            私有报告
          </Radio.Button>
          <Radio.Button value="3">
            <UserSwitchOutlined style={{ marginRight: 6 }} />
            匿名报告
          </Radio.Button>
        </Radio.Group>
        <div className="sortBox">
          <div
            className={sort == '1' ? 'active' : ''}
            onClick={() => {
              onChangeSort('1');
            }}
          >
            时间排序
            <SortDescendingOutlined />
          </div>
          <div
            className={sort == '2' ? 'active' : ''}
            onClick={() => {
              onChangeSort('2');
            }}
          >
            用户排序
            <SortDescendingOutlined />
          </div>
          <div
            className={sort == '3' ? 'active' : ''}
            onClick={() => {
              onChangeSort('3');
            }}
          >
            名称排序
            <SortDescendingOutlined />
          </div>
          <div
            className={sort == '4' ? 'active' : ''}
            onClick={() => {
              onChangeSort('4');
            }}
          >
            自定义排序
            <SortDescendingOutlined />
          </div>
        </div>
      </div>
      <div className="listBox">
        <div className="titleBox">
          <div className="title">01.财务主题</div>
          <div>总数：12</div>
        </div>
        <div
          className={
            showStyle == '1'
              ? 'listContent listStyle'
              : 'listContent listStyles'
          }
        >
          {showStyle == '3' ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          ) : (
            Array(10)
              .fill(null)
              .map((item, index) => (
                <div key={index} className="listItem">
                  <div className="listItemImg">
                    <img src="http://123.56.236.25:9001/designer/static/image/DF3FD68B7D2748D49AC00B8DB9EE5183.png" />
                  </div>
                  <div className="listItemInfo">
                    <div className="title">{index + 1}.财务总览</div>
                    <div className="user">
                      <div className="name">星光</div>
                      <div className="time">2020-10-27 21:53:24</div>
                    </div>
                  </div>
                </div>
              ))
          )}
          <div className="listContentLine"></div>
        </div>
        <div className="titleBoxChildren">
          <div className="title">01.财务主题</div>
          <div>总数：12</div>
        </div>
        <div
          className={
            showStyle == '1'
              ? 'listContentChildren listStyle'
              : 'listContentChildren listStyles'
          }
        >
          {showStyle == '3' ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          ) : (
            Array(10)
              .fill(null)
              .map((item, index) => (
                <div key={index} className="listItem">
                  <div className="listItemImg">
                    <img src="http://123.56.236.25:9001/designer/static/image/DF3FD68B7D2748D49AC00B8DB9EE5183.png" />
                  </div>
                  <div className="listItemInfo">
                    <div className="title">{index + 1}.财务总览</div>
                    <div className="user">
                      <div className="name">星光</div>
                      <div className="time">2020-10-27 21:53:24</div>
                    </div>
                  </div>
                </div>
              ))
          )}
          <div className="listContentLine"></div>
        </div>
      </div>
    </AiModalContent>
  );
};

export default DashboardContent;