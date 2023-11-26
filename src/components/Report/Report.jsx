/* eslint-disable react/prop-types */

const Report = ({ report }) => {
  return (
    <div className="border-2 m-2 p-4 rounded-lg">
      <h2>Name:{report?.username}</h2>
      <p className="text-base">{report?.content}</p>
      <h2 className="text-base">Time:{report?.timestamp}</h2>
    </div>
  );
};

export default Report;
