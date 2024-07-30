// user functions => get user, create user

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// todo: get user
export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});

// todo: create user
export const createUser = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("user", args);

    return result;
  },
});
