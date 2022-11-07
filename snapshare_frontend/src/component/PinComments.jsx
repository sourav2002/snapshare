import { AiTwotoneDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { client } from "../client";

const PinComments = ({ user, pinId, pinDetail }) => {
  const [loading, setLoading] = useState(false);

  const deleteComment = (id) => {
    console.log("comment delete buttton pressed");
    setLoading(true);
    client
      .patch(pinId)
      .unset([`comments[_key=="${id}"]`])
      .commit()
      .then(() => {
        setLoading(false);
        console.log("query complete");
      });
  };


  if (loading) {
    return <Spinner message={`please wait`} />;
  }
  return (
    <div>
      <h2 className="mt-5 text-2xl">Comments</h2>
      <div className="max-h-370 overflow-y-auto">
        {/* if this pin contains any comment, then iterate through all the comment using map */}
        {pinDetail?.comments?.map((item) => (
        <div
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          key={item._key}
        >
          {/* show the writer of this comment */}
          <img
            src={item.postedBy?.image}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="user-profile"
          />
          {/* name of the user who write this comment */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <p className="font-bold">{item.postedBy?.userName}</p>
              {item.postedBy?._id === user?._id && (
                // delete button
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComment(item._key);
                  }}
                  className="bg-white ml-5 rounded-full w-6 h-6 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
            {/* Actual comment */}
            <p>{item.comment}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PinComments;
