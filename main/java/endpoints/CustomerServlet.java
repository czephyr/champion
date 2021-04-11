package endpoints;

import beans.Customer;
import beans.Order;
import com.google.gson.Gson;
import dataAccess.CustomerDAO;
import endpoints.responseInterface.FormattedResponse;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import static java.lang.Integer.parseInt;

@WebServlet(name = "CustomerServlet", value = "/CustomerServlet")
public class CustomerServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		CustomerDAO uCustomer = new CustomerDAO();
		String action = request.getParameter("ACTION");

		switch (action) {
			case "check":
				FormattedResponse<Boolean> checkFormattedResponse = new FormattedResponse<>();
				String checkEmail = request.getParameter("email");
				try {
					checkFormattedResponse.setData(uCustomer.getByEmail(checkEmail));
					out.print(new Gson().toJson(checkFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "signup":
				FormattedResponse<Customer> formattedResponse = new FormattedResponse<>();
				String email = request.getParameter("email");
				String name = request.getParameter("name");
				String surname = request.getParameter("surname");
				String password = request.getParameter("password");
				String address = request.getParameter("address");
				try {
					uCustomer.createCustomer(email, name, surname, password, address);
					Customer currentCustomer = uCustomer.returnByEmail(email);
					formattedResponse.setData(currentCustomer);
					HttpSession newsess = request.getSession();
					newsess.setAttribute("admin", false);
					newsess.setAttribute("current", currentCustomer);
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "cartN":
				FormattedResponse<Integer> cartNformattedResponse = new FormattedResponse<>();
				String id = request.getParameter("id");
				try {
					int cartItemsN = uCustomer.checkCart(parseInt(id, 10));
					cartNformattedResponse.setData(cartItemsN);
					HttpSession newsess = request.getSession();

					out.print(new Gson().toJson(cartNformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "login":
				FormattedResponse<Customer> loginFormattedResponse = new FormattedResponse<>();
				String logemail = request.getParameter("logemail");
				String logpassword = request.getParameter("logpassword");
				try {
					Customer current = uCustomer.checkLogin(logemail, logpassword);
					loginFormattedResponse.setData(current);
					HttpSession newsess = request.getSession();
					newsess.setAttribute("admin", current.isAdmin());
					newsess.setAttribute("current", current);
					out.print(new Gson().toJson(loginFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		CustomerDAO uCustomer = new CustomerDAO();
		String action = request.getParameter("ACTION");

		switch (action) {
			case "orders":
				FormattedResponse<ArrayList<Order>> orderFormattedResponse = new FormattedResponse<>();
				String customerID = request.getParameter("id");
				try {
					ArrayList<Order> orders = uCustomer.getOrderList(uCustomer.getOrders(Integer.parseInt(customerID)));
					orderFormattedResponse.setData(orders);

					out.print(new Gson().toJson(orderFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
		}
	}
}
