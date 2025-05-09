module.exports = {
  apps: [
    {
      namespace: "i8i",
      name: "i8i-web",
      script: "pnpm start",  
      cwd: "./apps/web", 
      watch: ".",  
      autorestart: true,  
    },
    {
      namespace: "i8i",
      name: "i8i-api",
      script: "pnpm start",  
      cwd: "./apps/api",
      watch: ".",  
      autorestart: true,
    },
  ],
};
