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
import {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { message } from 'antd';

import { styled, t } from '@superset-ui/core';
import { useSingleViewResource } from 'src/views/CRUD/hooks';

import Icons from 'src/components/Icons';
import { StyledIcon } from 'src/views/CRUD/utils';
import Modal from 'src/components/Modal';
import withToasts from 'src/components/MessageToasts/withToasts';
import { CssEditor } from 'src/components/AsyncAceEditor';

import { TemplateObject } from './types';

interface CssTemplateModalProps {
  addDangerToast: (msg: string) => void;
  cssTemplate?: TemplateObject | null;
  onCssTemplateAdd?: (cssTemplate?: TemplateObject) => void;
  onHide: () => void;
  show: boolean;
}

const StyledCssTemplateTitle = styled.div`
  margin: ${({ theme }) => theme.gridUnit * 2}px auto
    ${({ theme }) => theme.gridUnit * 4}px auto;
`;

const StyledCssEditor = styled(CssEditor)`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary.light2};
`;

const TemplateContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.gridUnit * 10}px;

  .control-label {
    margin-bottom: ${({ theme }) => theme.gridUnit * 2}px;
  }

  .required {
    margin-left: ${({ theme }) => theme.gridUnit / 2}px;
    color: ${({ theme }) => theme.colors.error.base};
  }

  input[type='text'] {
    padding: ${({ theme }) => theme.gridUnit * 1.5}px
      ${({ theme }) => theme.gridUnit * 2}px;
    border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};
    border-radius: ${({ theme }) => theme.gridUnit}px;
    width: 80%;
  }
