import { useNavigate } from "react-router-dom";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  if (!user) {
    return <h1>No user logged in</h1>;
  }

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <div>
      <h1>Profile</h1>

      <p>
        Username: {user.username}
      </p>

      <p>
        Email: {user.email}
      </p>
      <button onClick={logout}>
  Logout
</button>
    </div>
    
  );
}

export default Profile;