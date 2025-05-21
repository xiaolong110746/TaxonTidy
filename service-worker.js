// 缓存名称
const CACHE_NAME = 'fungal-counter-v1';
// 需要缓存的文件列表
const urlsToCache = [
    '/TaxonTidy/index.html',
    '/TaxonTidy/manifest.json',
    '/TaxonTidy/icon-192x192.png',
    '/TaxonTidy/icon-512x512.png'
];

// 安装 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
           .then(cache => cache.addAll(urlsToCache))
    );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
           .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => cacheName!== CACHE_NAME)
                       .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});

// 拦截请求并返回缓存内容
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
           .then(response => {
                return response || fetch(event.request);
            })
    );
});
