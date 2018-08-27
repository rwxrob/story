const CACHE = 'skeeziks-cache-v1'
const ASSETS = 'skeeziks-assets'

const URLS = [
  '/index.html',
  '/app.js',
  '/parts.js',
  '/responses.js',
  '/style.css',
]

const loadAssets = _ => {
  fetch('/assets/manifest.json')
    .then( _ => _.json() )
    .then( assets => {
      caches.open(ASSETS)
        .then( _ => _.addAll(assets) ) 
    })
}

self.addEventListener('install', _ => {
  _.waitUntil( caches.open(CACHE).then( c => c.addAll(URLS) ))
  _.waitUntil( loadAssets() )
})

const cacheFirst = (cache,path) => {
  return caches.open(cache).then( cache => {
      return cache.match(path)
        .then( cached => {
          let fetched = fetch(path)
            .then( response => {
              cache.put(path, response.clone())
              return response
            })
          return cached || fetched
        })
  })
}

const netFirst = (cache,path) => {
  return caches.open(cache).then( cache => {
      return fetch(path)
        .then( fetched => {
          cache.put(path, fetched.clone())
          return fetched
        }).catch( () => {
          return caches.match(path)
        })
  })
}

self.addEventListener('fetch', _ => {
  let url = new URL(_.request.url)
  let path = url.pathname

  // load these as fast as possible (no search iteration)
  if ( path === '/' || path === '/index.html') {
    _.respondWith(cacheFirst(CACHE,'/index.html'))
  }

  // next fastest and least likely to change
  else if ( path === '/style.css' ) {
    _.respondWith(cacheFirst(CACHE,path))
  }
  
  // always want the freshest if we have a connection
  else if (
    path === '/app.js' || 
    path === '/parts.js' ||
    path === '/responses.js'
  ) {
    _.respondWith(netFirst(CACHE,path))
  }

  //  least likely to change
  else if (
    path.startsWith('/assets')
  ){
    _.respondWith(cacheFirst(ASSETS,path))
  }

})

self.addEventListener('activate', _ => {
  _.waitUntil(
    caches.keys().then( names => {
      return Promise.all(
        names.map( name => {
          if (CACHE !== 'name' && name.startsWith(ASSETS)) {
            return caches.delete(name)
          }
        })
        )
    })
  )
})