package dataAccess;

import beans.Customer;
import beans.Order;
import beans.Product;
import beans.product_order;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAO extends DAO {

	public ArrayList<Customer> getAll() throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM customer";
		ArrayList<Customer> customers = toArray(query(SQL));
		closeConnection();
		return customers.size() > 0 ? customers : null;
	}

	public boolean deleteUser(int id) throws SQLException {
		startConnection();
		final String SQL = "DELETE FROM customer WHERE customerID=" + id;
		int resultState = update(SQL);
		closeConnection();
		return resultState > 0;
	}

	public Customer checkLogin(String email, String password) throws SQLException {
		startConnection();
		final String SQL = "Select * from customer WHERE customerEmail='" + email + "'AND customerPassword='" + password + "'";
		Customer current = toCustomer(query(SQL));
		closeConnection();
		if (current != null) {
			return current;
		}
		return null;
	}

	public boolean getByEmail(String email) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM customer WHERE customerEmail='" + email + "'";
		ArrayList<Customer> customer = toArray(query(SQL));
		closeConnection();
		return customer.size() == 0;
	}

	public Customer returnByEmail(String email) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM customer WHERE customerEmail='" + email + "'";
		Customer customer = toCustomer(query(SQL));
		closeConnection();
		return customer;
	}

	public Customer createCustomer(String email, String name, String surname, String password, String address) throws SQLException {
		final String SQL = "INSERT INTO customer(customerName, customerSurname, customerEmail, customerPassword, customerAddress, customerisAdmin) values('" + name + "', '" + surname + "', '" + email + "', '" + password + "', '" + address + "', " + "0)";
		startConnection();
		int returned = update(SQL);
		final String SQLQ = "SELECT LAST_INSERT_ID() as id";
		ResultSet newId = query(SQLQ);
		newId.next();
		int newCustomerID = newId.getInt("id");
		final String SQLCart = "INSERT INTO cart (customer_id) values(" + newCustomerID + ")";
		update(SQLCart);
		closeConnection();
		if (returned == 1) {
			ArrayList<Customer> customers = new ArrayList<>();
			customers.add(returnByEmail(email));
			return customers.get(0);

		}
		return null;
	}

	public int checkCart(int id) throws SQLException {
		startConnection();
		final String SQL = "Select SUM(quantity) as SUM FROM (SELECT cartID FROM cart WHERE customer_id=" + id + ") as t1 join product_cart on cartID=product_cart.cart_id";
		ResultSet set = query(SQL);
		if (set != null) {
			set.next();
			int sum = set.getInt("SUM");
			return sum;
		}
		closeConnection();
		return 0;
	}


	public ArrayList<Order> getOrderList(ArrayList<Order> orders) throws SQLException {
		startConnection();
		for (Order singleOrder : orders) {
			final String SQL = "SELECT * from product_order join product p on product_order.product_id = p.productID where order_id=" + singleOrder.getId();
			ArrayList<product_order> ordered = toOrderedProductsArray(query(SQL));
			singleOrder.setOrdered(ordered);
		}
		closeConnection();
		return orders;

	}

	public ArrayList<Order> getOrders(int customerID) throws SQLException {
		startConnection();
		final String SQL = "SELECT orderID FROM orders WHERE customer_id=" + customerID;
		ResultSet set = query(SQL);
		ArrayList<Order> orders = new ArrayList<>();
		if (set != null) {
			while (set.next()) {
				orders.add(new Order(set.getInt("orderID"), 0));
			}
			closeConnection();
			return orders;
		}
		closeConnection();
		return null;
	}

	//private
	private ArrayList<Customer> toArray(ResultSet set) throws SQLException {
		ArrayList<Customer> array = new ArrayList<>();
		while (set.next()) {
			array.add(new Customer(
				set.getInt("customerID"),
				set.getString("customerEmail"),
				set.getString("customerPassword"),
				set.getString("customerName"),
				set.getString("customerSurname"),
				set.getString("customerAddress"),
				set.getBoolean("customerIsAdmin")
			));
		}
		return array;
	}

	private ArrayList<product_order> toOrderedProductsArray(ResultSet set) throws SQLException {
		ArrayList<product_order> array = new ArrayList<>();
		while (set.next()) {
			array.add(new product_order(
				set.getString("productName"),
				set.getInt("product_id"),
				set.getInt("quantity"),
				set.getDouble("productPrice")));
		}
		return array;
	}

	private Customer toCustomer(ResultSet set) throws SQLException {
		Customer customer = null;
		if (set.next()) {
			customer = new Customer(
				set.getInt("customerID"),
				set.getString("customerEmail"),
				set.getString("customerPassword"),
				set.getString("customerName"),
				set.getString("customerSurname"),
				set.getString("customerAddress"),
				set.getBoolean("customerIsAdmin")
			);
		}
		return customer;
	}
}


