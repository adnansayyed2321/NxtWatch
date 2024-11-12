import { IoHome } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";



const Sidebar = () => {
    return (
        <div className=" w-1/5 border-r-2 border-gray-400 h-screen pt-20 flex flex-col justify-between">
            <ul>
                <NavLink to="/"  
                    className={({ isActive }) => 
                    `flex items-center px-10 py-4 gap-4 mx-4 rounded-md ${
                        isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200 bg-white font-semibold'}`}>
                    <IoHome className="text-2xl" />
                    <span className="text-lg ">Home</span>
                </NavLink>
                <NavLink to="/trending"  
                    className={({ isActive }) => 
                    `flex items-center px-10 py-4 gap-4 mx-4 rounded-md ${
                        isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200 bg-white font-semibold'}`}>
                    <FaFire className="text-2xl" />
                    <span className="text-lg ">Trending</span>
                </NavLink>
                <NavLink to="/gaming"  
                    className={({ isActive }) => 
                    `flex items-center px-10 py-4 gap-4 mx-4 rounded-md ${
                        isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200 bg-white font-semibold'}`}>
                    <SiYoutubegaming className="text-2xl" />
                    <span className="text-lg ">Gaming</span>
                </NavLink>
                <NavLink to="/saved-videos"  
                    className={({ isActive }) => 
                    `flex items-center px-10 py-4 gap-4 mx-4 rounded-md ${
                        isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-200 bg-white font-semibold'}`}>
                    <MdOutlinePlaylistAdd className="text-2xl" />
                    <span className="text-lg ">Saved Videos</span>
                </NavLink>
            </ul>
            <div className="flex flex-col gap-2 mx-4 pb-5">
                <h1 className="text-xl font-bold">Contact Us</h1>
                <div className="flex items-center gap-2">
                    <img className="w-8" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="social-media"/>
                    <img className="w-8" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="social-media"/>
                    <img className="w-8" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="social-media"/>
                </div>
                <p className="font-medium">Enjoy ! Now to see your<br/>channels and <br/>recommendation !</p>
            </div>
        </div>
    )
}

export default Sidebar