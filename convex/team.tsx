import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTeam = query({
  args: {
    teamName: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("teamName"), args.teamName))
      .collect();

    return result;
  },
});

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("teams", args);

    return result;
  },
});

export const getAllTeams = query({
  handler: async (ctx) => {
    const result = await ctx.db.query("teams").collect();
    return result;
  },
});
