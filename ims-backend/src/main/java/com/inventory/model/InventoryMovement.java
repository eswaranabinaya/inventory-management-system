package com.inventory.model;

import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_movement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;

    @Enumerated(EnumType.STRING)
    @Column(name = "movement_type", nullable = false)
    private MovementType movementType;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_cost")
    private BigDecimal unitCost;

    @Column(name = "movement_date", nullable = false)
    private LocalDateTime movementDate;

    @Column(name = "reference")
    private String reference;

    public enum MovementType {
        INBOUND, OUTBOUND, ADJUSTMENT
    }
}