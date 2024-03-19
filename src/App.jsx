import PropTypes from "prop-types";
import { useState } from "react";

const initialFriends = [
  {
    id: 14569,
    name: "Taylor Green",
    balance: 7,
    photo_url: "https://i.pravatar.cc/50?u=14569",
  },
  {
    id: 39532,
    name: "Dustin Jackson",
    balance: -20,
    photo_url: "https://i.pravatar.cc/50?u=39532",
  },
  {
    id: 95394,
    name: "Walter Brown",
    balance: 0,
    photo_url: "https://i.pravatar.cc/50?u=95394",
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showFriendForm, setShowFriendFrom] = useState(false);

  function handleShowFriendForm() {
    setShowFriendFrom(!showFriendForm);
  }

  function handleAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
    setShowFriendFrom(!showFriendForm);
  }

  const userAvatars = friends.map((friend) => (
    <UserAvatar key={friend.id} friend={friend} />
  ));

  return (
    <>
      <div className="app">
        <div className="side-bar">
          <ul>{userAvatars}</ul>
          {showFriendForm && <AddFriendForm addFriend={handleAddFriend} />}
          <button className="btn add-btn" onClick={handleShowFriendForm}>
            {showFriendForm ? "Close" : "Add Friend"}
          </button>
        </div>
        <div className="main-content">
          <SplitBillForm friend={friends[0]} />
        </div>
      </div>
    </>
  );
}

function UserAvatar({ friend }) {
  return (
    <li className="friend-info">
      <img src={friend.photo_url} alt={friend.name} />
      <div className="content">
        <h3>{friend.name}</h3>
        {friend.balance > 0 && (
          <p className="green">{`${friend.name} owes you $${friend.balance}`}</p>
        )}
        {friend.balance == 0 && <p>{`${friend.name} and you are even`}</p>}
        {friend.balance < 0 && (
          <p className="red">{`You owe ${friend.name} $${Math.abs(
            friend.balance
          )}`}</p>
        )}
      </div>
      <button className="btn">Select</button>
    </li>
  );
}

UserAvatar.propTypes = {
  friend: PropTypes.object.isRequired,
};

function AddFriendForm({ addFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/50");

  function handleFormSubmission(e) {
    e.preventDefault();

    if (!name || !imgUrl) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      balance: 0,
      photo_url: `${imgUrl}?u${id}`,
    };

    addFriend(newFriend);
    setName("");
    setImgUrl("https://i.pravatar.cc/50");
  }
  return (
    <form className="add-friend-form" onSubmit={handleFormSubmission}>
      <label htmlFor="name">Friend Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="img-url">Image Url:</label>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <input className="btn" type="submit" value="Add" />
    </form>
  );
}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func,
};

function SplitBillForm({ friend }) {
  return (
    <>
      <h1>{`Split a Bill with ${friend.name}`}</h1>
      <form className="split-bill-form">
        <label>Bill value</label>
        <input type="number" />
        <label>Your Expense</label>
        <input type="number" />
        <label>{`${friend.name}'s Expense`}</label>
        <input type="number" />
        <label>Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <input type="submit" value="Split Bill" className="btn add-btn" />
      </form>
    </>
  );
}

SplitBillForm.propTypes = {
  friend: PropTypes.object,
};

export default App;
