import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    category: v.optional(v.union(v.literal("wigs"), v.literal("frontals-closures"))),
    status: v.optional(v.union(v.literal("in-stock"), v.literal("sold-out"), v.literal("sale"))),
  },
  handler: async (ctx, args) => {
    let items = await ctx.db.query("products").collect();

    if (args.category) {
      items = items.filter((p) => p.category === args.category);
    }
    if (args.status) {
      items = items.filter((p) => p.status === args.status);
    }

    // Resolve URLs for uploaded storage files
    const resolved = await Promise.all(
      items.map(async (p) => {
        let imageUrls: string[] = [];
        if (p.storageIds && p.storageIds.length > 0) {
          const urls = await Promise.all(
            p.storageIds.map(async (id) => await ctx.storage.getUrl(id))
          );
          imageUrls = urls.filter((u): u is string => u !== null);
        }
        return {
          ...p,
          uploadedImageUrls: imageUrls,
        };
      })
    );

    return resolved.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const p = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!p) return null;

    let imageUrls: string[] = [];
    if (p.storageIds && p.storageIds.length > 0) {
      const urls = await Promise.all(
        p.storageIds.map(async (id) => await ctx.storage.getUrl(id))
      );
      imageUrls = urls.filter((u): u is string => u !== null);
    }

    return {
      ...p,
      uploadedImageUrls: imageUrls,
    };
  },
});

export const create = mutation({
  args: {
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
    images: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`A product with slug "${args.slug}" already exists.`);
    }

    const now = Date.now();
    return await ctx.db.insert("products", {
      slug: args.slug,
      name: args.name,
      category: args.category,
      status: args.status,
      price: args.price,
      salePrice: args.salePrice,
      blurb: args.blurb,
      specs: args.specs,
      variants: args.variants,
      images: args.images ?? 0,
      storageIds: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    category: v.optional(v.union(v.literal("wigs"), v.literal("frontals-closures"))),
    status: v.optional(v.union(v.literal("in-stock"), v.literal("sold-out"), v.literal("sale"))),
    price: v.optional(v.number()),
    salePrice: v.optional(v.number()),
    blurb: v.optional(v.string()),
    specs: v.optional(v.array(v.array(v.string()))),
    variants: v.optional(
      v.array(
        v.object({
          label: v.string(),
          price: v.number(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, {
      ...patch,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("products"),
    status: v.union(v.literal("in-stock"), v.literal("sold-out"), v.literal("sale")),
    salePrice: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      salePrice: args.status === "sale" ? args.salePrice : undefined,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) throw new Error("Product not found");

    // Clean up uploaded storage files if any
    if (product.storageIds && product.storageIds.length > 0) {
      for (const storageId of product.storageIds) {
        await ctx.storage.delete(storageId);
      }
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Attach owner-uploaded photo from Convex Storage (Rule 8 compliant)
export const attachImage = mutation({
  args: {
    productId: v.id("products"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");

    // Server-side validation of file type & size (max 5 MB, jpg/png/webp)
    const metadata = await ctx.db.system.get(args.storageId);
    if (!metadata) {
      throw new Error("Uploaded file not found in storage");
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (metadata.size > MAX_SIZE) {
      await ctx.storage.delete(args.storageId);
      throw new Error("File exceeds maximum allowed size of 5 MB");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (metadata.contentType && !allowedTypes.includes(metadata.contentType)) {
      await ctx.storage.delete(args.storageId);
      throw new Error("Invalid file format. Only JPG, PNG, and WebP are allowed.");
    }

    const currentStorageIds = product.storageIds ?? [];
    const updatedStorageIds = [...currentStorageIds, args.storageId];

    await ctx.db.patch(args.productId, {
      storageIds: updatedStorageIds,
      images: updatedStorageIds.length,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

export const removeImage = mutation({
  args: {
    productId: v.id("products"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");

    await ctx.storage.delete(args.storageId);
    const updatedStorageIds = (product.storageIds ?? []).filter((id) => id !== args.storageId);

    await ctx.db.patch(args.productId, {
      storageIds: updatedStorageIds,
      images: updatedStorageIds.length,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Seed data from lib/site.ts if database is empty (Rule 8: Never seeds placeholder images)
export const seedInitialProducts = mutation({
  args: {
    products: v.array(
      v.object({
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
      })
    ),
  },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query("products").collect()).length;
    if (count > 0) return { seeded: 0, message: "Products already seeded" };

    const now = Date.now();
    for (const p of args.products) {
      await ctx.db.insert("products", {
        ...p,
        storageIds: [],
        createdAt: now,
        updatedAt: now,
      });
    }

    return { seeded: args.products.length, message: "Initial products seeded successfully" };
  },
});
