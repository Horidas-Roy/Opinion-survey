/* eslint-disable react/prop-types */

const Comment = ({ comment }) => {
  return (
    <div className="border-2 m-2 p-4 rounded-lg">
      <h2>Name: {comment?.username}</h2>
      <p className="text-base">comment: {comment?.content}</p>
      <h2 className="text-base">Time: {comment?.timestamp}</h2>
    </div>
  );
};

export default Comment;
