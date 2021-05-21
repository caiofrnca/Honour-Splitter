package ie.cct.casplitterbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("ie.cct*")
public class CaSplitterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaSplitterBackendApplication.class, args);
	}

}