`;

const AiModalContent = styled.div`
  .chatContent {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    user-select: none;
    .tipBox {
      .el-upload__tip {
        color: #606266;
        font-size: 12px;
        line-height: 1.5;
      }
      .tipBoxQusetion {
        color: #c0d9d9;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .content {
      display: flex;
      width: 100%;

      line-height: 40px;
      margin-bottom: 10px;
      .chat {
        max-width: 50%;
        background: #e9f6f9;
        padding: 10px;
        line-height: 1.5;
      }
      .leftChat {
        border-radius: 15px 15px 15px 0;
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .rightChat {
        border-radius: 15px 15px 0 15px;
      }
    }
    .left {
      justify-content: flex-start;
    }
    .right {
      justify-content: flex-end;
    }
    .checkBox {
      width: 80%;
      max-height: 300px;
      background: #e9f6f9;
      border-radius: 10px;
      padding: 6px 10px;
      margin: 10px 0;
      .title {
      }
      .tableBox {
        background: rgba(255, 255, 255, 0.8);
        margin-top: 5px;
        padding: 5px;
        border-radius: 4px;
        .tableItem {
          display: flex;
          align-items: center;
          height: 30px;
          .checkIcon {
            font-size: 24px;
            color: #20a7c9;
            cursor: pointer;
            margin-right: 10px;
          }
          .tableTitle {
            font-weight: bold;
          }
        }
        .checkScroll {
          overflow-y: auto;
          max-height: 185px;
          .tableItem {
            display: flex;
            align-items: center;
            height: 30px;
            .checkIcon {
              font-size: 24px;
              color: #20a7c9;
              cursor: pointer;
              margin-right: 10px;
            }
            .tableTitle {
              font-weight: bold;
            }
          }
        }
        .line {
          border-bottom: 1px solid #dedede;
        }
      }
      .footer {
        display: flex;
        justify-content: flex-end;
        padding-top: 5px;
      }
    }
    .progress {
      width: 100px;
      height: 15px;
      -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) 0/20%;
      background: linear-gradient(#20a7c9 0 0) 0/0% no-repeat #ddd;
      animation: p4 2s infinite steps(6);
      border-radius: 0px;
    }
    @keyframes p4 {
      100% {
        background-size: 120%;
      }
    }
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;

  input[type='text'] {
    padding: ${({ theme }) => theme.gridUnit * 1.5}px
      ${({ theme }) => theme.gridUnit * 2}px;
    border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};
    border-radius: ${({ theme }) => theme.gridUnit}px;
    flex: 1;
  }
`;

const CssTemplateModal: FunctionComponent<CssTemplateModalProps> = ({
  addDangerToast,
  onCssTemplateAdd,
  onHide,
  show,
  cssTemplate = null,
}) => {
  const [disableSave, setDisableSave] = useState<boolean>(true);
  const [currentCssTemplate, setCurrentCssTemplate] =
    useState<TemplateObject | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const isEditMode = cssTemplate !== null;

  // cssTemplate fetch logic
  const {
    state: { loading, resource },
    fetchResource,
    createResource,
    updateResource,
  } = useSingleViewResource<TemplateObject>(
    'css_template',
    t('css_template'),
    addDangerToast,
  );

  // Functions
  const hide = () => {
    setIsHidden(true);
    onHide();
  };

  const onSave = () => {
    if (isEditMode) {
      // Edit
      if (currentCssTemplate?.id) {
        const update_id = currentCssTemplate.id;
        delete currentCssTemplate.id;
        delete currentCssTemplate.created_by;
        delete currentCssTemplate.changed_by;
        delete currentCssTemplate.changed_on_delta_humanized;

        updateResource(update_id, currentCssTemplate).then(response => {
          if (!response) {
            return;
          }

          if (onCssTemplateAdd) {
            onCssTemplateAdd();
          }

          hide();
        });
      }
    } else if (currentCssTemplate) {
      // Create
      createResource(currentCssTemplate).then(response => {
        if (!response) {
          return;
        }

        if (onCssTemplateAdd) {
          onCssTemplateAdd();
        }

        hide();
      });
    }
  };

  const onTemplateNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    const data = {
      ...currentCssTemplate,
      template_name: currentCssTemplate ? currentCssTemplate.template_name : '',
      css: currentCssTemplate ? currentCssTemplate.css : '',
    };

    data[target.name] = target.value;
    setCurrentCssTemplate(data);
  };

  const onCssChange = (css: string) => {
    const data = {
      ...currentCssTemplate,
      template_name: currentCssTemplate ? currentCssTemplate.template_name : '',
      css,
    };
    setCurrentCssTemplate(data);
  };

  const validate = () => {
    if (
      currentCssTemplate?.template_name.length &&
      currentCssTemplate?.css?.length
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  };

  // Initialize
  useEffect(() => {
    if (
      isEditMode &&
      (!currentCssTemplate?.id ||
        (cssTemplate && cssTemplate?.id !== currentCssTemplate.id) ||
        (isHidden && show))
    ) {
      if (cssTemplate?.id !== null && !loading) {
        const id = cssTemplate.id || 0;

        fetchResource(id);
      }
    } else if (
      !isEditMode &&
      (!currentCssTemplate || currentCssTemplate.id || (isHidden && show))
    ) {
      setCurrentCssTemplate({
        template_name: '',
        css: '',
      });
    }
  }, [cssTemplate]);

  useEffect(() => {
    if (resource) {
      setCurrentCssTemplate(resource);
    }
  }, [resource]);

  // Validation
  useEffect(() => {
    validate();
  }, [
    currentCssTemplate ? currentCssTemplate.template_name : '',
    currentCssTemplate ? currentCssTemplate.css : '',
  ]);

  // Show/hide
  if (isHidden && show) {
    setIsHidden(false);
  }

  const divRef = useRef(null);

  const [list, setList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<any>('');
  const [progressStatus, setProgressStatus] = useState<any>(false);
  const [checkList, setCheckList] = useState<any>([]);
  const [checkAllStatus, setCheckAllStatus] = useState<any>(false);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [list, progressStatus]);

  const getList = () => {
    let isType = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === 'list') {
        isType = false;
        break;
      }
    }
    if (isType) {
      message.error('请完成对话');
      return false;
    }
    if (progressStatus) {
      // message.error('');
      return false;
    }
    if (!searchValue) {
      message.error('请输入内容');
      return false;
    }
    let arr = list;
    arr.push({ type: 'right', value: searchValue });
    setList([...arr]);
    setSearchValue('');
    let data = {
      prompt: searchValue,
      temperature: 0.9,
    };
    setProgressStatus(true);
    fetch('https://hit-mitlab.cn:7860/generate_index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res.json());
        }
      })
      .then(function (data) {
        // aiPost(data)
        let arr = data.map((i: any) => {
          return { title: i, checkStatus: false };
        });
        setCheckList([...arr]);
        let newArr = list;
        newArr.push({ type: 'list' });
        setList([...newArr]);
        setProgressStatus(false);
      })
      .catch(function (err) {
        console.log(err);
        setProgressStatus(false);
      });
  };

  const submitList = () => {
    let result = checkList.reduce((acc: any, item: any) => {
      if (item.checkStatus) {
        acc.push(item.title);
      }
      return acc;
    }, []);
    if (result.length > 0) {
      let data = {
        index_list: result,
        database: {
          host: '119.3.226.101',
          post: '1521',
          name: 'orcl',
          user: 'ZHL',
          password: '1234',
        },
        temperature: 0.1,
        max_tokens: 2048,
        top_p: 0.95,
        stop: ['\nObservation:', '\nObservation :'],
      };
      setProgressStatus(true);
      fetch('https://hit-mitlab.cn:7860/generate_table2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(res.json());
          }
        })
        .then(function (data) {
          aiPost(data);
        })
        .catch(function (err) {
          console.log(err);
          setProgressStatus(false);
        });
    } else {
      message.error('请选择指标');
    }
  };

  const sendMethods = () => {
    if (progressStatus) {
      return false;
    }
    if (!searchValue) {
      return false;
    }
    let arr = list;
    arr.push({ type: 'right', value: searchValue });
    setList([...arr]);
    setSearchValue('');
    let data = {
      prompt: searchValue,
      database: {
        host: '119.3.226.101',
        post: '1521',
        name: 'orcl',
        user: 'ZHL',
        password: '1234',
      },
      temperature: 0.1,
      max_tokens: 2048,
      stop: ['\nObservation:', '\nObservation :'],
    };
    setProgressStatus(true);
    fetch('https://hit-mitlab.cn:7860/generate_table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res.json());
        }
      })
      .then(function (data) {
        aiPost(data);
      })
      .catch(function (err) {
        console.log(err);
        setProgressStatus(false);
      });
  };

  const aiPost = (data: any) => {
    fetch('https://data.jokeyshirely.com/api/app/dash/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res.json());
        }
      })
      .then(function (data) {
        let arr = list;
        // arr = arr.pop()
        arr.push({ type: 'left', url: data.dash });
        setList([...arr].filter(item => item.type !== 'list'));
        setProgressStatus(false);
        console.log(list);
      })
      .catch(function (err) {
        console.log(err);
        setProgressStatus(false);
      });
  };

  const toDetails = (i: any) => {
    window.open(i, '_block');
  };

  const checkAll = (is: any) => {
    let arr = checkList;
    arr = arr.map((i: any) => {
      return { ...i, checkStatus: is };
    });
    setCheckList([...arr]);
    setCheckAllStatus(is);
  };

  const isCheck = (is: any, index: any) => {
    let arr = checkList;
    arr[index].checkStatus = is;
    setCheckList([...arr]);
  };

  return (
    <Modal
      disablePrimaryButton={disableSave}
      onHandledPrimaryAction={onSave}
      onHide={hide}
      primaryButtonName={isEditMode ? t('Save') : t('Add')}
      show={show}
      hideFooter={true}
      width="55%"
      title={<h4 data-test="css-template-modal-title">AI分析</h4>}
    >
      {/* <StyledCssTemplateTitle>
        <h4>{t('Basic information')}</h4>
      </StyledCssTemplateTitle> */}
      <AiModalContent>
        <div className="chatContent" ref={divRef}>
          <div className="tipBox">
            <div className="el-upload__tip">示例问句：</div>
            <div
              className="el-upload__tip tipBoxQusetion"
              onClick={() => {
                setSearchValue('2017年第一季度的流动资产合计用柱状图表示');
              }}
            >
              2017年第一季度的流动资产合计用柱状图表示
            </div>
            <div
              className="el-upload__tip tipBoxQusetion"
              onClick={() => {
                setSearchValue('2018年第二季度的商誉用折线图表示');
              }}
            >
              2018年第二季度的商誉用折线图表示
            </div>
          </div>
          {list.map((i: any, index: any) => {
            return (
              <div key={index}>
                {i.type == 'left' && (
                  <div className="content left">
                    <div className="chat leftChat">
                      已经生成图表大屏,
                      <span
                        onClick={() => {
                          toDetails(i.url);
                        }}
                      >
                        请点击查看
                      </span>
                    </div>
                  </div>
                )}
                {i.type == 'right' && (
                  <div className="content right">
                    <div className="chat rightChat">{i.value}</div>
                  </div>
                )}
                {i.type == 'list' && (
                  <div className="checkBox">
                    <div className="title">
                      这些指标可能跟您的问题有关，可以作为分析组件组装故事版：
                    </div>
                    <div className="tableBox">
                      <div className="tableItem line">
                        {checkAllStatus ? (
                          <Icons.CheckboxOn
                            className="checkIcon"
                            iconSize="xl"
                            onClick={() => {
                              checkAll(false);
                            }}
                          />
                        ) : (
                          <Icons.CheckboxOff
                            className="checkIcon"
                            iconSize="xl"
                            onClick={() => {
                              checkAll(true);
                            }}
                          />
                        )}
                        <div className="tableTitle">推荐指标</div>
                      </div>
                      <div className="checkScroll">
                        {checkList.map((i: any, index: any) => {
                          return (
                            <div className="tableItem" key={index}>
                              {i.checkStatus ? (
                                <Icons.CheckboxOn
                                  className="checkIcon"
                                  iconSize="xl"
                                  onClick={() => {
                                    isCheck(false, index);
                                  }}
                                />
                              ) : (
                                <Icons.CheckboxOff
                                  className="checkIcon"
                                  iconSize="xl"
                                  onClick={() => {
                                    isCheck(true, index);
                                  }}
                                />
                              )}
                              <div>{i.title}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="footer">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          submitList();
                        }}
                      >
                        确定
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {progressStatus && <div className="progress"></div>}
        </div>
      </AiModalContent>
      <InputBox>
        <input
          type="text"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            getList();
          }}
        >
          发送
        </button>
      </InputBox>
      {/* <TemplateContainer>
        <div className="control-label">
          {t('Name')}
          <span className="required">*</span>
        </div>
        <input
          name="template_name"
          onChange={onTemplateNameChange}
          type="text"
          value={currentCssTemplate?.template_name}
        />
      </TemplateContainer>
      <TemplateContainer>
        <div className="control-label">
          {t('css')}
          <span className="required">*</span>
        </div>
        <StyledCssEditor
          onChange={onCssChange}
          value={currentCssTemplate?.css}
          width="100%"
        />
      </TemplateContainer> */}
    </Modal>
  );
};

export default withToasts(CssTemplateModal);
