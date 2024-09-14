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
/* eslint-env browser */
import { rgba } from 'emotion-rgba';
import { PureComponent } from 'react';
// eslint-disable-next-line import/no-unresolved
import Tabs from 'src/components/Tabs';
import ColorPicker from 'src/components/ColorPicker';
import { t, css } from '@superset-ui/core';
import SliceAdder from 'src/dashboard/containers/SliceAdder';
// eslint-disable-next-line import/no-unresolved
import dashboardComponents from 'src/visualizations/presets/dashboardComponents';
import { getImg, deleteImg } from 'src/components/Upload/utils';
import Upload from 'src/components/Upload';
import injectCustomCss from 'src/dashboard/util/injectCustomCss';
import NewColumn from '../gridComponents/new/NewColumn';
import NewDivider from '../gridComponents/new/NewDivider';
import NewHeader from '../gridComponents/new/NewHeader';
import NewRow from '../gridComponents/new/NewRow';
import NewTabs from '../gridComponents/new/NewTabs';
import NewMarkdown from '../gridComponents/new/NewMarkdown';
import NewDynamicComponent from '../gridComponents/new/NewDynamicComponent';
import { CloseOutlined } from '@ant-design/icons';

const BUILDER_PANE_WIDTH = 374;

// eslint-disable-next-line react-prefer-function-component/react-prefer-function-component
class BuilderComponentPane extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      colorList: ['#f7f7f7', 'red', 'green', 'yellow'],
      imgList: [],
    };
    this.handleChartDelete = this.handleChartDelete.bind(this);
  }

  changeCss(css) {
    this.props.onChange();
    this.props.updateCss(`.css-position { background: ${css}; }`);
  }

  changeAntdCss(css) {
    this.props.onChange();
    this.props.updateCss(`.css-position { background: ${css.toRgbString()}; }`);
  }

  changeBgCss(css) {
    this.props.onChange();
    this.props
      .updateCss(`.css-position {           background-image: url(${css});
                      background-size: cover;
                      background-position: center;
                      background-repeat: no-repeat; }`);
  }

  async handleInit() {
    const res = await getImg();
    this.setState({ imgList: res });
  }

  async handleChartDelete(e, name) {
    e.stopPropagation();
    const res = await deleteImg(name);
    if (res) {
      this.handleInit();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.customCss !== nextProps.customCss) {
      this.setState({ css: nextProps.customCss }, () => {
        injectCustomCss(nextProps.customCss);
      });
    }
  }

  componentDidMount() {
    this.handleInit();
  }

  render() {
    const { customCss, topOffset = 0 } = this.props;

    console.log(customCss);

    return (
      <div
        data-test="dashboard-builder-sidepane"
        css={css`
          position: sticky;
          right: 0;
          top: ${topOffset}px;
          height: calc(100vh - ${topOffset}px);
          width: ${BUILDER_PANE_WIDTH}px;
        `}
      >
        <div
          css={theme => css`
            position: absolute;
            height: 100%;
            width: ${BUILDER_PANE_WIDTH}px;
            box-shadow: -4px 0 4px 0 ${rgba(theme.colors.grayscale.dark2, 0.1)};
            background-color: ${theme.colors.grayscale.light5};
          `}
        >
          <Tabs
            data-test="dashboard-builder-component-pane-tabs-navigation"
            id="tabs"
            css={theme => css`
              line-height: inherit;
              margin-top: ${theme.gridUnit * 2}px;
              height: 100%;

              & .ant-tabs-content-holder {
                height: 100%;
                & .ant-tabs-content {
                  height: 100%;
                }
              }
            `}
          >
            <Tabs.TabPane
              key={1}
              tab={t('Charts')}
              css={css`
                height: 100%;
              `}
            >
              <SliceAdder />
            </Tabs.TabPane>
            <Tabs.TabPane key={2} tab={t('Layout elements')}>
              <div css={css`
                  display: flex;
                  flex-wrap: wrap;
                `}>
                <div css={css`width: 50%`}><NewTabs /></div>
                <div css={css`width: 50%`}><NewRow /></div>
                <div css={css`width: 50%`}><NewColumn /></div>
                <div css={css`width: 50%`}><NewHeader /></div>
                <div css={css`width: 50%`}><NewMarkdown /></div>
                <div css={css`width: 50%`}><NewDivider /></div>
              </div>
              <ul
                css={css`
                  display: flex;
                  align-items: flex-start;
                  flex-wrap: wrap;
                  list-style: none;
                  margin: 0;
                  padding: 16px;
                `}
              >
                {this.state.colorList.map(color => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    onClick={this.changeCss.bind(this, color)}
                    key={color}
                    css={css`
                      width: 32px;
                      height: 32px;
                      background-color: ${color};
                      margin-right: 16px;
                      cursor: pointer;
                      box-sizing: content-box;
                      position: relative;
                    `}
                    >
                    <div></div>
                  </li>
                ))}
                <ColorPicker
                  onChange={this.changeAntdCss.bind(this)}
                  format={'rgb'}
                />
              </ul>
              <ul
                css={css`
                  display: flex;
                  align-items: flex-start;
                  flex-wrap: wrap;
                  list-style: none;
                  margin: 0;
                  padding: 16px;
                  height: 400px;
                  overflow-y: auto
                `}
              >
                {this.state.imgList.map(img => (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    onClick={this.changeBgCss.bind(
                      this,
                      `${window.location.origin + '/' + img}`,
                    )}
                    key={img}
                    css={css`
                      width: calc(50% - 16px);
                      height: 50px;
                      border: 4px solid ${'#F7F7F7'};
                      background-image: url(${window.location.origin +
                      '/' +
                      img});
                      background-size: cover;
                      background-position: center;
                      background-repeat: no-repeat;
                      margin-right: 16px;
                      margin-bottom: 10px;
                      cursor: pointer;
                      box-sizing: content-box;
                      position: relative;
                      :nth-child(2n) {
                        margin-right: 0;
                      }
                    `}
                    >
                    <div
                      css={css`
                        cursor: pointer;
                        position: absolute;
                        color: ${'#fff'};
                        right: 0;
                        top: 0;
                        padding: 2px 4px;
                        background-color: ${'#ff4d4f'};
                        cursor: pointer;
                      `}
                      onClick={e => this.handleChartDelete(e, img)}
                    >
                      <CloseOutlined role="button" />
                    </div>
                  </li>
                ))}
              </ul>
              <Upload
                action="/api/v1/dashboard/upload_static_images"
                onChange={this.handleInit.bind(this)}
              >
                <div
                  css={css`
                    width: 333px;
                    height: 50px;
                    border: 4px solid ${'#F7F7F7'};
                    margin-left: 16px;
                    cursor: pointer;
                    box-sizing: content-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  上传
                </div>
              </Upload>
              {dashboardComponents
                .getAll()
                .map(({ key: componentKey, metadata }) => (
                  <NewDynamicComponent
                    metadata={metadata}
                    componentKey={componentKey}
                  />
                ))}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default BuilderComponentPane;
