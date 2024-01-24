import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import bg from '../../../../assets/images/introduce.jpg';
import { Progress, Space, Tag, ConfigProvider } from 'antd';
import Marquee from "react-fast-marquee";
import { get_local_account, set_local_account } from '../../../../auths/local_storage';
import { banner_footer, banner_header } from '../../components/marquee';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            profile: {
                level: 1,
                exp: 10,
                coin: 3,
                store_present: [
                    { id: 1, name: 'Thẻ cào ', price: '10.000', quantity: 2, status: 'Chưa nhận', img: 'card.png', create_at: '' },
                    { id: 2, name: 'Thẻ cào ', price: '20.000', quantity: 2, status: 'Chưa nhận', img: 'card.png', create_at: '' },
                    { id: 3, name: 'Thẻ cào ', price: '50.000', quantity: 3, status: 'Chưa nhận', img: 'card.png', create_at: '' },
                    { id: 4, name: 'Thẻ cào ', price: '100.000', quantity: 2, status: 'Chưa nhận', img: 'card.png', create_at: '' },
                    { id: 5, name: 'Chúc bạn may mắn lần sau ', price: '0.0', quantity: 1, status: 'Chưa nhận', create_at: '' },
                ],
                my_present: [],
                history: [],
                is_facebook: false,
            },
            status_profile: true,
        }
    }
    async componentDidMount() {
        this.handle_profile();
        this.handle_progress();
    }
    handle_profile = async () => {
        let data = await get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data == null) {
            set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER, this.state.profile);
            this.setState({ status_profile: true });
        }
    }
    handle_progress = () => {
        const intervalProgress = setInterval(() => { this.set_progress() }, 30);
        this.setState({ intervalProgress });
        return () => clearInterval(intervalProgress);
    }
    set_progress = () => {
        let percent_current = this.state.percent;
        if (this.state.status_profile == true) {
            if (percent_current >= 0 && percent_current < 100) {
                this.setState({
                    percent: percent_current + 1,
                })
            } else {
                clearInterval(this.state.intervalProgress);
                this.props.history.push(`/home/main`);
            }
        }

    }
    render() {
        return (
            <div className='h-full w-full flex flex-col bg-cover bg-center font-semibold'
                style={{ backgroundImage: `url(${bg})` }}>
                {banner_header()}
                <main className='flex-1 flex items-center justify-center '>
                    <Space direction="vertical" className='flex items-center justify-center space-y-[10px]'>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorText: '#080707',
                                },
                            }}
                        >
                            <Progress type="circle" size={180} strokeWidth={6}
                                strokeColor={{
                                    '0%': '#cbed07',
                                    '50%': '#76ed07',
                                    '100%': '#07ed41',
                                }}
                                percent={this.state.percent} />
                        </ConfigProvider>
                        <Tag color="#02cf3f" className='animate-bounce text-[16px]' >
                            ... Xin vui lòng chờ trong giây lát ...
                        </Tag>
                    </Space>
                </main>
                {banner_footer()}
            </div>
        );
    }

}
export default withRouter(index);
