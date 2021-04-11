package beans;

import beans.parents.Review;

public class DecoratedReview extends Review {
	String customerName;

	public DecoratedReview() {
	}

	public DecoratedReview(int product_id, String text, String customerName) {
		super(0, product_id, text);
		this.customerName = customerName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
}
