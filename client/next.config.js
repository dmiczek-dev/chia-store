module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/app',
                permanent: true,
            },
        ]
    },
    // https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
    // Routing for production
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/app' },
            '/login': { page: '/login' },
            '/register': { page: '/register' },
            '/app': { page: '/app' },
            '/app/buy': { page: '/app/buy' },
            '/app/orders': { page: '/app/orders' },
            '/app/settings': { page: '/app/settings' },
        }
    },
    trailingSlash: true,

}
