package endpoints;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class JSONServlet extends HttpServlet {

	private final String CLIENT_HOST = "http://localhost:8080";
	private final String USER_SESSION = "userData";
	private Gson gson;

	@Override
	public void init() throws ServletException {
		//do I need anything here? Gson configuration maybe? Date to json config?
	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		super.service(req, resp);
	}

	protected void requireCredentials(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Credentials", "true");
	}

	public void checkArguments(boolean condition, String errMessage) throws IllegalArgumentException {
		if (condition) {
			throw new IllegalArgumentException(errMessage);
		}
	}
}
