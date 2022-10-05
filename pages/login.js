import Head from "next/head";
import { useState } from "react";
import { login } from "../services/users";
import Loading from "../components/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [state, setState] = useState({
    error: false,
    message: ""
  })

  const handleSubmit = () => (e) => {
    e.preventDefault();
    setLoading(true);
    login(username, password)
      .then((data) => {
        if (data) {
          document.cookie = `token=${data.token}`;
          window.location.href = "/";
        } else {
          setState({
            error: true,
            message: "Usuari o contrasenya incorrectes"
          })
        }
        setLoading(false);
      })
  };

  return (
    <>
      {loading && <Loading />}
      <div className="px-8 bg-blue-300">
        <Head>
          <title>Login</title>
        </Head>

        <main className='h-screen py-8 flex flex-col flex-1 justify-center items-center'>
          <div className="border-white border rounded-xl p-8 w-5/6 bg-white text-blue-500">
            <h1 className='text-4xl font-bold mb-4 text-center '>Login</h1>
            <form className='flex flex-col' onSubmit={handleSubmit()}>
              <label className='mb-2' htmlFor="username">Usuari</label>
              <input className='mb-4 p-2 rounded' type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label className='mb-2' htmlFor="password">Contrasenya</label>
              <input className='mb-4 p-2 rounded' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {state.error && <p className='text-red-500 text-sm mb-4'>{state.message}</p>}
              <button className='p-2 rounded bg-blue-500 text-white' type="submit">Login</button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;