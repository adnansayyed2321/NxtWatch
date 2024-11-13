import { TbPointFilled } from "react-icons/tb";

const VideoComponent = ({videoDetails}) => {
    const {thumbnail_url,channel,title,view_count,published_at} = videoDetails

    const publishedAt = new Date(published_at).getFullYear()
    const currentYear = new Date().getFullYear()

    return (
        <div className="  w-full flex flex-col gap-3">
            <img className="w-full h-48 rounded-md" src = {thumbnail_url} alt="thumbnail"/>
            <div className="flex gap-3 items-start">
                <img className="rounded-s-full w-10" src ={channel.profile_image_url} alt="channel-pro"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-md ">{title}</h2>
                    <p className="text-gray-500">{channel.name}</p>
                    <p className="text-gray-500 flex items-center gap-1">{view_count} views <TbPointFilled className="text-gray-500"/> {currentYear-publishedAt} years ago</p>
                </div>
            </div>
        </div>
    )
}

export default VideoComponent