package beans;

import java.util.ArrayList;

public class Order {

	private int id;
	private int customer_id;
	private String date;
	private ArrayList<product_order> ordered;

	public ArrayList<product_order> getOrdered() {
		return ordered;
	}

	public void setOrdered(ArrayList<product_order> ordered) {
		this.ordered = ordered;
	}

	public Order() {
	}

	public Order(int id, int customer_id) {
		this.id = id;
		this.customer_id = customer_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Order{" +
			"id=" + id +
			", customer_id=" + customer_id +
			", date='" + date + '\'' +
			", ordered=" + ordered +
			'}';
	}
}
