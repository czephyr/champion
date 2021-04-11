package endpoints;

import beans.Product;
import com.google.gson.Gson;
import dataAccess.ProductDAO;
import endpoints.responseInterface.FormattedResponse;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "Servlet", value = "/Servlet")
public class Servlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		ProductDAO uProduct = new ProductDAO();
		String action = request.getParameter("ACTION");
		FormattedResponse<ArrayList<Product>> formattedResponse = new FormattedResponse<>();

		switch (action) {
			case "byID":
				String id = request.getParameter("PRODUCTID");
				try {
					formattedResponse.setData(uProduct.getByID(id));
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "top3":
				try {
					formattedResponse.setData(uProduct.getTop3());
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "filter":
				String name = request.getParameter("NAME");
				String order = request.getParameter("ORDER");
				try {
					formattedResponse.setData(uProduct.getWithFilter(name, order));
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
			case "all":
				try {
					formattedResponse.setData(uProduct.getAll());
					out.print(new Gson().toJson(formattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "update":
				FormattedResponse<Boolean> booleanFormattedResponse = new FormattedResponse<>();
				int upId = Integer.parseInt(request.getParameter("ID"));
				String upName = request.getParameter("NAME");
				int quantity = Integer.parseInt(request.getParameter("QUANTITY"));
				double upPrice = Double.parseDouble(request.getParameter("PRICE"));
				try {
					booleanFormattedResponse.setData(uProduct.updateByID(upId, upName, quantity, upPrice));
					out.print(new Gson().toJson(booleanFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "delete":
				FormattedResponse<Boolean> delBooleanFormattedResponse = new FormattedResponse<>();
				int delId = Integer.parseInt(request.getParameter("ID"));
				try {
					delBooleanFormattedResponse.setData(uProduct.removeByID(delId));
					out.print(new Gson().toJson(delBooleanFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;

			case "create":
				FormattedResponse<Integer> integerFormattedResponse = new FormattedResponse<>();
				String newName = request.getParameter("NAME");
				int newValue = Integer.parseInt(request.getParameter("QUANTITY"));
				double newPrice = Double.parseDouble(request.getParameter("PRICE"));
				try {
					integerFormattedResponse.setData(uProduct.createProduct(newName, newValue, newPrice));
					out.print(new Gson().toJson(integerFormattedResponse));
					out.flush();
				} catch (SQLException throwables) {
					throwables.printStackTrace();
				}
				break;
		}


	}
}
