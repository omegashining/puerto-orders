package com.puerto.orders.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI ordersOpenApi() {
        return new OpenAPI().info(new Info()
                .title("puerto Orders API")
                .version("v1")
                .description("API REST para la gestión de pedidos y usuarios de la app y el sitio web"));
    }
}
