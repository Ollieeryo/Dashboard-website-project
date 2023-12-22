import { useForm, SubmitHandler } from 'react-hook-form';
import { setUser } from '../features/users/userSlice';
import { useSignInMutation } from '../features/api/authApi';
import logo from '../assets/Evercomm-Logo_white-bg1.b340cf95c7968652027b.png';
import green from '../assets/614fbf96ed18cf0f21461d741317950e0c4265ac.webp';
import { useAppDispatch } from '../store/hook';
import Loading from './Loading';
// import background from "../assets/background.png";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  // const loginStatus = useAppSelector((state) => state.auth.login);

  const [signIn, { isError, isLoading }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // hook form 會把輸入 input 的內容放入 data
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn(data);

    if ('data' in res) {
      // 這是成功的響應
      dispatch(setUser(res.data));
    }
  };
  // console.log(errors);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* {loginStatus && <Navigate to="/home" replace={true} />} */}
      <div className="flex justify-between w-1/2 h-1/2 items-center overflow-hidden bg-white rounded-xl shadow-2xl dark:bg-gray-800 ">
        <div className="hidden h-full w-full md:block lg:block">
          <img src={green} alt="green" className="object-cover w-full h-full" />
        </div>

        <div className="w-full h-auto px-6 py-8 md:px-8">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridGap: '5px' }}>
            <div className="mt-4">
              <label
                className="flex mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="email"
              >
                電子信箱
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                id="email"
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm italic text-red-500 font-bold">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                className="flex mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="password"
              >
                密碼
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                id="password"
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters long',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm italic text-red-500 font-bold">{errors.password.message}</p>
              )}
            </div>

            <div className="mt-6">
              <input
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                type="submit"
                value={'登入'}
              />
              {isError && <div className="text-red-500">Error: 帳號或密碼錯誤</div>}
            </div>
          </form>

          <div className="flex items-center justify-between mt-5">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
