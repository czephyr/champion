package dataAccess;

import beans.Customer;
import beans.Product;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CartDAO extends DAO {

	public ArrayList<Product> getAllCart(int id) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product JOIN (SELECT product_id, quantity FROM (SELECT cartID FROM cart JOIN customer c on cart.customer_id = c.customerID WHERE customer_id = " + id + ") as t1 JOIN product_cart on cart_id=cartID) as t2 on product_id=product.productID;";
		ArrayList<Product> products = toCartArray(query(SQL));
		closeConnection();
		return products.size() > 0 ? products : null;
	}

	public boolean removeFromCart(int uid, int itemID) throws SQLException {
		startConnection();
		final String SQL = "DELETE from product_cart WHERE product_id =" + itemID + " AND cart_id = (SELECT DISTINCT cartID from cart WHERE customer_id=" + uid + ")";
		int result = update(SQL);
		closeConnection();
		return result > 0;
	}

	public boolean addToCart(int uid, int itemID) throws SQLException {
		startConnection();
		final String SQL = "INSERT INTO product_cart (cart_id, product_id, quantity) VALUES ((SELECT cartID FROM cart WHERE customer_id=" + uid + "), " + itemID + ", 1);";
		int result = update(SQL);
		closeConnection();
		return result > 0;
	}

	public ArrayList<Integer> checkIfAlreadyIn(int uid) throws SQLException {
		startConnection();
		final String SQL = "SELECT product_id from product_cart WHERE cart_id = (SELECT DISTINCT cartID from cart WHERE customer_id=" + uid + ")";
		ArrayList<Integer> cartIDs = toIntArray(query(SQL));
		closeConnection();
		return cartIDs.size() > 0 ? cartIDs : null;
	}

	public boolean update(int uid, int itemID) throws SQLException {
		startConnection();
		final String SQL = "UPDATE product_cart SET quantity = quantity+1 WHERE product_id =" + itemID + " AND cart_id = (SELECT DISTINCT cartID from cart WHERE customer_id=" + uid + ")";
		int result = update(SQL);
		closeConnection();
		return result > 0;
	}

	public boolean buy(int uid) throws SQLException {
		startConnection();
		final String SQL = "SELECT product_id, quantity FROM product_cart WHERE cart_id = (SELECT cartID FROM cart WHERE customer_id =" + uid + ")";
		ResultSet set = query(SQL);
		String SQLorder = "INSERT INTO orders (customer_id) VALUES (" + uid + ")";
		update(SQLorder);

		final String SQLQ = "SELECT LAST_INSERT_ID() as id";
		ResultSet newId = query(SQLQ);
		newId.next();
		int orderID = newId.getInt("id");

		while (set.next()) {
			int prod_id = set.getInt("product_id");
			int quantity = set.getInt("quantity");
			String SQLdel = "DELETE FROM product_cart WHERE product_id=" + prod_id + " AND cart_id = (SELECT cartID FROM cart WHERE customer_id =" + uid + ")";
			update(SQLdel);
			String SQLadd = "INSERT INTO product_order (order_id, product_id, quantity) VALUES (" + orderID + "," + prod_id + "," + quantity + ")";
			update(SQLadd);
		}

		closeConnection();
		return true;
	}

	//private
	private ArrayList<Product> toCartArray(ResultSet set) throws SQLException {
		ArrayList<Product> array = new ArrayList<>();
		while (set.next()) {
			array.add(new Product(set.getInt("productID"),
				set.getString("productName"),
				set.getDouble("productPrice"),
				set.getString("productText"),
				set.getString("productCategory"),
				set.getInt("quantity"),
				set.getString("productImg250"),
				set.getString("productImg550")));
		}
		return array;
	}

	private ArrayList<Integer> toIntArray(ResultSet set) throws SQLException {
		ArrayList<Integer> array = new ArrayList<>();
		while (set.next()) {
			array.add(set.getInt("product_id"));
		}
		return array;
	}
}
