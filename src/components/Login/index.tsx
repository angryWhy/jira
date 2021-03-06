import * as React from 'react';
import { useAuth } from '../../context/auth-context';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const { login, user } = useAuth();
    //提交事件
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
         login({username,password})
    }
    return (<div>
        <div>
            {
                user?<div>{user.name}</div>:null
            }
        </div>
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                <label htmlFor='username'>用户名</label>
                <input type="text" id='username' />
            </div>
            <div>
                <label htmlFor='password'>密码</label>
                <input type="password" id='password' />
            </div>
            <button type='submit'>登录</button>
        </form>
    </div>)
};

export default Login;
