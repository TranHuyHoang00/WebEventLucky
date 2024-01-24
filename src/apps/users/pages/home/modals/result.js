import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import img_no_coin from '../../../../../assets/images/no_coin.jpg';
import img_level_up from '../../../../../assets/images/level_up.jpg';
import img_present from '../../../../../assets/images/present.jpg';
import img_good_luck_again from '../../../../../assets/images/good_luck_again.jpg';
import img_card from '../../../../../assets/images/card.png';
class result extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    handle_onOK = (type_modal_result, data_modal_result) => {
        if (type_modal_result == 'no_coin' || type_modal_result == 'level_up') {
            this.props.handle_envelope(false, 'close');
        } else {
            if (data_modal_result.id == 5) {
                this.props.handle_envelope(false, 'close');
            } else {
                this.props.handle_envelope(false, 'close');
                this.props.handle_my_present(true);
            }
        }
    }
    render() {
        let type_modal_result = this.props.type_modal_result;
        let data_modal_result = this.props.data_modal_result;
        return (
            <Modal width={320} style={{ top: 20 }} title="Thông báo"
                open={this.props.status_modal_result}
                okText={(type_modal_result == 'present' && data_modal_result && data_modal_result.id !== 5) ? "Nhận ngay" : "Đã hiểu"} okType={"default"}
                onOk={() => this.handle_onOK(type_modal_result, data_modal_result)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_envelope(false, 'close')}>
                {type_modal_result == 'no_coin' &&
                    <div className='h-[400px]  bg-cover bg-center'
                        style={{ backgroundImage: `url(${img_no_coin})` }}>
                    </div>
                }
                {type_modal_result == 'level_up' &&
                    <div className='h-[400px]  bg-cover bg-center'
                        style={{ backgroundImage: `url(${img_level_up})` }}>
                    </div>
                }
                {type_modal_result == 'present' && data_modal_result && data_modal_result.id == 5 &&
                    <div className='h-[400px]  bg-cover bg-center'
                        style={{ backgroundImage: `url(${img_good_luck_again})` }}>
                    </div>
                }
                {type_modal_result == 'present' && data_modal_result && data_modal_result.id !== 5 &&
                    <div className='h-[400px]  bg-cover bg-center flex items-center justify-center'
                        style={{ backgroundImage: `url(${img_present})` }}>
                        <div className='text-center text-white '>
                            <label className='text-[20px] italic text-[#ffea03] '>Chúc mừng bạn đã trúng</label><br />
                            <div className='flex items-center justify-center my-[6px]'><img src={img_card} className='h-[150px] w-auto' /></div>
                            <label className='text-[18px] '>{data_modal_result.name}</label><br />
                            <label className='text-[14px] '>
                                Giá trị : <span className='text-[#ffea03] italic'>{data_modal_result.price} vnđ</span>
                            </label><br />
                            <label className='text-[14px] '>Số lượng : <span className='text-[#ffea03] italic'>1 cái</span></label>
                        </div>
                    </div>
                }
            </Modal>
        );
    }

}
export default withRouter(result);
