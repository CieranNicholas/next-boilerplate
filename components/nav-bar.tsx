'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/session-provider';
import { useAuthValidation } from '@/hooks/useAuthValidation';

import { deleteCookie } from 'cookies-next';

export default function Navbar() {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { isValid } = useAuthValidation();
	const { logout, user } = useAuth();

	console.log(user);

	const handleLogin = () => {
		router.push('/auth');
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<nav className='flex items-center justify-between px-8 py-4 bg-background fixed w-full'>
			<Link href='/'>
				<div className='text-2xl font-bold'>App Title</div>
			</Link>
			<div>
				{!isValid ? (
					<Button onClick={handleLogin}>Login</Button>
				) : (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage src='' alt='@shadcn' />
								<AvatarFallback className='uppercase'>{user ? Array.from(user.email)[0] : '?'} </AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</nav>
	);
}
