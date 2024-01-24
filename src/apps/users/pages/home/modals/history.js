import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Collapse, ConfigProvider, Result } from 'antd';

class history extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_profile = this.props.data_profile;
        return (
            <Modal width={320} style={{ top: 20 }} title="Lịch sử"
                open={this.props.status_modal_history}
                okText={"Đã hiểu"} okType={"default"}
                onOk={() => this.props.handle_hisroty(false)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_hisroty(false)}
            >
                {data_profile && data_profile.history && data_profile.history.length !== 0 ?
                    <ConfigProvider
                        theme={{
                            token: {
                                colorTextHeading: '#0240f7',
                            },
                        }}
                    >
                        <Collapse size='small'>
                            {data_profile && data_profile.history && data_profile.history.map((item, index) => {
                                return (
                                    <Collapse.Panel header={(item.id !== 5) ? `${item.name} - ${item.price} vnđ` : `${item.name}`} key={index}>
                                        <div>
                                            <label>* Phần quà : <span className='text-[14px] italic underline text-[#cf0202] '>{item.name}</span></label><br />
                                            <label>* Trị giá : <span className='text-[14px] italic underline text-[#cf0202] '>{item.price} vnđ</span></label><br />
                                            <label>* Ngày trúng : <span className='text-[14px] italic underline text-[#cf0202] '>{item.create_at}</span></label><br />
                                            <label>* Số lượng : <span className='text-[14px] italic underline text-[#cf0202] '>1 cái</span></label><br />
                                        </div>
                                    </Collapse.Panel>
                                )
                            })}
                        </Collapse>
                    </ConfigProvider>
                    :
                    <Result
                        status="403"
                        title="Chưa có"
                        subTitle="Xin lỗi, bạn chưa có lịch sử nào"

                    />
                }

            </Modal>
        );
    }

}
export default withRouter(history);
