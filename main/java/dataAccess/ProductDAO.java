package dataAccess;

import beans.Product;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ProductDAO extends DAO {

	public ArrayList<Product> getAll() throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product";
		ArrayList<Product> allProducts = toArray(query(SQL));
		closeConnection();
		return allProducts.size() > 0 ? allProducts : null;
	}

	public ArrayList<Product> getByID(String id) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product WHERE productID=" + id;
		ArrayList<Product> product = toArray(query(SQL));
		closeConnection();
		return product.size() > 1 ? null : product;
	}

	public ArrayList<Product> getTop3() throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product JOIN product_order po on product.productID = po.product_id GROUP BY productID ORDER BY count(*) DESC LIMIT 3";
		ArrayList<Product> products = toArray(query(SQL));
		closeConnection();
		return products.size() > 0 ? products : null;
	}

	public ArrayList<Product> getWithFilter(String name, String order) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product" + composeQuery(name, order);
		ArrayList<Product> products = toArray(query(SQL));
		closeConnection();
		return products.size() > 0 ? products : null;
	}

	public ArrayList<Product> getByCategory(String category) throws SQLException {
		startConnection();
		final String SQL = "SELECT * FROM product WHERE productCategory='%s'";
		ArrayList<Product> allProducts = toArray(query(String.format(SQL, category)));
		closeConnection();
		return allProducts.size() > 0 ? allProducts : null;
	}

	public boolean removeByID(int id) throws SQLException {
		startConnection();
		final String SQL = "DELETE FROM product WHERE productID=" + id;
		int result = update(SQL);
		closeConnection();
		return result > 0;
	}

	public boolean updateByID(int id, String name, int quantity, double price) throws SQLException {
		startConnection();
		final String SQL = "UPDATE product SET productName='" + name + "', productQuantity=" + quantity + ", productPrice=" + price + " WHERE productID=" + id;
		int result = update(SQL);
		closeConnection();
		return result > 0;
	}

	public int createProduct(String name, int quantity, double price) throws SQLException {
		startConnection();
		final String SQL = "INSERT INTO product (productName, productQuantity, productPrice, productText, productCategory, productImg250, productImg550) VALUES ('" + name + "'," + quantity + "," + price + ", 'Products from Champion brand are made with premium resources and optimal research to satisfy every one of your necessities in order to propel you towards your goal', 'Champion Grey Line', '250ngrey', '550ngrey')";
		int result = update(SQL);
		final String SQLQ = "SELECT LAST_INSERT_ID() as id";
		ResultSet newId = query(SQLQ);
		if (newId != null) {
			newId.next();
			return newId.getInt("id");
		}
		return -1;
	}

	//private
	private ArrayList<Product> toArray(ResultSet set) throws SQLException {
		ArrayList<Product> array = new ArrayList<>();
		while (set.next()) {
			array.add(new Product(set.getInt("productID"),
				set.getString("productName"),
				set.getDouble("productPrice"),
				set.getString("productText"),
				set.getString("productCategory"),
				set.getInt("productQuantity"),
				set.getString("productImg250"),
				set.getString("productImg550")));
		}
		return array;
	}

	private String composeQuery(String name, String order) {
		return namePart(name) + orderPart(order);
	}

	private String namePart(String name) {
		return !name.equals("") ? " WHERE productName LIKE '%" + name + "%'" : "";
	}

	private String orderPart(String order) {
		switch (order) {
			case "Alphabetically":
				return "";
			case "PriceHtoL":
				return " ORDER BY productPrice DESC";
			case "PriceLtoH":
				return " ORDER BY productPrice";
			case "Popularity":
				return " JOIN product_order po on product.productID = po.product_id GROUP BY productID ORDER BY count(*) DESC";
		}
		return null;
	}
}
