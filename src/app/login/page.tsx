import styles from '../styles/login.module.css';




const LoginPage = () => {
  // don't write any code here

  return (
    <div>
      {/* start your code below! */}
      <div className={styles.container}>
        <form className={styles['login-form']}>
          <h2>Login</h2>
          <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
        />
          </div>
          <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="********"
        />
          </div>
          <div>
        <button type="button">
          Sign In
        </button>
          </div>
        </form>
      </div>
     <div>

     </div>

     {/* end your code above! */}
     {/* don't use over 2 divs */}
    </div>
  );
};

export default LoginPage;
