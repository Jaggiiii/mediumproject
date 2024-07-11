import { Blog } from "../hooks";
import { Avatar } from "../pages/blogcard";
import { Appbar } from "./Appbar";

export const Fullblog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-12 w-full max-w-screen-xl pt-10">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold pt-2">{blog.title}</div>
            <div className="text-slate-500  pt-2">Posted on 5th December</div>
            <div className="pt-2 font-mono text-xl">{blog.content}</div>
          </div>
          <div className="col-span-4 p-4">
            <div className="text-lg font-semibold text-slate-700 mb-2">Author</div>
            <div className="flex items-center">
                <div>
                <Avatar name={blog.author.name || "Anonymous"} />
                </div>              
              <div className="ml-4">
                <div className="text-xl font-bold text-slate-400">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2">
                  Random catchphrase about the author's ability to grab the user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
