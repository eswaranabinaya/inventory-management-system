package com.inventory.controller;

import com.inventory.dto.PurchaseOrderRequestDTO;
import com.inventory.dto.PurchaseOrderResponseDTO;
import com.inventory.dto.PurchaseOrderFulfillmentRequestDTO;
import com.inventory.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/purchase-orders")
@RequiredArgsConstructor
public class PurchaseOrderController {
    private final PurchaseOrderService purchaseOrderService;

    @PostMapping
    public ResponseEntity<PurchaseOrderResponseDTO> create(@RequestBody PurchaseOrderRequestDTO requestDTO) {
        return ResponseEntity.ok(purchaseOrderService.createPurchaseOrder(requestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderResponseDTO> get(@PathVariable UUID id) {
        return ResponseEntity.ok(purchaseOrderService.getPurchaseOrder(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderResponseDTO>> getAll() {
        return ResponseEntity.ok(purchaseOrderService.getAllPurchaseOrders());
    }

    @PostMapping("/{id}/fulfill")
    public ResponseEntity<PurchaseOrderResponseDTO> fulfill(@PathVariable UUID id, @RequestBody PurchaseOrderFulfillmentRequestDTO requestDTO) {
        return ResponseEntity.ok(purchaseOrderService.fulfillPurchaseOrder(id, requestDTO));
    }
}