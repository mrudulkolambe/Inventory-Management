import React, { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase_config";
import { PlusIcon, TrashIcon, XIcon } from "@heroicons/react/outline";

const ManageEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "ITEMS", "ITEMS"), (doc) => {
      setEquipments(doc.data().ITEMS);
    });
    return () => {
      unsub();
    };
  }, []);
  const addItem = async () => {
    const docRef = doc(db, "ITEMS", "ITEMS");
    await updateDoc(docRef, {
      ITEMS: arrayUnion(input),
    })
    .then(() => {
      setInput("")
      setShowModal(false)
    })
  };
  const deleteItem = async (item) => {
    const docRef = doc(db, "ITEMS", "ITEMS");
    await updateDoc(docRef, {
      ITEMS: arrayRemove(item),
    });
  };
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
            ? "rounded-lg shadow-lg p-3 zindex2000 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12"
            : "hidden"
        }
      >
        <div className="border-b relative pb-3">
          <p className="font-bold text-lg ">{"Add Item to the list"}</p>
          <XIcon
            className="h-6 w-6 absolute top-0 right-0 cursor-pointer"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </div>

        <div className="py-3 flex justify-center items-center flex-col">
          <label htmlFor="data" className="self-start ml-6">
            {"Add Item to the list"} :
          </label>
          <input
            type="text"
            id="data"
            className="m-auto w-11/12 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-1"
            name="modalDesc"
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toUpperCase());
            }}
            placeholder={"Add Item"}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="bg-red-500 duration-200 w-20 py-2 hover:bg-red-700 rounded-lg text-white font-bold"
          >
            Cancel
          </button>
          <button
            className="bg-green-600 duration-200 w-20 py-2 hover:bg-green-700 rounded-lg text-white font-bold"
            onClick={addItem}
          >
            Okay
          </button>
        </div>
      </div>
      <h1 className="text-white font-bold text-3xl text-center mt-4">
        Manage Equipments
      </h1>
      <div className="mt-11">
        {equipments.map((child) => {
          return (
            <div
              key={child}
              className={
                child.length === 0
                  ? "hidden"
                  : "w-6/12 bg-opacity-40 m-auto text-white bg-gray-500 hover:shadow-lg duration-200 rounded-lg mt-3 p-3 flex justify-between px-12 items-center"
              }
            >
              <p>{child}</p>
              <TrashIcon
                onClick={() => {
                  deleteItem(child);
                }}
                className="cursor-pointer h-5 w-5 stroke-1 text-white"
              />
            </div>
          );
        })}
      </div>
      {
        <div
          onClick={() => {
            setShowModal(true);
          }}
          className="fixed flex justify-center items-center bottom-10 bg-gray-500 right-8 cursor-pointer h-12 w-12 rounded-full"
        >
          <PlusIcon className="stroke-1 text-white h-7 w-7" />
        </div>
      }
    </>
  );
};

export default ManageEquipment;
