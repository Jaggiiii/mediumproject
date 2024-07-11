import { Circle } from "../pages/blogcard";

export const MediumSkeleton = () => {
  return (
    <div className="w-3/5 mx-auto">
      <div className="border-b border-slate-200 pb-4 pt-3">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5 mb-4"></div>
          </div>
          <div className="font-extralight text-2xl pl-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
          </div>
          <div className="flex justify-center pl-2 flex-col">
            <Circle />
          </div>
          <div className="pl-2 text-slate-500 text-2xl">
            <div className="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-3">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="pt-4">
          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5 mb-2.5"></div>
        </div>
      </div>
      <div className="border-b border-slate-200 pb-4 pt-3">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5 mb-4"></div>
          </div>
          <div className="font-extralight text-2xl pl-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
          </div>
          <div className="flex justify-center pl-2 flex-col">
            <Circle />
          </div>
          <div className="pl-2 text-slate-500 text-2xl">
            <div className="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-3">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="pt-4">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
      </div>
      <div className="border-b border-slate-200 pb-4 pt-3">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5 mb-4"></div>
          </div>
          <div className="font-extralight text-2xl pl-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
          </div>
          <div className="flex justify-center pl-2 flex-col">
            <Circle />
          </div>
          <div className="pl-2 text-slate-500 text-2xl">
            <div className="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-3">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
        <div className="pt-4">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-2.5"></div>
        </div>
      </div>
    </div>
  );
};
