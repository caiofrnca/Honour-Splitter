package ie.cct.casplitterbackend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ie.cct.casplitterbackend.exceptions.BadRequestException;
import ie.cct.casplitterbackend.exceptions.UnauthorizedException;
import ie.cct.casplitterbackend.model.Expense;
import ie.cct.casplitterbackend.model.User;
import ie.cct.casplitterbackend.util.JWTIssuer;
import io.jsonwebtoken.Claims;

@RestController
@CrossOrigin
public class backController {

	private Map<String, ArrayList<Expense>> trips;
	private ArrayList<User> users;

	public backController() {
		trips = new HashMap<>();
		users = new ArrayList<>();
	}

	@GetMapping("/users")
	public ArrayList<User> getUsers() {
		return users;
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/login")
	public String login(@RequestParam(name = "username", required = true) String username,
			@RequestParam(name = "password", required = true) String password) {

		List<User> u = getUsers();

		if (!userExists(username)) {

			String token = null;

			if (username.length() == 0) {
				throw new BadRequestException("Username can´t be null");
			}

			if (password.length() <= 7) {
				throw new BadRequestException("Password should be at least 8 characters");
			}

			if (!charSpecial(password)) {
				throw new BadRequestException("Password must contain at least 1 special character");
			}

			if (!checkCase(password)) {
				throw new BadRequestException("Password must contain at least 1 Upper, and 1 lower case");
			}
			users.add(new User(username, password, token));
		}
		for (int i = 0; i < u.size(); i++) {
			if (u.get(i).getUsername().equalsIgnoreCase(username)
					&& u.get(i).getPassword().equalsIgnoreCase(password)) {

				users.get(users.indexOf(u.get(i)))
						.setToken(JWTIssuer.createJWT(username, "jWt-key", username, 86400000));

				return JWTIssuer.createJWT(username, "jWt-key", username, 86400000);
			}
		}
		throw new UnauthorizedException();
	}

	private static boolean checkCase(String input) {
		char currentChar;
		boolean upperCasePresent = false;
		boolean lowerCasePresent = false;

		for (int i = 0; i < input.length(); i++) {
			currentChar = input.charAt(i);
			if (Character.isUpperCase(currentChar)) {
				upperCasePresent = true;
			} else if (Character.isLowerCase(currentChar)) {
				lowerCasePresent = true;
			}
		}
		return upperCasePresent && lowerCasePresent;
	}

	private boolean charSpecial(String string) {
		String symbols = "~`!@#$%^&*()-_=+\\\\|[{]};:'\\\",<.>/?";
		if (string != null) {
			for (int i = 0; i < symbols.length(); i++) {
				if (string.indexOf(symbols.charAt(i)) != -1) {
					return true;
				}
			}
		}
		return false;
	}

	private boolean userExists(String user) {
		for (User u : users) {
			if (u.getUsername().contentEquals(user)) {
				return true;
			}
		}
		return false;
	}

	private String getToken(String token) {
		for (User u : users) {
			if (u.getToken().contentEquals(token)) {
				return token;
			}
		}
		throw new BadRequestException("Sem token");
	}
	


	@CrossOrigin(origins = "*")
	@PostMapping("/{username}/{tripId}/expense")
	public ArrayList<Expense> addExpense(@PathVariable("username") String username,
			@PathVariable("tripId") String tripId, @RequestHeader(name = "Authorization", required = true) String token,
			@RequestBody(required = true) Expense expense) {

		Claims claims = JWTIssuer.decodeJWT(token.split(" ")[1]);
		String subClaim = claims.get("sub", String.class);

		if (!username.contentEquals(subClaim)) {

			throw new UnauthorizedException();
		}

		if (!trips.containsKey(tripId)) {

			trips.put(tripId, new ArrayList<Expense>());

		}
		trips.get(tripId).add(expense);

		return trips.get(tripId);
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/trips")
	public Map<String, ArrayList<Expense>> getTrips(String trip) {
		return trips;
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/{tripId}")
	public ArrayList<Expense> getExpenses(@PathVariable("tripId") String tripId) {

		if (!trips.containsKey(tripId)) {
			throw new BadRequestException("Trip label incorrect or does not exist");
		}

		return trips.get(tripId);
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/{pId}/{tripId}/close")
	public ArrayList<Expense> closeTrip(@PathVariable("tripId") String tripId, @PathVariable("pId") String pId) {

		List<Expense> e = getExpenses(tripId);
		List<User> u = getUsers();

		if (!trips.containsKey(tripId)) {
			throw new BadRequestException("Trip label incorrect or does not exist");
		}
		if (!users.equals(pId)) {
			throw new BadRequestException("User does not contain records on this trip");
		}
		
		for (int i = 0; i < e.size(); i++) {
			
		}
		
		System.out.println("teste trip " + trips.get(tripId));
		return trips.get(tripId);

	}

	@CrossOrigin(origins = "*")
	@GetMapping("/{trip}/summary")
	public String getSummary() {
		return "";
	}
}