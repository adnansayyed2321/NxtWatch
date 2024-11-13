import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import { useCallback, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { DETAIL_VIDEO_URL } from "../../utils/constants"
import Shimmer from "../Shimmer/Shimmer"
import ReactPlayer from 'react-player'
import { TbPointFilled } from "react-icons/tb";
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { MdOutlinePlaylistAdd } from "react-icons/md";


const DetailVideo = () => {

    const [videoDetails,setVideoDetails] = useState({})
    const [like,setLike] = useState(false)
    const [dislike,setDislike] = useState(false)
    const {id} = useParams()
    const token = Cookies.get("jwt_token")
    const publishedAt = new Date(videoDetails.published_at).getFullYear()
    const currentYear = new Date().getFullYear()

    const handelLike = () => {
        if(like){
            setLike(false)
        }else{
            setLike(true)
            setDislike(false)
        }
    }

    const handelDisLike = () => {
        if (dislike){
            setDislike(false)
        }else{
            setDislike(true)
            setLike(false)
        }
    }

    const getVideoDetails = useCallback ( async () => {
        const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        }
        try{
            const response = await fetch(DETAIL_VIDEO_URL+id,options)
            if(response.ok){
                const data = await response.json()
                setVideoDetails(data.video_details)
                console.log(data.video_details)
                // console.log(Object.keys(videoDetails).length)
            }else{
                const data = await response.json()
                console.log(data.error_msg)
            }
        }catch{
            console.log("An error occured try again")
        }
    },[id, token])

    useEffect(()=>{
        // console.log(Object.keys(videoDetails).length)
        getVideoDetails()
    },[getVideoDetails])

    return (
        <div className="flex w-full ">
        <Sidebar/>
        <div className="pt-18 p-9 w-4/5  overflow-y-auto h-screen">
        {
            Object.keys(videoDetails).length === 0 ? <Shimmer/> :
            <div className="flex flex-col gap-5"> 
                <div className="pt-12 w-full ">
                    <ReactPlayer className="bg-gray-300 rounded-md" width="80%" height ="520px" url={videoDetails.video_url} controls/> 
                </div>
                <h1 className="text-xl font-medium">{videoDetails.title}</h1>
                <div className="flex items-center justify-between mr-9">
                    <p className="text-gray-500 flex items-center gap-1">{videoDetails.view_count} views <TbPointFilled className="text-gray-500"/> {currentYear-publishedAt} years ago</p>
                    <div className="flex items-center gap-10">
                        <button onClick={handelLike} className = {`flex items-center gap-2 ${like && "text-blue-600" } `}><GrLike /> Like</button>
                        <button onClick={handelDisLike} className = {`flex items-center gap-2 ${dislike && "text-blue-600" } `}><GrDislike /> Dislike</button>
                        <button className="flex items-center gap-2"><MdOutlinePlaylistAdd className="text-2xl" />Save</button>
                    </div>
                </div>
                <hr className="bg-gray-400 h-1 border-0"/>
                <div className="flex items-start gap-3">
                    <img className="w-14" src ={videoDetails.channel.profile_image_url} alt ="profile"/>
                    <div className="flex flex-col">
                        <p className="font-medium">{videoDetails.channel.name}</p>
                        <p className="text-sm">{videoDetails.channel.subscriber_count} subscribers</p>
                        <p className="pt-4">{videoDetails.description}</p>
                    </div>
                </div>
            </div>
        }
        </div>
       
    </div>
    )
}

export default DetailVideo