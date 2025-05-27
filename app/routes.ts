import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("draft", "./draft.tsx"),
    route("rules", "./rules.tsx"),
    route("settings", "./settings.tsx"),
    route("links", "./links.tsx"),
    route("contact", "./contact.tsx")
] satisfies RouteConfig;
