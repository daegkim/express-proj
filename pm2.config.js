module.exports = {
  apps: [
    {
      name: 'memo-app',
      script: './bin/www',
      watch: true,
      env: {
        'NODE_ENV': 'development'
      },
      env_production: {
        'NODE_ENV': 'production',
        PORT: 4000
      }
    }
  ]
}