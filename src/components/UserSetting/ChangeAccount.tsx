import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  passwordCheck: string;
};

const ChangeAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (password !== passwordCheck) {
      setError("passwordCheck", {
        type: "manual",
        message: "密碼和密碼確認不相同",
      });
    } else {
      clearErrors("passwordCheck");
      console.log(data);
      reset();
    }
  };

  console.log(errors);

  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-[5px] mt-8 max-w-[500px]"
    >
      <div>
        <label
          className="flex mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor="EmailAddress"
        >
          電子信箱
        </label>
        <input
          className="bg-[#F8FAFC] block w-full px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="text"
          placeholder="電子信箱"
          {...register("email", {
            required: "請輸入 Email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm italic text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label
          className="flex mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor="changePassword"
        >
          密碼
        </label>
        <input
          className=" bg-[#F8FAFC] block w-full px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="密碼"
          {...register("password", {
            required: "請輸入密碼",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm italic text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label
          className="flex mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor="changePasswordCheck"
        >
          密碼確認
        </label>
        <input
          className=" bg-[#F8FAFC] block w-full px-4 py-2 text-gray-700 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="密碼確認"
          {...register("passwordCheck", {
            required: "請輸入密碼",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long",
            },
          })}
        />
        {errors.passwordCheck && (
          <p className="text-sm italic text-red-500">
            {errors.passwordCheck.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <input
          type="submit"
          value={"確認修改"}
          className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
        />
      </div>
    </form>
  );
};

export default ChangeAccount;
