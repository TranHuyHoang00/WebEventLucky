import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import img_home from '../../../../assets/images/home.jpg';
import img_envelope from '../../../../assets/images/envelope.png';
import img_coin from '../../../../assets/images/coin.png';
import img_avatar from '../../../../assets/images/avatar.jpg';
import img_history from '../../../../assets/images/history.jpg';
import img_store from '../../../../assets/images/store.jpg';
import img_my_present from '../../../../assets/images/my_present.jpg';
import { get_local_account, set_local_account, remove_local_account } from '../../../../auths/local_storage';
import { banner_footer, banner_header } from '../../components/marquee';
import { Space, Avatar, Progress, message } from 'antd';
import { RiAddCircleFill } from "react-icons/ri";
import ModalResult from './modals/result';
import ModalHistory from './modals/history';
import ModalStore from './modals/store';
import ModalMyPresent from './modals/my_present';
import ModalFacebook from './modals/facebook';
import ModalMission from './modals/mission';
var moment = require('moment');

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status_modal_result: false,
            type_modal_result: '',
            data_modal_result: {},
            level_present: false,
            data_profile: {},

            status_modal_history: false,
            status_modal_store: false,
            status_modal_my_present: false,
            status_modal_facebook: false,
            status_modal_mission: false,
            status_re_connect: false,

        }
    }
    async componentDidMount() {
        this.get_time();
        this.handle_profile();
    }
    get_time = () => {
        var current_time = moment();
        var formatted_time = current_time.format('HH:mm - DD/MM/YYYY');
        return formatted_time;
    }
    handle_profile = async () => {
        let data = await get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data !== null) {
            this.setState({ data_profile: data.data });
        } else {
            this.props.history.push(`/home`);
        }
    }
    handle_present = () => {
        let data = this.state.data_profile;
        let name_card = ["Vinaphone", "Viettel", "Mobiphone"]
        let store_present = data.store_present;
        let available_presents = store_present.filter(store_present => store_present.quantity > 0);
        let selected_present;
        if (available_presents.length > 0) {
            let random_index = Math.floor(Math.random() * available_presents.length);
            let random_card = Math.floor(Math.random() * 3);
            let name = name_card[random_card];
            let create_at = this.get_time();

            selected_present = available_presents[random_index];
            selected_present.quantity = selected_present.quantity - 1;
            selected_present.create_at = create_at;
            store_present.forEach(present => {
                if (present.id == selected_present.id) {
                    present.quantity = selected_present.quantity;
                }
            });
            if (selected_present.id !== 5) {
                data.my_present.push(selected_present);
                data.history.push(selected_present);
                selected_present.name = `Thẻ cào ${name}`;
            } else {
                data.history.push(selected_present);
            }
        } else {
            alert('hết quà');
            return;
        }
        return selected_present;
    }
    handle_envelope = (value, type) => {
        if (type == 'open') {
            let selected_present;
            let data_profile = this.state.data_profile;
            let type_modal_result = this.state.type_modal_result;
            let level_present = this.state.level_present;

            if (data_profile.coin > 0) {
                selected_present = this.handle_present();
                type_modal_result = 'present';
                if (data_profile.exp == 100) {
                    type_modal_result = 'level_up';
                    data_profile.level = data_profile.level + 1;
                    data_profile.coin = data_profile.coin + 3;
                    data_profile.exp = 0;
                    level_present = true;
                }
                data_profile.coin = data_profile.coin - 1;
                data_profile.exp = data_profile.exp + 10;
            } else {
                type_modal_result = 'no_coin';
            }
            let result = remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
            if (result == true) {
                set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER, data_profile)
            }
            this.setState({
                data_profile: data_profile,
                status_modal_result: value,
                type_modal_result: type_modal_result,
                level_present: level_present,
                data_modal_result: selected_present,
            });
        } else {
            this.setState({ status_modal_result: value })
            if (this.state.level_present == true) {
                this.setState({
                    status_modal_result: true,
                    level_present: false,
                    type_modal_result: 'present',
                })
            }
        }

    }
    handle_hisroty = (value) => {
        this.setState({ status_modal_history: value })
    }
    handle_store = (value) => {
        this.setState({ status_modal_store: value })
    }
    handle_my_present = (value) => {
        this.setState({ status_modal_my_present: value })
    }
    handle_facebook = (value, result) => {
        let data_profile = this.state.data_profile;
        if (result == false) {
            this.setState({ status_modal_facebook: value })
        } else {
            if (this.state.status_re_connect == true) {
                message.success('Kết nối lại thành công', [5]);
                this.setState({
                    status_modal_facebook: value,
                    data_profile: data_profile,
                })
            } else {
                message.success('Thành công, bấm "Nhận tất cả" để nhận quà', [5]);
                message.success('Thành công, nhận 2 xu', [2]);
                data_profile.is_facebook = true;
                data_profile.coin = data_profile.coin + 2;
                let result = remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
                if (result == true) {
                    set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER, data_profile)
                }
                this.setState({
                    status_modal_facebook: value,
                    data_profile: data_profile,
                })
            }
        }
    }
    handle_get_present = () => {
        let data_profile = this.state.data_profile;
        for (const i of data_profile.my_present) {
            i.status = 'Đang gửi quà';
        }
        let result = remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (result == true) {
            set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER, data_profile)
        }
        this.handle_my_present(false);
        message.success('Quà sẽ được gửi trong vòng 24h về facebook của bạn', [5]);
    }
    handle_mission = (value) => {
        this.setState({ status_modal_mission: value })
    }
    handle_re_connect = (value, value1) => {
        this.setState({
            status_re_connect: value,
            status_modal_facebook: value1,
        })
    }
    render() {
        let data_profile = this.state.data_profile;
        return (
            <div className='h-full w-full flex flex-col bg-cover bg-center font-semibold'
                style={{ backgroundImage: `url(${img_home})` }}>
                <header className='bg-black bg-opacity-40'>
                    <div className='flex items-center justify-between p-[10px]'>
                        <div className='flex items-center justify-center space-x-[5px]'>
                            <div className='border-[2px] border-[#02e31d] rounded-full'>
                                <Avatar shape="circle" src={img_avatar} size={45} />
                            </div>
                            <div >
                                <label className='text-white font-serif text-[14px]'>Level {data_profile.level}</label><br />
                                <Progress steps={10} percent={data_profile.exp} size={[12, 10]} className='border p-[2px] rounded-[2px]'
                                    showInfo={false} strokeColor={'#02e31d'} />
                            </div>
                        </div>
                        <Space className='bg-black bg-opacity-70 px-[8px] py-[5px] rounded-full'>
                            <img src={img_coin} className='w-[30px] h-auto' />
                            <span className='text-[16px] text-white font-[600] '>X {data_profile.coin}</span>
                            <a onClick={() => this.handle_mission(true)}
                                className='text-[28px] text-[#02e31d] '>
                                <RiAddCircleFill />
                            </a>
                        </Space>
                    </div>
                </header>
                <main className='flex-1 '>
                    <div className='flex items-center justify-between p-[10px]'>
                        <div onClick={() => this.handle_store(true)}
                            className='cursor-pointer hover:scale-105 duration-300 transition ease-in-out'>
                            <div className='flex items-center justify-center '>
                                <img src={img_store}
                                    className='h-[60px] w-auto rounded-[10px] animate-wave3 border-[2px] border-white' />
                            </div>
                            <div className='text-center bg-black bg-opacity-70 rounded-[5px]'>
                                <lable className='text-white text-[12px]'>Phần quà</lable>
                            </div>
                        </div>
                        <div onClick={() => this.handle_my_present(true)}
                            className='cursor-pointer hover:scale-105 duration-300 transition ease-in-out'>
                            <div className='flex items-center justify-center '>
                                <img src={img_my_present}
                                    className='h-[60px] w-auto rounded-[10px] animate-wave3 border-[2px] border-white' />
                            </div>
                            <div className='text-center  bg-black bg-opacity-70 rounded-[5px]'>
                                <lable className='text-white text-[12px]'>Quà của tôi</lable>
                            </div>
                        </div>
                        <div onClick={() => this.handle_hisroty(true)}
                            className='cursor-pointer hover:scale-105 duration-300 transition ease-in-out'>
                            <div className='flex items-center justify-center '>
                                <img src={img_history}
                                    className='h-[60px] w-auto rounded-[10px] animate-wave3 border-[2px] border-white' />
                            </div>
                            <div className='text-center  bg-black bg-opacity-70 rounded-[5px]'>
                                <lable className='text-white text-[12px]'>Lịch sử</lable>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div onClick={() => this.handle_envelope(true, 'open')}
                            className='space-y-[5px] cursor-pointer '>
                            <img src={img_envelope} className='h-[180px] w-auto animate-wave1 ' />
                            <div className='flex items-center justify-center bg-black bg-opacity-50 rounded-full'>
                                <button className='bg-[#fca503]
                            border-[#524f4e] border shadow-sm
                             w-full py-[8px] mt-[15px] mx-[10px] my-[5px] rounded-full
                             text-[20px] text-white 
                             animate-bounce'>
                                    MỞ LÌ XÌ
                                </button>
                            </div>
                        </div>
                    </div>

                </main>
                <div className='space-y-[5px]'>
                    {banner_header()}
                    {banner_footer()}
                </div>
                <ModalResult
                    data_modal_result={this.state.data_modal_result}
                    status_modal_result={this.state.status_modal_result}
                    type_modal_result={this.state.type_modal_result}
                    handle_envelope={this.handle_envelope}
                    handle_my_present={this.handle_my_present} />
                <ModalHistory
                    status_modal_history={this.state.status_modal_history}
                    handle_hisroty={this.handle_hisroty}
                    data_profile={this.state.data_profile} />
                <ModalStore
                    status_modal_store={this.state.status_modal_store}
                    handle_store={this.handle_store} />
                <ModalMyPresent
                    status_modal_my_present={this.state.status_modal_my_present}
                    handle_my_present={this.handle_my_present}
                    data_profile={this.state.data_profile}
                    handle_facebook={this.handle_facebook}
                    handle_get_present={this.handle_get_present} />
                <ModalFacebook
                    status_modal_facebook={this.state.status_modal_facebook}
                    handle_facebook={this.handle_facebook} />
                <ModalMission
                    status_modal_mission={this.state.status_modal_mission}
                    handle_mission={this.handle_mission}
                    data_profile={this.state.data_profile}
                    handle_facebook={this.handle_facebook}
                    handle_re_connect={this.handle_re_connect} />
            </div>
        );
    }

}
export default withRouter(index);
