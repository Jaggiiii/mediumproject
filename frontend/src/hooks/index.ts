import axios from "axios";
import { useEffect, useState } from "react"
import { Backend_Url } from "../config";

 export interface Blog{
    "content": string,
            "title":string,
            "id": number,
            "author": {
             "name": string
            }
}
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const source = axios.CancelToken.source();
  
      axios
        .get(`${Backend_Url}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          setBlog(response.data.blog);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            setError("Failed to fetch blog");
            setLoading(false);
          }
        });
  
      return () => {
        source.cancel("Component unmounted or id changed");
      };
    }, [id]);
  
    return {
      loading,
      blog,
      error,
    };
  };

export const useBlogs =()=>{
    const [loading,setLoading] = useState(true) ;
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${Backend_Url}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])
   return {
          loading,
          blogs
   }

   
}