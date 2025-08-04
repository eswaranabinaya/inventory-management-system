package com.inventory.dto;

import lombok.Data;

@Data
public class PurchaseOrderFulfillmentRequestDTO {
    private String receivedBy;
    // Add more fields if partial fulfillment is supported
}