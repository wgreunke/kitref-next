//This is the login page for the users.


import { login } from '@/app/users/action.tsx'

 
export function SignupForm() {
  return (
    <form action={login}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email"    placeholder="email" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}