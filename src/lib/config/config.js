import dotenv from "dotenv";

dotenv.config();

export const config = {
  AUTHORIZATION_URL: process.env.AUTHORIZATION_URL === undefined ? "" : process.env.AUTHORIZATION_URL,
  CLIENT_ID: process.env.CLIENT_ID === undefined ? "" : process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET === undefined ? "" : process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI === undefined ? "" : process.env.REDIRECT_URI,
  TENANT_ID: process.env.TENANT_ID === undefined ? "" : process.env.TENANT_ID,
  TOKEN_URL: process.env.TOKEN_URL === undefined ? "" : process.env.TOKEN_URL,
  USERINFO_URL: process.env.USERINFO_URL === undefined ? "" : process.env.USERINFO_URL,
};