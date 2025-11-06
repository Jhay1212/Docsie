import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("signup", "routes/signup.tsx"),
    route("login", "routes/login.tsx"),
    route("documents/", "routes/documents/mydocuments.tsx"),
    route("documents/:documentId", "routes/documents/documents.tsx")

] satisfies RouteConfig;
