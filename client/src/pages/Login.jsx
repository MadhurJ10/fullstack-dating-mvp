function Login() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;
