package beans;

public class product_cart {

	private int cart_id;
	private int product_id;
	private int quantity;

	public product_cart(int cart_id, int product_id, int quantity) {
		this.cart_id = cart_id;
		this.product_id = product_id;
		this.quantity = quantity;
	}

	public product_cart() {
	}

	public int getCart_id() {
		return cart_id;
	}

	public void setCart_id(int cart_id) {
		this.cart_id = cart_id;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
