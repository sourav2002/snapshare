import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import PinComments from './PinComments';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [deleteButton, setDeleteButton] = useState(false);

  // const deleteComment = (id) =>{
  //   console.log("comment delete buttton pressed");
  //   setLoading(true);
  //   client
  //     .patch(pinId).unset([`comments[_key=="${id}"]`]).commit()
  //     .then(() => {
  //       fetchPinDetails();
  //       setComment('');
  //       console.log("query complete");
  //     });
  //     setLoading(false);
  // };
  
  

  const fetchPinDetails = () => {
    setLoading(true);
    const query = pinDetailQuery(pinId);
    console.log("pin details fetched....");
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      }).then(()=>{
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);



  const addComment = () => {
    console.log("comment button clicked");
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
        console.log("comment added successfully");
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }
  if (loading) {
    return (
      <Spinner message={`please wait`} />
    );
  }
  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            {/* show the pin image which is clicked to open the details */}
            <img
              className="rounded-t-3xl rounded-b-lg"
              referrerPolicy="no-referrer"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                {/* this is a download button  */}
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              {/* Title of current pin  */}
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              {/* About pin  */}
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            {/* show image and name of the user who is the owner of this pin */}
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            {/* Comment heading line */}
            <PinComments user={user} pinId={pinId} pinDetail={pinDetail} /> 
            {/* important line.................... */}


            <div className="flex flex-wrap mt-6 gap-3">
              {/* user image who is currenly writing a comment */}
              <Link to={`/user-profile/${user._id}`}>
                <img src={user?.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              {/* comment input field */}
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {/* comment button */}
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}>
                {/* if adding comment is true, change html of comment button */}
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* if more similar pins are available, then show "More like this" heading */}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {/* pin pins data is available */}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;