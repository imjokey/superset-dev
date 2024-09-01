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
import { t, css, SupersetTheme } from '@superset-ui/core';
import SliceAdder from 'src/dashboard/containers/SliceAdder';
// eslint-disable-next-line import/no-unresolved
import dashboardComponents from 'src/visualizations/presets/dashboardComponents';
import NewColumn from '../gridComponents/new/NewColumn';
import NewDivider from '../gridComponents/new/NewDivider';
import NewHeader from '../gridComponents/new/NewHeader';
import NewRow from '../gridComponents/new/NewRow';
import NewTabs from '../gridComponents/new/NewTabs';
import NewMarkdown from '../gridComponents/new/NewMarkdown';
import NewDynamicComponent from '../gridComponents/new/NewDynamicComponent';
// import injectCustomCss from 'src/dashboard/util/injectCustomCss';

const BUILDER_PANE_WIDTH = 374;

class BuilderComponentPane extends PureComponent {
  constructor(props) {
    super(props);
    this.changeCss = this.changeCss.bind(this);
  }

  changeCss(css) {
    // console.log(this.props);
    this.props.onChange();
    this.props.updateCss(`body { background: ${css.toRgbString()}; }`);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props.customCss !== nextProps.customCss) {
  //     this.setState({ css: nextProps.customCss }, () => {
  //       injectCustomCss(nextProps.customCss);
  //     });
  //   }
  // }

  render() {
    const { updateCss, customCss, topOffset = 0 } = this.props;

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
              <NewTabs />
              <NewRow />
              <NewColumn />
              <NewHeader />
              <NewMarkdown />
              <NewDivider />
              <ColorPicker onChange={this.changeCss} format={'rgb'} />
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
