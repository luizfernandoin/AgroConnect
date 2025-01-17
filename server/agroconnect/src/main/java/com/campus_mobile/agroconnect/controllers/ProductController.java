package com.campus_mobile.agroconnect.controllers;


import com.campus_mobile.agroconnect.dto.Product.ProductRegisterDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductResponseDTO;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.services.OwnershipService;
import com.campus_mobile.agroconnect.services.ProductService;
import com.campus_mobile.agroconnect.services.UserService;
import com.campus_mobile.agroconnect.utils.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private OwnershipService ownershipService;

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<Product>> getProductById(@PathVariable UUID id) {
        Product product = productService.getProductById(id);
        Response<Product> response = new Response<>("success", "Product found", product);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/categories")
    @Secured("ROLE_PRODUCER")
    public ResponseEntity<Product> addCategoriesToProduct(
            Authentication authentication,
            @PathVariable UUID productId,
            @RequestBody Set<String> categories) {
        User user = userService.getUserFromAuthentication(authentication);

        if (!(user instanceof Producer)) {
            throw new IllegalArgumentException("Authenticated user is not a producer.");
        }

        Product updatedProduct = productService.addCategoriesToProduct(productId, categories);
        return ResponseEntity.ok(updatedProduct);
    }

    @PostMapping("/")
    @Secured("ROLE_PRODUCER")
    public ResponseEntity<ProductResponseDTO> createProduct(
            Authentication authentication,
            @Valid @ModelAttribute ProductRegisterDTO data) {

        User user = userService.getUserFromAuthentication(authentication);

        if (!(user instanceof Producer)) {
            throw new IllegalArgumentException("Authenticated user is not a producer.");
        }

        ProductResponseDTO responseDTO = productService.createProduct(data, (Producer) user);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
}
