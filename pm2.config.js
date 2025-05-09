module.exports = {
  apps: [
    {
      namespace: "i8i",
      name: "web",
      script: "pnpm build && pnpm start --port 3000",  
      cwd: "./apps/web", 
      watch: ".",  
      autorestart: true,  
    },
    {
      namespace: "i8i",
      name: "api",
      script: "pnpm build && pnpm start",  
      cwd: "./apps/api",
      watch: ".",  
      autorestart: true,
    },
  ],
};
