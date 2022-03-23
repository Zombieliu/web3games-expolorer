const { i18n } = require('./next-i18next.config');

module.exports = {
    async rewrites() {
        return [
            {
                source: '/home',
                destination: '/',
            },
        ]
    },
    eslint: {
        dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
    i18n,
}
