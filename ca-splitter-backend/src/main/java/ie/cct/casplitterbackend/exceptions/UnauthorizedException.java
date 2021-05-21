package ie.cct.casplitterbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "401 - Unauthorized")
public class UnauthorizedException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7629299650980554648L;
	
	public UnauthorizedException() {
		
		super("401 - Unauthorized");
	}
	
		

}
