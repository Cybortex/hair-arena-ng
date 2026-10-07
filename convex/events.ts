import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const track = mutation({
  args: {
    type: v.string(), // "click_whatsapp", "click_call", "click_shop", "order_initiated"
    target: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const date = new Date(now).toISOString().slice(0, 10);
    return await ctx.db.insert("events", {
      type: args.type,
      target: args.target,
      timestamp: now,
      date,
    });
  },
});

export const getStats = query({
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    const orders = await ctx.db.query("orders").collect();

    const counts: Record<string, number> = {
      click_whatsapp: 0,
      click_call: 0,
      click_shop: 0,
      order_initiated: 0,
    };

    for (const e of events) {
      if (counts[e.type] !== undefined) {
        counts[e.type]++;
      }
    }

    const paidOrders = orders.filter((o) => o.status === "paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      clicks: counts,
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      totalRevenue,
    };
  },
});
