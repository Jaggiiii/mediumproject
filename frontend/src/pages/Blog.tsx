import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { Fullblog } from "../components/Fullblog";
import { Skeleton } from "../components/skeleton";
import { Appbar } from "../components/Appbar";

export const Blog =()=>{
  const {id}= useParams();
  const {loading,blog}= useBlog({
    id: id || ""
  });
 

  if(loading){
    return <div> 
      <Appbar/>
      <div className=" h-screen flex  flex-col justify-center">
        <div className="flex justify-center">
        <Skeleton/>
        </div>
      </div>
    </div>
  }
  return <div>
    <Fullblog  blog ={blog}/>
  </div>

  
}