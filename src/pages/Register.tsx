// src/pages/Register.tsx
import AuthForm from "../components/auth/AuthForm";
import backgroundImage from "../assets/manzara.jpg";
import { registerUser, RegisterUser } from "../api/auth";

const Register = () => {
  const handleRegister = async (values: Record<string, string>) => {
    const userData: RegisterUser = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      birthDate: new Date(values.birthDate),
    };

    try {
      await registerUser(userData);
      alert("Lütfen mailinizden aktivasyon linkine tıklayın.");
    } catch (error) {
      alert("Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.");
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
      <div className="flex-1 flex items-center justify-center bg-slate-300">
        <AuthForm
          title="Üyelik Oluştur"
          buttonText="Kayıt Ol"
          fields={[
            { name: "name", placeholder: "Ad", type: "text" },
            { name: "lastName", placeholder: "Soyad", type: "text" },
            { name: "email", placeholder: "E-posta", type: "email" },
            { name: "password", placeholder: "Şifre", type: "password" },
            { name: "birthDate", placeholder: "Dogum Tarihi", type: "date" },
          ]}
          isLogin={false}
          onSubmit={handleRegister}
        />
      </div>
    </div>
  );
};

export default Register;
