'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "1609e55f6134d89349c8cd1a1bf36d35",
".git/config": "41df38db68721f8ed4dad3538bed55dc",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "c50e7e3d43af2c383c5525e6f9cc9f19",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "7e8d2945d28c6f22c74ae5785a1fc788",
".git/logs/refs/heads/main": "a59a43f817a95b8e2ad85243027fc757",
".git/logs/refs/remotes/origin/gh-pages": "9afe6c653619eab68f799d1c56cc4779",
".git/logs/refs/remotes/origin/main": "97837c1810db83b3fb241c399c18a791",
".git/objects/05/84db924c91db7681cdb7e4c3aed349470b6778": "acc27823f365eff3b6b758e658943177",
".git/objects/06/4d577478950be0553452bca2f626834fdcbc7f": "621373dcffb0f1b43ccfaf88ae256eb7",
".git/objects/06/5a156ad876ae75d08bca0aabc8c1e01f285abb": "1338ac20d12542d14345378e2fe2be26",
".git/objects/07/851cbd7c35d94944e5f217a57bfda0c3cb53e8": "78d5306f0ea3cfed15732d6ac1dd01fa",
".git/objects/09/3c21a59af3293a0f8add48be2e6ba8bf56b02b": "bec738ccbb995c0fea9822b6c3907464",
".git/objects/0b/82ae183cc36b7b470e3a846373883ad4dcf52a": "89a2ecd81deb5a9794baedb626a90d87",
".git/objects/14/775ffd851eb411201428250be8c060e11d8995": "9e1ed4d77dd3e9cef782481ff582f76d",
".git/objects/1a/d7683b343914430a62157ebf451b9b2aa95cac": "94fdc36a022769ae6a8c6c98e87b3452",
".git/objects/1e/f58054b6f54743b843b883b334e4251b3a8c31": "9d3a91074aa996970158ec1b69b63247",
".git/objects/2b/bae782ee3e7a99415df6ad9eab103498369f13": "0a2c8d803ec1a877880352198612d62a",
".git/objects/2d/0471ef9f12c9641643e7de6ebf25c440812b41": "d92fd35a211d5e9c566342a07818e99e",
".git/objects/30/b719ae7c0bae7ba9bedb1dda6e5504083bffdd": "cb325ffedde12cf337b42589f54c3f60",
".git/objects/33/d29d46137bb8d2246a792d97d8f1892a5f522c": "d97317eb2ea9f40e6a6379d55ee502f2",
".git/objects/34/6bd72ad9723acbaf06bfa940cc5a7ca3b3c513": "e7806055f335161d86037cea60e9af4e",
".git/objects/37/3a58606c313be2849ba7470f014fd5dbf3e141": "968bc745398c420aac4367483b5212e6",
".git/objects/3a/bf18c41c58c933308c244a875bf383856e103e": "30790d31a35e3622fd7b3849c9bf1894",
".git/objects/3b/b0860a0981211a1ab11fced3e6dad7e9bc1834": "3f00fdcdb1bb283f5ce8fd548f00af7b",
".git/objects/3c/b980b9256b2538493ebaf7a6767efecb3804fb": "7e51e78ca31e597a5d3b0727f83d9250",
".git/objects/42/531ee3041fbdce0deba9acdf5f6f8ae64e5d8b": "dc00a952b518556ee7590c708f10d0c3",
".git/objects/48/5ae696fe62ca2a83c943679a5beea9b0210aac": "28faa979e3dc2b7e115ef9fa95de5209",
".git/objects/4b/705ad3cc6ee776c507583038c819e527d50553": "7ea6550b7d0b1a477093d5935c0df23b",
".git/objects/4c/51fb2d35630595c50f37c2bf5e1ceaf14c1a1e": "a20985c22880b353a0e347c2c6382997",
".git/objects/53/18a6956a86af56edbf5d2c8fdd654bcc943e88": "a686c83ba0910f09872b90fd86a98a8f",
".git/objects/53/3d2508cc1abb665366c7c8368963561d8c24e0": "4592c949830452e9c2bb87f305940304",
".git/objects/55/09eecdf30c69e26a459e211039d2ee6b4fbc4b": "d93eec722729bdc81b4267bd0a7b63d3",
".git/objects/6c/77e66ffd866b0cffb4155d607e90e896b0c61b": "a9bbed136c4b5b77deaa87abd872dcfb",
".git/objects/70/a234a3df0f8c93b4c4742536b997bf04980585": "d95736cd43d2676a49e58b0ee61c1fb9",
".git/objects/73/c63bcf89a317ff882ba74ecb132b01c374a66f": "6ae390f0843274091d1e2838d9399c51",
".git/objects/86/03f869c9e810556a90fd388097fbf24bc956c0": "144855f13371292f63d002b05c80a4c0",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8a/aff8e4fb544f7de99aa3d91909f92826fdce4c": "a865dd09ed18341efd41e729653cd6f5",
".git/objects/8e/3c7d6bbbef6e7cefcdd4df877e7ed0ee4af46e": "025a3d8b84f839de674cd3567fdb7b1b",
".git/objects/96/02c1c021c3128f85e6bbe39318ee4ac9e87f91": "98f5e2cedc34be4f03d431394344e03c",
".git/objects/9b/d3accc7e6a1485f4b1ddfbeeaae04e67e121d8": "784f8e1966649133f308f05f2d98214f",
".git/objects/a0/a362952219e7ab33a4f7769bbaa77d2df96163": "de35db043c5ee7733aa0d785ffd3a736",
".git/objects/ab/6738ad7a1759362914534f8744a1bb7bfbd8fe": "3908ed7f53e2bcef30cece2d83fabfd4",
".git/objects/af/e3553cc92d0e09e9856b6e78e992e6f8073a76": "8d8f683280126e468bde2389c966a567",
".git/objects/b0/faa89208fb9384f70f9768ebc600bcbf5bc2c6": "f842ed6413d93a432bb9c9bcd294fb38",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/b9/6a5236065a6c0fb7193cb2bb2f538b2d7b4788": "4227e5e94459652d40710ef438055fe5",
".git/objects/be/bf0cfac0fa9492be41df93c01fce195df6bb97": "226e6b0b639b4b694323f60d3e890739",
".git/objects/c7/7663172ca915a99a594ca17d06f527db05657d": "6335b074b18eb4ebe51f3a2c609a6ecc",
".git/objects/c8/08fb85f7e1f0bf2055866aed144791a1409207": "92cdd8b3553e66b1f3185e40eb77684e",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/db/16989ce28f4e4867121f59aaf0deed2b392238": "e638d2a47334b666cf96f9edf8908c08",
".git/objects/dc/11fdb45a686de35a7f8c24f3ac5f134761b8a9": "761c08dfe3c67fe7f31a98f6e2be3c9c",
".git/objects/df/05066ee7b1f7ce5da872e25c9fc26a4dd8c97b": "54f4a0349047a1251fb73bbd40fb2a55",
".git/objects/e0/7ac7b837115a3d31ed52874a73bd277791e6bf": "74ebcb23eb10724ed101c9ff99cfa39f",
".git/objects/e2/33f3daa9e563ac0f460abc769049295d147f93": "27bd1b59223299752a4ad8a8c8cc8a90",
".git/objects/e5/a8d36285edcf0a56ba2807e2bcc6c6e7e4e562": "51aff98ac56e44d555a70fe447473a54",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/fe/d50cee0dd98bdd40977f5e995b9996715f7fc2": "e405f7172d5294c700c6dcbf31ad4ff9",
".git/refs/heads/main": "22d8cceac29de6363d9baea4d071214c",
".git/refs/remotes/origin/gh-pages": "6619e30505e58273f459140691a4ec21",
".git/refs/remotes/origin/main": "22d8cceac29de6363d9baea4d071214c",
"assets/AssetManifest.bin": "f476448a54c88567298a115f20a11147",
"assets/AssetManifest.bin.json": "c92dfc49fb400298b6a250c45498435b",
"assets/AssetManifest.json": "4827ed0a6d0361adb4a4cf78a57c4830",
"assets/assets/images/img_app_logo.svg": "52e0f13a4898fcb7e2e6b785bc50d3e8",
"assets/assets/images/no-image.jpg": "4cd74d241fd08750438abc489b270493",
"assets/assets/images/sad_face.svg": "4eccb4273d492e76924127c7520b7890",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "e849225558f6a3c2fd2da33a9ad7dfff",
"assets/NOTICES": "c9b1f79bf2472f164f1d0193c574db0e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/record_web/assets/js/record.fixwebmduration.js": "1f0108ea80c8951ba702ced40cf8cdce",
"assets/packages/record_web/assets/js/record.worklet.js": "8a5f575ecdf23f21bcae8204882d54bb",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "6dd84f7972861045c0f91b6a0c6960db",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e4bbcf6a502764701bd2b4e9ae562525",
"/": "e4bbcf6a502764701bd2b4e9ae562525",
"main.dart.js": "aaf24f258f6fad580460d402ee641fa3",
"manifest.json": "2e3a0d9748e786b3922ed50e478ae941",
"version.json": "c7e079ce4a8aa785b608adc38228f82d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
