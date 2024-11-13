import { useParams } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import { useCallback, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { DETAIL_VIDEO_URL } from "../../utils/constants"
import Shimmer from "../Shimmer/Shimmer"
import ReactPlayer from 'react-player'

const DetailVideo = () => {

    const [videoDetails,setVideoDetails] = useState({})
    const {id} = useParams()
    const token = Cookies.get("jwt_token")

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
        <div className="pt-16 p-9 w-4/5  overflow-y-auto h-screen">
        {
            Object.keys(videoDetails).length === 0 ? <Shimmer/> :
            <div className="flex flex-col gap-5"> 
                <div className="pt-10  w-full">
                    <ReactPlayer width="80%" height ="520px" url={videoDetails.video_url} controls/> 
                </div>
            </div>
        }
        </div>
       
    </div>
    )
}

export default DetailVideo