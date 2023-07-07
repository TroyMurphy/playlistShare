"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    development: {
        PORT: 5000,
        CORS_ORIGIN: "*",
    },
    production: {
        PORT: 5000,
        CORS_ORIGIN: "karaoke.troymurphy.ca",
    },
};
