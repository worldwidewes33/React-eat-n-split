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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowFriendForm() {
    setShowFriendFrom(!showFriendForm);
  }

  function handleAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
    setShowFriendFrom(!showFriendForm);
  }

  function handleFriendSelect(id) {
    setSelectedFriend((f) => {
      if (!f) {
        return id;
      } else {
        return f === id ? null : id;
      }
    });
  }

  function handleSplitBill(id, expense) {
    const newFriends = friends.map((f) => {
      if (f.id === id) {
        f.balance += expense;
        return f;
      } else {
        return f;
      }
    });

    setFriends(newFriends);
    setSelectedFriend(null);
  }

  const userAvatars = friends.map((friend) => (
    <UserAvatar
      key={friend.id}
      friend={friend}
      onSelect={handleFriendSelect}
      selected={selectedFriend === friend.id}
    />
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
        {selectedFriend && (
          <SplitBillForm
            friend={friends.filter((f) => f.id === selectedFriend)[0]}
            updateBalanceFor={handleSplitBill}
          />
        )}
      </div>
    </>
  );
}

function UserAvatar({ friend, selected, onSelect }) {
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
      <button className="btn" onClick={() => onSelect(friend.id)}>
        {selected ? "Close" : "Select"}
      </button>
    </li>
  );
}

UserAvatar.propTypes = {
  friend: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
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

function SplitBillForm({ friend, updateBalanceFor }) {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const paidByFriend = bill ? bill - paidByUser : 0;
  const [whoIsPlaying, setWhoIsPlaying] = useState("user");

  function splitBill(e) {
    e.preventDefault();

    if (!bill) return;

    updateBalanceFor(
      friend.id,
      whoIsPlaying === "user" ? +paidByFriend : paidByUser * -1
    );
  }

  return (
    <>
      <form className="split-bill-form">
        <h1>{`Split a Bill with ${friend.name}`}</h1>
        <label>Bill value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
        <label>Your Expense</label>
        <input
          type="number"
          value={paidByUser}
          onChange={(e) => setPaidByUser(e.target.value)}
        />
        <label>{`${friend.name}'s Expense`}</label>
        <input type="number" disabled value={paidByFriend} />
        <label>Who is paying the bill</label>
        <select
          value={whoIsPlaying}
          onChange={(e) => setWhoIsPlaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <input
          type="submit"
          value="Split Bill"
          className="btn add-btn"
          onClick={splitBill}
        />
      </form>
    </>
  );
}

SplitBillForm.propTypes = {
  friend: PropTypes.object,
  updateBalanceFor: PropTypes.func,
};

export default App;
