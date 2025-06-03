import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, blockFriendRequest } from "../../../store/actions/friendRequestAction";



const FriendRequestsInbox = () => {
  const dispatch = useDispatch();
  const { pendingRequests } = useSelector(state => state.friends);
  console.log("from inbox",pendingRequests);
  

  const handleAccept = (requestId) => {
    dispatch(acceptFriendRequest(requestId)); // backend logic needed
  };

  const handleBlock = (requestId) => {
    dispatch(blockFriendRequest(requestId)); // backend logic needed
  };

  return (
    <div>
      <h3>Friend Requests</h3>
      {pendingRequests.map((req) => (
        <div key={req._id}>
          <span>{req.senderName}</span>
          <button onClick={() => handleAccept(req._id)}>Accept</button>
          <button onClick={() => handleBlock(req._id)}>Block</button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestsInbox