//package com.edumingle.backend.config;
//
//public class CorsConfig {
//    @Order(1) // Ensure it runs early in the filter chain
//    public class CustomCorsFilter implements Filter {
//
//        @Override
//        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//                throws IOException, ServletException {
//            HttpServletResponse res = (HttpServletResponse) response;
//            HttpServletRequest req = (HttpServletRequest) request;
//
//            res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//            res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//            res.setHeader("Access-Control-Allow-Headers", "*");
//            res.setHeader("Access-Control-Allow-Credentials", "true");
//
//            if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
//                res.setStatus(HttpServletResponse.SC_OK);
//            } else {
//                chain.doFilter(request, response);
//            }
//        }
//}
