package endpoints;

import beans.Customer;
import beans.Product;
import com.google.gson.Gson;
import dataAccess.CustomerDAO;
import dataAccess.ProductDAO;
import endpoints.responseInterface.FormattedResponse;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "AdminServlet", value = "/AdminServlet")
public class AdminServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		String action = request.getParameter("ACTION");
		CustomerDAO uCustomer = new CustomerDAO();
		ProductDAO uProduct = new ProductDAO();

		switch (action) {
			case "allProducts":
				FormattedResponse<ArrayList<Product>> productFormattedResponse = new FormattedResponse<>();

				try {
					productFormattedResponse.setData(uProduct.getAll());
					out.print(new Gson().toJson(productFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "allUsers":
				FormattedResponse<ArrayList<Customer>> customerFormattedResponse = new FormattedResponse<>();
				try {
					customerFormattedResponse.setData(uCustomer.getAll());
					out.print(new Gson().toJson(customerFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "deleteUser":
				FormattedResponse<Boolean> booleanFormattedResponse = new FormattedResponse<>();
				try {
					String userID = request.getParameter("userID");
					if(uCustomer.deleteUser(Integer.parseInt(userID))){
						booleanFormattedResponse.setData(true);
					}
					booleanFormattedResponse.setError(HttpServletResponse.SC_BAD_REQUEST, "L'utente non esiste");
					out.print(new Gson().toJson(booleanFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
		}
	}
}
