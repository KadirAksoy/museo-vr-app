import backgroundImage from "../assets/manzara.jpg";
import AuthForm from "../components/auth/AuthForm";
import { loginUser, LoginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: Record<string, string>) => {
    try {
      const userData: LoginUser = {
        email: values.email,
        password: values.password,
      };
      const response = await loginUser(userData);

      localStorage.setItem("token", response.token);

      navigate("/home");
    } catch (err) {
      setError("Giriş başarısız. Bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-300">
        <AuthForm
          title="Giriş Yap"
          buttonText="Giriş Yap"
          fields={[
            { name: "email", placeholder: "Email", type: "text" },
            { name: "password", placeholder: "Şifre", type: "password" },
          ]}
          isLogin={true}
          onSubmit={handleLogin}
        />
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
