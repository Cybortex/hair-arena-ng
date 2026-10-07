import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    reference: v.string(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      ...args,
      status: "pending_payment",
      createdAt: Date.now(),
    });
  },
});

export const getByReference = query({
  args: { reference: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_reference", (q) => q.eq("reference", args.reference))
      .first();
  },
});

export const listAll = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("pending_payment"),
        v.literal("paid"),
        v.literal("dispatched"),
        v.literal("delivered"),
        v.literal("cancelled")
      )
    ),
  },
  handler: async (ctx, args) => {
    let orders = await ctx.db.query("orders").collect();
    if (args.status) {
      orders = orders.filter((o) => o.status === args.status);
    }
    return orders.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending_payment"),
      v.literal("paid"),
      v.literal("dispatched"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, { status: args.status });
    return { success: true };
  },
});

export const markPaid = mutation({
  args: {
    reference: v.string(),
    paystackReference: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_reference", (q) => q.eq("reference", args.reference))
      .first();

    if (!order) return { success: false, reason: "Order not found" };

    await ctx.db.patch(order._id, {
      status: "paid",
      paystackReference: args.paystackReference,
      paidAt: Date.now(),
    });

    return { success: true };
  },
});
