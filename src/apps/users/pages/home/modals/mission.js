import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Switch, message } from 'antd';
import { FacebookFilled, UserAddOutlined } from '@ant-design/icons';
import img_coin from '../../../../../assets/images/coin.png';

class mission extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    handle_mission = () => {
        message.success('Chia sẻ link cho bạn bè, để nhận thưởng', [10]);

    }
    render() {
        let data_profile = this.props.data_profile;

        return (
            <Modal width={320} style={{ top: 20 }} title="Nhiệm vụ nhận xu"
                open={this.props.status_modal_mission}
                okText={"Đã hiểu"} okType={"default"}
                onOk={() => this.props.handle_mission(false)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_mission(false)}
            >
                <div className='space-y-[10px]'>
                    <div className='border p-[5px] rounded-[5px] shadow-md space-y-[5px] 
                    flex items-center justify-between space-x-[5px]'>
                        <FacebookFilled className='text-[50px] text-blue-500' />
                        <div>
                            <div className='text-[14px] font-[500] italic'>
                                <label>Kết nối facebook</label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center  space-x-[3px]'>
                                    {data_profile.is_facebook == false ?
                                        <span className='text-[12px] font-[600] text-red-600'>Chưa kết nối</span>
                                        :
                                        <span className='text-[12px] font-[600] text-green-600'>Đã kết nối</span>
                                    }

                                    <Switch size="small" disabled
                                        checked={(data_profile.is_facebook == false) ? false : true} />
                                </div>

                            </div>
                        </div>
                        <div className='space-y-[5px]'>
                            <div className='bg-[#3d3d3d] p-[2px] rounded-[5px] flex items-center justify-center'>
                                <img src={img_coin} className='h-[18px] w-[18px]' />
                                <span className='text-[14px] text-white font-[600]'>+2</span>
                            </div>
                            {data_profile.is_facebook == false ?
                                <Button onClick={() => this.props.handle_facebook(true, false)}
                                    className='bg-green-600 text-white w-[80px]' size='small'>Làm ngay</Button>
                                :
                                <Button disabled className='bg-red-600 text-white w-[80px]' size='small'>Đã làm</Button>
                            }
                        </div>
                    </div>
                    <div className='border p-[5px] rounded-[5px] shadow-md space-y-[5px] 
                    flex items-center justify-between space-x-[5px]'>
                        <UserAddOutlined className='text-[50px] text-blue-500' />
                        <div>
                            <div className='text-[14px] font-[500] italic'>
                                <label>Chia sẻ bạn bè</label>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center  space-x-[3px]'>
                                    <span className='text-[12px] font-[600] text-red-600'>Gửi link cho bạn</span>
                                </div>

                            </div>
                        </div>
                        <div className='space-y-[5px]'>
                            <div className='bg-[#3d3d3d] p-[2px] rounded-[5px] flex items-center justify-center'>
                                <img src={img_coin} className='h-[18px] w-[18px]' />
                                <span className='text-[14px] text-white font-[600]'>+2</span>
                            </div>
                            <Button onClick={() => this.handle_mission()}
                                className='bg-green-600 text-white w-[80px]' size='small'>Làm ngay</Button>
                        </div>
                    </div>
                </div>

            </Modal>
        );
    }

}
export default withRouter(mission);
