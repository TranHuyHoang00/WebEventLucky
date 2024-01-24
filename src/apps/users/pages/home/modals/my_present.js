import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Result, Switch } from 'antd';
import {
    FacebookFilled
} from '@ant-design/icons';
class my_present extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    handle_get_present = (data_profile) => {
        if (data_profile.is_facebook == false) {
            this.props.handle_facebook(true, false);
        } else {
            this.props.handle_get_present();
        }
    }

    render() {
        let data_profile = this.props.data_profile;
        return (
            <Modal width={350} style={{ top: 20 }} title="Quà của tôi"
                open={this.props.status_modal_my_present}
                okText={"Đã hiểu"} okType={"default"}
                onOk={() => this.props.handle_my_present(false)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_my_present(false)}
            >
                {data_profile && data_profile.my_present && data_profile.my_present.length !== 0 ?
                    <div className='space-y-[10px]'>
                        <div className='flex items-center justify-between'>
                            <Button onClick={() => this.handle_get_present(data_profile)}
                                className='bg-[#05a60b] text-white' size='middle'>Nhận tất cả</Button>
                            <div className='flex items-center justify-center space-x-[3px]'>
                                {data_profile.is_facebook == false ?
                                    <span className='text-[12px] font-[600] text-red-600'>Chưa liên kết</span>
                                    :
                                    <span className='text-[12px] font-[600] text-green-600'>Đã liên kết</span>
                                }
                                <FacebookFilled className='text-[22px] text-blue-500' />
                                <Switch size="small" disabled
                                    checked={(data_profile.is_facebook == false) ? false : true} />
                            </div>
                        </div>
                        <div className='text-[12px]'>
                            <span className='text-red-700'>Lưu ý: Phần quà có thể gửi trễ hơn 24h vì số lượng nhận thưởng quá đông</span>
                        </div>
                        <div className='space-y-[10px] text-[14px]'>
                            {data_profile && data_profile.my_present && data_profile.my_present.map((item, index) => {
                                return (
                                    <div key={index}
                                        className='border p-[5px] space-y-[5px] rounded-[5px] shadow-md'>
                                        <div className='flex items-center space-x-[8px]'>
                                            <div>
                                                <img src={require(`../../../../../assets/images/${item.img}`).default}
                                                    className='h-[80px] w-[80px] border-[2px] border-white rounded-[10px]' />
                                            </div>
                                            <div className='text-[12px]'>
                                                <label className='font-[500] italic underline text-[16px]'>{item.name}</label><br />
                                                <label>Trị giá :
                                                    <span className=' italic  text-[#cf0202]'> {item.price} vnđ</span>
                                                </label><br />
                                                <label>Số lượng :
                                                    <span className=' italic  text-[#cf0202]'> 1 cái</span>
                                                </label><br />
                                                <label>Ngày trúng :
                                                    <span className='italic  text-[#cf0202]'> {item.create_at}</span>
                                                </label><br />
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div className='space-x-[5px]'>
                                                <label>Trạng thái :</label>
                                                {item.status == 'Chưa nhận' ?
                                                    <span className='italic text-[#cf0202] font-[500] '> {item.status}</span>
                                                    :
                                                    <span className='italic text-[#05a60b] font-[500] '> {item.status}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <Result
                        status="403"
                        title="Chưa có"
                        subTitle="Xin lỗi, bạn chưa có phần quà nào"

                    />
                }
            </Modal>
        );
    }

}
export default withRouter(my_present);
