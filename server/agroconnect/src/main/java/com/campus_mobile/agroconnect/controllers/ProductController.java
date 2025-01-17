package com.campus_mobile.agroconnect.controllers;


import com.campus_mobile.agroconnect.dto.Category.CategoryRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductRegisterDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductResponseDTO;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.services.CategoryService;
import com.campus_mobile.agroconnect.services.ProducerService;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<Product>> getUserById(@PathVariable UUID id) {
        Product product = productService.getProductById(id);
        Response<Product> response = new Response<>("success", "Product found", product);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}/categories")
    public ResponseEntity<Category> createCategory(
            @PathVariable("productId") UUID productId,
            @RequestBody CategoryRegisterDTO categoryRequest) {

        Category category = categoryService.createCategory(productId, categoryRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(category);
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
