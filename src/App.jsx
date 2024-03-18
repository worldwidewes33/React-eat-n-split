import PropTypes from "prop-types";

const users = [
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
  const userAvatars = users.map((user) => (
    <li key={user.id}>
      <UserAvatar user={user} />
    </li>
  ));

  return <ul>{userAvatars}</ul>;
}

function UserAvatar({ user }) {
  return (
    <div className="user-info">
      <img src={user.photo_url} alt={user.name} />
      <div className="content">
        <h3>{user.name}</h3>
        {user.balance > 0 && (
          <p className="green">{`${user.name} owes you $${user.balance}`}</p>
        )}
        {user.balance == 0 && <p>{`${user.name} and you are even`}</p>}
        {user.balance < 0 && (
          <p className="red">{`You owe ${user.name} $${Math.abs(
            user.balance
          )}`}</p>
        )}
      </div>
      <button className="btn">Select</button>
    </div>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default App;
