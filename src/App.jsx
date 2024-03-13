function App() {
  return <UserAvatar />;
}

function UserAvatar() {
  return (
    <div className="user-info">
      <img src="https://i.pravatar.cc/50" alt="user avi" />
      <div className="content">
        <h3>Wesley Austin</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <button className="btn">Select</button>
    </div>
  );
}

export default App;
