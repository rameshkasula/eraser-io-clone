import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    creator: v.object({
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      image: v.string(),
      id: v.string(),
    }),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);

    return result;
  },
});

export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();
    return result;
  },
});

export const updateFileDoc = mutation({
  args: {
    _id: v.id("files"),
    document: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      document: args.document,
    });

    return result;
  },
});

export const updateFileWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});
