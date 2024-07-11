import { Link } from 'react-router-dom';
import { Backend_Url } from '../config';

interface BlogCardProps {
  authorName: string;
  publishedTime: string;
  title: string;
  content: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  publishedTime,
  title,
  content,
  id,
}: BlogCardProps) => {
  return (
    <div>
      <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 pt-3 max-w-screen-lg">
          <div className="flex">
            <div className="flex justify-center flex-col">
              <Avatar name={authorName} />
            </div>
            <div className="font-extralight text-2xl pl-2">
              {authorName}
            </div>
            <div className="flex justify-center pl-2 flex-col">
              <Circle />
            </div>
            <div className="pl-2 text-slate-500 text-2xl">
              {publishedTime}
            </div>
          </div>
          <div className="text-xl font-semibold pt-3">
            {title}
          </div>
          <div className="text-md font-thin">
            {content.slice(0, 100) + ' ...'}
          </div>
          <div className="pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </Link>
    </div>
  );
};

 export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-600"></div>;
}

export function Avatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {initials}
      </span>
    </div>
  );
}
