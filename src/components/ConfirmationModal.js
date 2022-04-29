import { XIcon } from "@heroicons/react/outline";
import React from "react";

const ConfirmationModal = ({ modalHandle, showModal, data, handleOkay }) => {
  return (
    <>
      <div
        className={
          showModal
            ? "w-screen h-screen bg-black bg-opacity-40 fixed zindex1000"
            : "hidden"
        }
      ></div>
      <div
        className={
          showModal
            ? "rounded-lg shadow-lg p-3 zindex2000 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "hidden"
        }
      >
        <div className="border-b relative pb-3">
          <p className="font-bold text-lg ">{data.title}</p>
          <XIcon
            className="h-6 w-6 absolute top-0 right-0 cursor-pointer"
            onClick={() => {
              modalHandle(false);
            }}
          />
        </div>

        <div className="py-3">
          {data.body}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              modalHandle(false);
            }}
            className="bg-red-500 duration-200 w-20 py-2 hover:bg-red-700 rounded-lg text-white font-bold"
          >
            Cancel
          </button>
          <button className="bg-green-600 duration-200 w-20 py-2 hover:bg-green-700 rounded-lg text-white font-bold"
            onClick={() => { handleOkay(data.member.uid, data.type) }}>
            Okay
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
