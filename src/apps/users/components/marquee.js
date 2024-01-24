import React from 'react';
import Marquee from "react-fast-marquee";

export const banner_footer = () => {
    return (
        <div>
            <footer className='bg-black bg-opacity-50 px-[10px] py-[3px] '>
                <Marquee speed={40} autoFill className='space-x-[30px]'>
                    <h1 className='text-[#fff305] italic text-[14px]'>
                        Nhân dịp năm mới Giáp Thìn 2024, xin gửi những lời chúc tốt đẹp nhất tới Quý khách hàng. Chúc quý khách năm mới làm ăn phát đạt, gia đình an khang, thịnh vượng và có một năm 2024 hưởng trọn niềm vui bên gia đình! Happy new year!
                    </h1>
                </Marquee>
            </footer>
        </div>
    );
};
export const banner_header = () => {
    return (
        <header className='bg-black bg-opacity-50'>
            <div className='px-[10px] py-[8px] flex items-center justify-between'>
                <Marquee speed={60} autoFill className='space-x-[30px]'>
                    <div className=' flex items-center justify-center space-x-[6px] text-[14px] italic'>
                        <div>
                            <h1 className='text-white  '>
                                Chúc mừng năm mới 2024 :
                            </h1>
                        </div>
                        <div>
                            <span className='text-[#fff305]  '>
                                Mở lì xì ngay - Nhận quà liền tay - Nhanh tay kẻo hết
                            </span>
                        </div>
                        <div>
                            <h1 className='text-white  '>
                                : Sự kiện diễn ra từ ngày 15/01/2024 - đến khi hết quà
                            </h1>
                        </div>
                    </div>
                </Marquee>
            </div>
        </header>
    );
};
