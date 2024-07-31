import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFile = query({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("fileName"), args.fileName))
      .collect();

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
