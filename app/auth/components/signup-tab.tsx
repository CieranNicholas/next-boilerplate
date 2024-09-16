'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface IncludedFields {
	name?: boolean;
	username?: boolean;
	email?: boolean;
	password?: boolean;
	confirmPassword?: boolean;
}

interface Props {
	includedFields?: IncludedFields;
	trysignUp: (email: string, password: string) => void;
}

const SignUpTab: React.FC<Props> = ({
	trysignUp,
	includedFields = {
		name: false,
		username: false,
		email: true,
		password: true,
		confirmPassword: false,
	},
}) => {
	const [signupForm, setSignupForm] = useState({
		name: '',
		email: '',
		password: '',
		username: '',
		confirmPassword: '',
	});

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		trysignUp(signupForm.email, signupForm.password);
	};
	return (
		<TabsContent value='signup'>
			<form onSubmit={handleSignUp}>
				<div className='space-y-4'>
					{includedFields.name && (
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								type='text'
								required
								value={signupForm.name}
								onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
							/>
						</div>
					)}
					{includedFields.username && (
						<div className='space-y-2'>
							<Label htmlFor='name'>Username</Label>
							<Input
								id='name'
								type='text'
								required
								value={signupForm.username}
								onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
							/>
						</div>
					)}
					{includedFields.email && (
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								required
								value={signupForm.email}
								onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
							/>
						</div>
					)}
					{includedFields.password && (
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								required
								value={signupForm.password}
								onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
							/>
						</div>
					)}
					{includedFields.confirmPassword && (
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								id='confirmPassword'
								type='password'
								required
								value={signupForm.confirmPassword}
								onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
							/>
						</div>
					)}
				</div>
				<Button type='submit' className='w-full mt-4'>
					Sign Up
				</Button>
			</form>
			<Button variant='secondary' className='w-full mt-4 flex items-center justify-center gap-4'>
				<FcGoogle className='text-lg' />
				<p>Sign Up With Google</p>
			</Button>
		</TabsContent>
	);
};

export default SignUpTab;
