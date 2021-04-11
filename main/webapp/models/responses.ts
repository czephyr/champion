import {Product} from "./product";
import {Customer} from "./customer";
import {Order} from "./order";
import {Review} from "./review";

export interface ArrayProductResponse {
	data: Array<Product>;
	status: number;
}

export interface intArrayResponse {
	data: Array<number>;
}

export interface intResponse {
	data: number;
	status: number;
}

export interface customerResponse {
	data: Customer;
	status: number;
}

export interface customerArrayResponse {
	data: Array<Customer>;
	status: number;
}

export interface booleanResponse {
	data: boolean;
	status: number;
	msg: string;
}

export interface orderArrayReponse {
	data: Array<Order>;
	status: number;
}

export interface reviewArrayResponse {
	data: Array<Review>;
	status: number;
}