function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <h1>No user logged in</h1>;
  }

  return (
    <div>
      <h1>Profile</h1>

      <p>
        Username: {user.username}
      </p>

      <p>
        Email: {user.email}
      </p>
    </div>
  );
}

export default Profile;