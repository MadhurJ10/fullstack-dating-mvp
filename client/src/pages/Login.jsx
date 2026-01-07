function Login() {
  const login = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        
        <h2 className="text-3xl font-semibold text-gray-900">
          Dating MVP
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Connect with people around you
        </p>

        
        <div className="my-6 h-px bg-gray-200" />

        
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition active:scale-95"
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        
        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Login;
