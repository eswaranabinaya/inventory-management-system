package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.web.tomcat.TomcatMetricsAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(
    exclude = {
        org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration.class,
        TomcatMetricsAutoConfiguration.class
    }
)
@EnableJpaAuditing
public class ImsBackendApplication {

	public static void main(String[] args) {
		System.out.println("=== IMS Backend is starting ===");
		SpringApplication.run(ImsBackendApplication.class, args);
	}

}
