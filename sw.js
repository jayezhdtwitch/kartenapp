/* Alter Service Worker der Adresse /kartenapp/ – entfernt sich selbst und löscht die alten App-Caches,
   damit installierte Apps die Umzugsseite (index.html → neue Adresse) laden. Sammlung (localStorage/IndexedDB) bleibt unberührt. */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil((async function(){
  try{var ks=await caches.keys();await Promise.all(ks.filter(function(k){return /^kartenapp-/.test(k)}).map(function(k){return caches.delete(k)}))}catch(x){}
  try{await self.registration.unregister()}catch(x){}
  try{var cs=await self.clients.matchAll({type:'window'});cs.forEach(function(c){try{c.navigate(c.url)}catch(x){}})}catch(x){}
})())});
self.addEventListener('fetch',function(){});
