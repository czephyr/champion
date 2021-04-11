package endpoints;

import beans.Product;
import com.google.gson.Gson;
import dataAccess.CartDAO;
import endpoints.responseInterface.FormattedResponse;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "CartServlet", value = "/CartServlet")
public class CartServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		CartDAO uCart = new CartDAO();
		String action = request.getParameter("ACTION");

		switch (action) {
			case "getCart":
				FormattedResponse<ArrayList<Product>> formattedResponse = new FormattedResponse<>();
				int id = Integer.parseInt(request.getParameter("ID"));
				try {
					formattedResponse.setData(uCart.getAllCart(id));
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "remove":
				FormattedResponse<Boolean> booleanformattedResponse = new FormattedResponse<>();
				int uId = Integer.parseInt(request.getParameter("ID"));
				int itemId = Integer.parseInt(request.getParameter("item"));
				try {
					booleanformattedResponse.setData(uCart.removeFromCart(uId, itemId));
					out.print(new Gson().toJson(booleanformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "add":
				FormattedResponse<Boolean> addbooleanformattedResponse = new FormattedResponse<>();
				int auId = Integer.parseInt(request.getParameter("ID"));
				int aitemId = Integer.parseInt(request.getParameter("item"));
				try {
					addbooleanformattedResponse.setData(uCart.addToCart(auId, aitemId));
					out.print(new Gson().toJson(addbooleanformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "update":
				FormattedResponse<Boolean> updatebooleanformattedResponse = new FormattedResponse<>();
				int uuId = Integer.parseInt(request.getParameter("ID"));
				int uitemId = Integer.parseInt(request.getParameter("item"));
				try {
					updatebooleanformattedResponse.setData(uCart.update(uuId, uitemId));
					out.print(new Gson().toJson(updatebooleanformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "check":
				FormattedResponse<ArrayList<Integer>> intformattedResponse = new FormattedResponse<>();
				int cId = Integer.parseInt(request.getParameter("ID"));
				try {
					intformattedResponse.setData(uCart.checkIfAlreadyIn(cId));
					out.print(new Gson().toJson(intformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "buy":
				FormattedResponse<Boolean> buyformattedResponse = new FormattedResponse<>();
				int wId = Integer.parseInt(request.getParameter("ID"));
				try {
					buyformattedResponse.setData(uCart.buy(wId));
					out.print(new Gson().toJson(buyformattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
		}
	}
}
