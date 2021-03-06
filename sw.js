let images = ["./image/app/baiduyun.png", "./image/app/csdn.png", "./image/app/douban.png", "./image/app/facebook.png", "./image/app/gitee.png", "./image/app/github.png", "./image/app/gmail.png", "./image/app/google.png", "./image/app/jianshu.png", "./image/app/juejin.png", "./image/app/kugou.png", "./image/app/outlook.png", "./image/app/qq.png", "./image/app/tieba.png", "./image/app/twitter.png", "./image/app/v2ex.png", "./image/app/wangyiyunmusic.png", "./image/app/wechat.png", "./image/app/weibo.png", "./image/app/youxiang.png", "./image/app/zhihu.png", "./image/site/173app.png", "./image/site/5iwanyouxi.png", "./image/site/80s.png", "./image/site/97manhua.png", "./image/site/alibaba-opsx.png", "./image/site/anyknew.png", "./image/site/appinn.png", "./image/site/baiduyun.png", "./image/site/beipy.png", "./image/site/biquge5200.png", "./image/site/blizzard-hs.png", "./image/site/bootcdn.png", "./image/site/bootcss.png", "./image/site/bundlephobia.png", "./image/site/chanpin100.ico", "./image/site/chuyu.png", "./image/site/ciliwa.png", "./image/site/cli.png", "./image/site/csdn.png", "./image/site/dayanzai.png", "./image/site/den4b.png", "./image/site/dev-web.png", "./image/site/docschina.png", "./image/site/douban.png", "./image/site/dribbble.ico", "./image/site/easyicon.png", "./image/site/facebook.png", "./image/site/feeder.png", "./image/site/firefox-send.png", "./image/site/flighty.png", "./image/site/foundertype.png", "./image/site/gfxcamp.ico", "./image/site/gitee.png", "./image/site/github.png", "./image/site/gmail.png", "./image/site/google-extensions.png", "./image/site/google-fonts.png", "./image/site/google.png", "./image/site/greasyfork.png", "./image/site/huaban.png", "./image/site/iconfont.png", "./image/site/imooc.png", "./image/site/inoreader.png", "./image/site/itellyou.png", "./image/site/iyunying.png", "./image/site/jianshu.png", "./image/site/jiumodiary.png", "./image/site/juejin.png", "./image/site/kugou.png", "./image/site/laimanhua.png", "./image/site/lantern.ico", "./image/site/laomoit.png", "./image/site/liaoxuefeng.ico", "./image/site/linshiyouxiang.png", "./image/site/miku.png", "./image/site/mozilla.png", "./image/site/niaogebiji.png", "./image/site/oschina.png", "./image/site/outlook.png", "./image/site/pdflibr.ico", "./image/site/qq-ke.png", "./image/site/qq-lol.ico", "./image/site/qq-pc.png", "./image/site/qq.png", "./image/site/reederapp.png", "./image/site/rss-feed-reader.png", "./image/site/rsshub.png", "./image/site/ruanyifeng.jpg", "./image/site/rufus.png", "./image/site/runningcheese.png", "./image/site/runoob.png", "./image/site/steampowered.ico", "./image/site/tampermonkey.png", "./image/site/tieba.png", "./image/site/toolfk.png", "./image/site/tophub.png", "./image/site/twitter.png", "./image/site/ui.ico", "./image/site/vxia.png", "./image/site/w3cplus.png", "./image/site/w3school.png", "./image/site/wangyiyunmusic.png", "./image/site/wechat.png", "./image/site/weibo.png", "./image/site/wepe.png", "./image/site/woshipm.png", "./image/site/ycombinator.png", "./image/site/yikm.png", "./image/site/youxiang.png", "./image/site/ypojie.png", "./image/site/zaodula.png", "./image/site/zcool.ico", "./image/site/zhangxinxu.jpg", "./image/site/zhihu.png", "./image/site/zxcs.png"];
let VERSION = 'v1';
let cacheFiles = [
    './',

    './data/app.json',
    './data/site.json',

    ...images,
    './image/about/qrcode.png',
    './image/foot/beian.png',
    './image/foot/pic.gif',
    './image/favicon.ico',
    './image/logo.png',

    './cdn/iconfont/iconfont.css',
    './cdn/iconfont/iconfont.eot',
    './cdn/iconfont/iconfont.js',
    './cdn/iconfont/iconfont.svg',
    './cdn/iconfont/iconfont.ttf',
    './cdn/iconfont/iconfont.woff',
    './cdn/iconfont/iconfont.woff2',
    './cdn/tailwindcss.min.css',
    './cdn/vue.min.js',

    './pwa/icons/logo-32.png',
    './pwa/icons/logo-72.png',
    './pwa/icons/logo-128.png',
    './pwa/icons/logo-144.png',
    './pwa/icons/logo-256.png',
    './pwa/icons/logo-512.png',
    './pwa/manifest.json',

    './static/main.js',
    './static/main.css',

    './sw.js',
];

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(
            // success => console.log('1. Service Worker 注册成功')
        ).catch(
            // err => console.log(`注册失败，err：${err}`)
        );
}

self.addEventListener('install', function (event) {
    // console.log('2. 安装 sw.js');
    event.waitUntil(
        caches.open(VERSION)
            .then(cache => cache.addAll(cacheFiles))
    )
});

self.addEventListener('activate', function (event) {
    // console.log('3. 激活 sw.js，可以开始处理 fetch 请求。');
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map((key, index) => {
                if (VERSION.indexOf(key) === -1) {
                    return caches.delete(key[index]);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    )
});