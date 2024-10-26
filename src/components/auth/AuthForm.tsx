import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  title: string;
  buttonText: string;
  fields: { name: string; placeholder: string; type: string }[];
  onSubmit: (values: Record<string, string>) => void;
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  fields,
  onSubmit,
  isLogin,
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white rounded-lg w-full max-w-md shadow-md h-128"
    >
      <h2 className="mb-6 text-2xl font-semibold text-center">{title}</h2>
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-md"
        />
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg"
      >
        {buttonText}
      </button>

      <div className="flex items-center justify-center mt-4">
        {isLogin ? (
          <>
            <h1 className="mr-2">Üye değil misin?</h1>
            <button
              className="font-bold underline"
              onClick={() => navigate("/register")}
            >
              Üyelik oluştur
            </button>
          </>
        ) : (
          <>
            <h1 className="mr-2">Zaten üye misin?</h1>
            <button
              className="font-bold underline"
              onClick={() => navigate("/")}
            >
              Giriş yap
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
