package dataAccess;

import beans.DecoratedReview;
import beans.Product;
import beans.parents.Review;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ReviewDAO extends DAO{

	public ArrayList<DecoratedReview> getReviewsByProductID(String id) throws SQLException {
		startConnection();
		final String SQL = "SELECT customerName, product_id, reviewText, reviewID FROM (SELECT * FROM review JOIN product p on review.product_id = p.productID WHERE product_id ="+id+") as t1 JOIN customer on customer_id=customer.customerID";
		ArrayList<DecoratedReview> reviews = toArray(query(SQL));
		closeConnection();
		return reviews.size() > 0 ? reviews : null;
	}

	private ArrayList<DecoratedReview> toArray(ResultSet set) throws SQLException {
		ArrayList<DecoratedReview> array = new ArrayList<>();
		while(set.next()){
			array.add(new DecoratedReview(set.getInt("product_id"),
				set.getString("reviewText"),
				set.getString("customerName")
				));
		}
		return array;
	}
}
