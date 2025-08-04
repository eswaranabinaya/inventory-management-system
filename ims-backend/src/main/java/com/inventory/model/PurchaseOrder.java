package com.inventory.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "purchase_order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrder {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String supplierName;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String warehouseName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();

    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    private LocalDateTime receivedAt;

    private String receivedBy;

    public enum Status {
        PENDING,
        RECEIVED,
        CANCELLED
    }
}