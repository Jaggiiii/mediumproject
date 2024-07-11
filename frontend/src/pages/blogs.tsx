import { Appbar } from "../components/Appbar"
import { MediumSkeleton } from "../components/mediumskeleton";
import { useBlogs } from "../hooks"
import { BlogCard } from "../pages/blogcard";
export const Blogs =()=>{

    const{loading,blogs} = useBlogs() ;
    if(loading){
        return   <div>
             <Appbar/>
        <div className="flex  justify-center p-4">
            <div className="w-4/5">
         <MediumSkeleton/>
         </div>
        </div>
        </div>
    }
    return <div>
        <Appbar/>
                    <div className="flex  justify-center p-4">
                                <div className="">
                               {
                                blogs.map(blog => <BlogCard
                                     authorName={blog.author.name|| "Anamous"}
                                    title={blog.title}
                                    content={blog.content}
                                    id={blog.id}
                                    key={blog.id}
                                    publishedTime={" 9th july 21:35"}
                                />)
                               }
                                </div>
                        </div>
          </div>
}


