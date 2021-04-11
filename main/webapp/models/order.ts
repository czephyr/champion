interface product_order {
	product_id: number;
	name: string;
	price: number;
	quantity: number;
	reviewed: boolean;
}

export interface Order {
	id: number;
	customer_id: number;
	date: string;
	ordered: Array<product_order>;
}