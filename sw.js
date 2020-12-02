const staticCacheName = 'site-static'; // remember to change this name 'site-static' every time you change the files loaded in cache ex: 'site-static-v1'.... v2....v3...etc

const dynamicCache = 'site-dynamic'; // a cache for automatically saving pages the user has already visited to let them browse offline

// opens a caches with name site-static if it exists
const assets = [ //assests to be loaded into memory
    '/',
    '/index.html',
    '/js/app.js',
    '/js/react_1.js',
    '/js/timeline/timeline_feature.js',
    '/js/racechart/racechart_feature.js',
    '/js/piechart/piechart_feature.js',
    '/js/agechart/agechart_feature.js',
    '/style.css',
    '/style_mediaQ.css',
    '/images/book.png',
    '/images/clock.png',
    '/images/location.png',
    '/images/map.svg',
    '/images/medical-file.png',
    '/images/PhillyMap.png.png',
    '/images/presentation.png',
    '/images/sex.png',
    '/images/tombstone.png',
    '/images/medical-record.png',
    '/icons/art1.png',
    '/icons/art2.png',
    '/icons/art3.png',
    '/icons/art4.png',
    '/icons/art5.png',
    '/icons/art6.png',
    '/icons/art7.png',
    '/icons/art8.png',
    'https://fonts.googleapis.com/css?family=Bitter',
    'https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLXOXWh2.woff2',
    'https://fonts.gstatic.com/s/bitter/v16/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfOLjOXQ.woff2',
    
];

// install service worker
self.addEventListener('install',evt => {
    evt.waitUntil( // this make sure the cache is loaded in all assests before stopping
        caches.open(staticCacheName).then(cache =>{
            console.log('caching shell assests');
            cache.addAll(assets)
        })
    );
});

//activate service worker
self.addEventListener('activate',evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{ //returns an array of keys of names of cache version
            console.log(keys);
            return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch',evt => {
    //console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
             // return info in caches or the regular fetch event using online
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache =>{
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});