module.exports = {
  apps: [
    {
      name: 'memo-app',
      script: './bin/www',
      watch: true,
      env: {
        'NODE_ENV': 'development',
        'PORT': 4000
      },
      env_production: {
        'NODE_ENV': 'production'
      }
    }
  ]
}