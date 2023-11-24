import './Banner.css'
// import banner1 from '../../../assets/image/banner/banner-1.jpeg'
// import banner2 from '../../../assets/image/banner/b-2.jpeg'
// import banner3 from '../../../assets/image/banner/b-3.jpeg'
// import banner4 from '../../../assets/image/banner/b-4.jpeg'
// import banner5 from '../../../assets/image/banner/b-5.jpeg'
// import banner6 from '../../../assets/image/banner/b-6.jpeg'

const Banner = () => {
    return (
        <div className="banner flex justify-center items-center">
            <div className='text-center'>
                <h2 className='text-6xl text-[#0f1741] font-bold'><span className=' bg-gradient-to-r from-[#e31048] to-[#ff5100] text-transparent bg-clip-text'>Sharing Your Opinion</span> By <br /> Voting Poll & Helps <br /> to Surveying</h2>
                <h2 className='text-xl mt-10 text-[#787d99] font-medium'>Share your valuable insights with the world by voting the surveys <br /> you know and love.</h2>
                <button className='bg-gradient-to-r from-[#e31048] to-[#ff5100] text-white font-bold text-xl py-2 px-4 my-10 rounded-full'>Join Now</button>
            </div>
        </div>
    );
};

export default Banner;