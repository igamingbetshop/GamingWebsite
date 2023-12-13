import { SocialUser } from './user';
import { LoginOpt } from '../social-auth.service';

export interface LoginProvider {
	initialize(): Promise<void>;
	getLoginStatus(): Promise<SocialUser>;
	signIn(opt?: LoginOpt): Promise<SocialUser>;
	signOut(revoke?: boolean): Promise<any>;
}

