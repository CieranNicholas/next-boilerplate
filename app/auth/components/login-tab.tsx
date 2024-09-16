'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { LoginForm } from '../types';
import { Button } from '@/components/ui/button';

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/session-provider';

interface Props {
	trySignin: (email: string, password: string) => void;
}

const LoginTab: React.FC<Props> = ({ trySignin }) => {
	const router = useRouter();
	const { setUser, setToken } = useAuth();

	const [loginForm, setLoginForm] = useState<LoginForm>({
		email: '',
		password: '',
	});

	async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		trySignin(loginForm.email, loginForm.password);
	}

	return (
		<TabsContent value='login'>
			<form onSubmit={handleLogin}>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							required
							onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
							value={loginForm.email}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							required
							value={loginForm.password}
							onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
						/>
					</div>
				</div>
				<Button type='submit' className='w-full mt-4'>
					Login
				</Button>
			</form>
			<Button variant='secondary' className='w-full mt-4 flex items-center justify-center gap-4'>
				<FcGoogle className='text-lg' />
				<p>Sign In With Google</p>
			</Button>
		</TabsContent>
	);
};

export default LoginTab;
