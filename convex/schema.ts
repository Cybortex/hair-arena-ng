import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    name: v.string(),
    category: v.union(v.literal("wigs"), v.literal("frontals-closures")),
    status: v.union(v.literal("in-stock"), v.literal("sold-out"), v.literal("sale")),
    price: v.number(),
    salePrice: v.optional(v.number()),
    blurb: v.string(),
    specs: v.array(v.array(v.string())),
    variants: v.optional(
      v.array(
        v.object({
          label: v.string(),
          price: v.number(),
        })
      )
    ),
    images: v.number(),
    storageIds: v.optional(v.array(v.id("_storage"))),
    imageUrls: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  orders: defineTable({
    reference: v.string(), // e.g. "HA-123456"
    items: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        variantLabel: v.optional(v.string()),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totalAmount: v.number(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    deliveryAddress: v.string(),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("pending_payment"),
      v.literal("paid"),
      v.literal("dispatched"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    paystackReference: v.optional(v.string()),
    paidAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_status", ["status"]),

  revampRequests: defineTable({
    reference: v.string(), // e.g. "HA-REV-123456"
    serviceSlug: v.string(),
    serviceName: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    customerEmail: v.optional(v.string()),
    depositAmount: v.number(),
    depositPaid: v.boolean(),
    paystackReference: v.optional(v.string()),
    paidAt: v.optional(v.number()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("pending_deposit"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_status", ["status"]),

  events: defineTable({
    type: v.string(), // "click_whatsapp", "click_call", "click_shop", "order_initiated"
    target: v.optional(v.string()),
    timestamp: v.number(),
    date: v.string(), // "YYYY-MM-DD"
  })
    .index("by_type", ["type"])
    .index("by_date", ["date"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
  }).index("by_key", ["key"]),
});
