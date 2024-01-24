import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Progress } from 'antd';
import img_card from '../../../../../assets/images/card.png';
import img_iphone from '../../../../../assets/images/iphone.jpg';
import img_smart_watch from '../../../../../assets/images/smart_watch.jpg';
import img_gold from '../../../../../assets/images/gold.jpg';

class store extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const style = {
            background: '#0092ff',
            padding: '8px 0',
        };
        return (
            <Modal width={320} style={{ top: 20 }} title="Phần quà còn lại"
                open={this.props.status_modal_store}
                okText={"Đã hiểu"} okType={"default"}
                onOk={() => this.props.handle_store(false)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_store(false)}
            >
                <div className='grid grid-cols-2'>
                    <div className="p-[5px] " >
                        <div className='border rounded-[5px] p-[8px] shadow-md'>
                            <div className='flex items-center justify-center' >
                                <img src={img_card} className='h-[110px] w-[110px] rounded-[5px]' />
                            </div>
                            <div className='text-center space-y-[5px]'>
                                <div>
                                    <label className='font-[500] italic text-[#e81d02]'>Thẻ cào các loại</label>
                                </div>
                                <Progress strokeColor={'#02c90c'} strokeWidth={12}
                                    size={50} type="circle" format={() => '4550'} percent={70} />
                            </div>
                        </div>
                    </div>
                    <div className="p-[5px] " >
                        <div className='border rounded-[5px] p-[8px] shadow-md '>
                            <div className='flex items-center justify-center' >
                                <img src={img_smart_watch} className='h-[110px] w-[110px] rounded-[5px]' />
                            </div>
                            <div className='text-center space-y-[5px]'>
                                <label className='font-[500] italic text-[#e81d02]'>Smart Watch Z6</label>
                                <Progress strokeColor={'#02c90c'} strokeWidth={12}
                                    size={50} type="circle" format={() => '26'} percent={60} />
                            </div>
                        </div>
                    </div>
                    <div className="p-[5px] " >
                        <div className='border rounded-[5px] p-[8px] shadow-md '>
                            <div className='flex items-center justify-center' >
                                <img src={img_iphone} className='h-[110px] w-[110px] rounded-[5px]' />
                            </div>
                            <div className='text-center space-y-[5px]'>
                                <label className='font-[500] italic text-[#e81d02]'>Iphone 15Pro</label>
                                <Progress strokeColor={'#fa5f16'} strokeWidth={12}
                                    size={50} type="circle" format={() => '6'} percent={50} />
                            </div>
                        </div>
                    </div>
                    <div className="p-[5px] " >
                        <div className='border rounded-[5px] p-[8px] shadow-md '>
                            <div className='flex items-center justify-center' >
                                <img src={img_gold} className='h-[110px] w-[110px] rounded-[5px]' />
                            </div>
                            <div className='text-center space-y-[5px]'>
                                <label className='font-[500] italic text-[#e81d02]'>Vàng 9999</label><br />
                                <Progress strokeColor={'#ed0216'} strokeWidth={12}
                                    size={50} type="circle" format={() => '4'} percent={30} />
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        );
    }

}
export default withRouter(store);
