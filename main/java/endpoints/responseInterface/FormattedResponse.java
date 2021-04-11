package endpoints.responseInterface;

import javax.servlet.http.HttpServletResponse;

public class FormattedResponse<T> {

    private int status;
    private String message;
    private T data;

    public FormattedResponse(int status, String message){
        this.status = status;
        this.message = message;
    }

    public FormattedResponse(T data) {
        this.status = HttpServletResponse.SC_OK;
        this.message = null;
        this.data = data;
    }

    public FormattedResponse() {
    }

    public void setData(T data) {
        this.data = data;
        this.message = null;
        this.status = HttpServletResponse.SC_OK;
    }

    public void setError(int status, String message) {
        this.message = message;
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }
}
