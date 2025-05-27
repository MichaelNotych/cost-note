import type { ObjectId } from 'mongoose'

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
}
