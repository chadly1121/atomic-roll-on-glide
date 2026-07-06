import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listMyOrdersTool from "./tools/list-my-orders";
import listMyQuotesTool from "./tools/list-my-quotes";

// The OAuth issuer must be the direct Supabase host, constructed from the
// project ref. Never derive it from SUPABASE_URL (which may be a proxy).
const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "roll-on-painting-mcp",
  title: "Roll-On Painting Portal",
  version: "0.1.0",
  instructions:
    "Tools for the Roll-On Painting prefinishing lumber portal. Use `list_my_quotes` and `list_my_orders` to read the signed-in client's quotes and orders.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listMyOrdersTool, listMyQuotesTool],
});