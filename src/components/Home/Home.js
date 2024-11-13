import { CiSearch } from "react-icons/ci";
import Sidebar from "../Sidebar/Sidebar"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { VIDEO_LIST_URL } from "../../utils/constants";
import VideoComponent from "../VideoComponent/VideoComponent";
import Shimmer from "../Shimmer/Shimmer";
import { Link } from "react-router-dom";


const Home = () => {
    const [videoList,setVideoList] = useState([])
    const [userInput,setUserInput] = useState("")
    const [filteredList,setFilteredList] = useState([])


    const getVideosList = async () => {
        const token = Cookies.get("jwt_token")
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method: "GET"
        }
        try {
            const response = await fetch(VIDEO_LIST_URL,options)
            const data = await response.json()
            if (response.ok){
                // console.log("success")
                setVideoList(data.videos)
                setFilteredList(data.videos)
                // console.log(data)
            }else{
                console.log(data.error_msg)
            }
            // console.log(data.videos)
        } catch (error) {
            console.log("An error occured try again")
        }
        
    }

    const filterBasedOnSerach = (event) => {
        setUserInput(event.target.value)
        // console.log(userInput)
    }

    useEffect(()=>{
        getVideosList()
    },[])

    useEffect(()=>{
        const filterResults = videoList.filter((e)=>e.title.toLowerCase().includes(userInput.toLowerCase()))
        // console.log(filterResults)
        // console.log("run")
        setFilteredList(filterResults)
        
    },[userInput,videoList])
    

    return (
        <div className="flex w-full">
            <Sidebar/>
            <div className="pt-24   flex flex-col p-9 w-4/5  overflow-y-auto h-screen">
                <div className="border-2 border-gray-500 w-1/4 rounded-md flex fixed">
                    <input value={userInput} onChange={filterBasedOnSerach} className="focus:outline-none focus:border-none py-1 px-2 rounded-l-md w-full" type="search"/>
                    <button className="px-3 text-xl bg-gray-300 rounded-r-md"><CiSearch /></button>
                </div>
                {
                    videoList.length === 0 ? <Shimmer/> :
                    filteredList.length === 0 ? <p  className="grid grid-cols-3 gap-4 pt-12">no results</p> : <div className="grid grid-cols-3 gap-4 pt-12">
                    {filteredList.map((each) => 
                    (<Link key={each.id} to={"video/" + each.id}>
                        <VideoComponent videoDetails={each}/>
                    </Link>)
                    )}
                </div>
                }
                


                
            </div>
        </div>
    )
}

export default Home