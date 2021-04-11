package endpoints;

import beans.DecoratedReview;
import com.google.gson.Gson;
import dataAccess.ReviewDAO;
import endpoints.responseInterface.FormattedResponse;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "ReviewServlet", value = "/ReviewServlet")
public class ReviewServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		ReviewDAO uReview = new ReviewDAO();
		FormattedResponse<ArrayList<DecoratedReview>> formattedResponse = new FormattedResponse<>();

		String id = request.getParameter("PRODUCTID");
		try {
			formattedResponse.setData(uReview.getReviewsByProductID(id));
			out.print(new Gson().toJson(formattedResponse));
			out.flush();
		} catch (SQLException throwables) {
			throwables.printStackTrace();
		}


	}
}