package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductRegisterDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductResponseDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private OwnershipService ownershipService;

    public Product getProductById(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum produto encontrado!");
        }

        return products;
    }

    public List<Product> getProductsByUserId(UUID userId) {
        return productRepository.findByProducerId(userId);
    }

    public ProductResponseDTO createProduct(ProductRegisterDTO data, Producer user) {
        String filename = data.image() == null
                ? fileStorageService.getDefaultFileUri(EntityType.PRODUCT)
                : fileStorageService.storeFile(data.image(), EntityType.PRODUCT);

        Product product = new Product(
                data.name(),
                data.description(),
                data.price(),
                data.unitMeasure(),
                data.quantity(),
                filename,
                data.status(),
                user
        );

        productRepository.save(product);

        return convertToResponseDTO(product);
    }

    @Transactional
    public Product addCategoriesToProduct(UUID productId, Set<String> newCategories) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        ownershipService.verifyOwnership(product.getProducer().getId());

        product.getCategories().addAll(newCategories);

        return productRepository.save(product);
    }

    public ProductResponseDTO convertToResponseDTO(Product product) {
        return new ProductResponseDTO(
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getUnitMeasure(),
                product.getQuantity(),
                product.getImage(),
                product.getStatus()
        );
    }
}
