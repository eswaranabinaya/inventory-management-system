package com.inventory.service;

import com.inventory.dto.PurchaseOrderRequestDTO;
import com.inventory.dto.PurchaseOrderResponseDTO;
import com.inventory.dto.PurchaseOrderFulfillmentRequestDTO;
import java.util.List;
import java.util.UUID;

public interface PurchaseOrderService {
    PurchaseOrderResponseDTO createPurchaseOrder(PurchaseOrderRequestDTO requestDTO);
    PurchaseOrderResponseDTO getPurchaseOrder(UUID id);
    List<PurchaseOrderResponseDTO> getAllPurchaseOrders();
    PurchaseOrderResponseDTO fulfillPurchaseOrder(UUID id, PurchaseOrderFulfillmentRequestDTO requestDTO);
    // Add update and delete as needed
}