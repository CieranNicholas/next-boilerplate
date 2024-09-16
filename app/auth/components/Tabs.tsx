'use client';

import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import LoginTab from './login-tab';
import { ActiveTabType } from '../types';
import SignUpTab from './signup-tab';
import { useAuth } from '@/providers/session-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const TabsComponent = () => {
	const router = useRouter();
	const { setUser, setToken } = useAuth();
	const { toast } = useToast();

	const [activeTab, setActiveTab] = useState<ActiveTabType>('login');

	async function trySignin(email: string, password: string) {
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();
			if (res.ok) {
				const { user, message, token } = data;
				setUser(user);
				setToken(token);
				router.push('/');
				toast({
					title: message,
					description: `Welcome back ${user.name || user.email || ''}.`,
				});
			} else {
				const { message, status } = data;
				toast({
					variant: 'destructive',
					title: message,
					description: `Please try again.`,
				});
			}
		} catch (error) {
			console.error('Login failed');
		}
	}

	async function trySignup(email: string, password: string) {
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();
			if (res.ok) {
				const { message } = data;
				await trySignin(email, password);
			} else {
				const { message, status } = data;
				toast({
					variant: 'destructive',
					title: message,
					description: `Please try again.`,
				});
			}
		} catch (error) {
			console.error('Signup failed');
		}
	}

	return (
		<Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as ActiveTabType)}>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='login'>Login</TabsTrigger>
				<TabsTrigger value='signup'>Sign Up</TabsTrigger>
			</TabsList>
			<LoginTab trySignin={trySignin} />
			<SignUpTab trysignUp={trySignup} />
		</Tabs>
	);
};

export default TabsComponent;
