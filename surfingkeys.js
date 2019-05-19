settings.nextLinkRegex = /(\b(next|forward)\b)|下页|下頁|下一页|下一頁|后页|後頁|>>|»/i;
settings.prevLinkRegex = /(\b(prev|previous|back)\b)|上页|上頁|上一页|上一頁|前页|前頁|<<|«/i;

cmap('<Ctrl-[>', '<Ctrl-,>');
cmap('<Ctrl-]>', '<Ctrl-.>');

mapkey('zf', '#1在新标签页后台打开多个链接', function() {
    Hints.create("", Hints.dispatchMouseClick, {tabbed: true, active: false, multipleHits: true});
});

mapkey('ca', '#7打开选中网址或剪切板网址的网页缓存', function() {
    if (window.getSelection().toString()) {
        tabOpenLink("https://web.archive.org/" + window.getSelection().toString());
    } else {
        Clipboard.read(function(response) {
            tabOpenLink("https://web.archive.org/" + response.data);
        });
    }
});

mapkey('cya', '打开当前网址的网页缓存', function() {
    tabOpenLink("https://web.archive.org/" + window.location.href);
});

mapkey('oog', 'Google站内搜索', function() {
    var Bar = location.host + "";
    q = "" + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
    if (!q) q = prompt("\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:", "");
    if (q != null) {
        var qlocation = " ";
        qlocation = ('https://www.google.com/search?q=' + q + '&sitesearch=' + Bar + '');
        window.open(qlocation);
    }
    void 0;
});

mapkey('gp', '显示网页所有图片', function() {
    outText = '';
    for (i = 0; i < document.images.length; i++) {
        if (outText.indexOf(document.images[i].src) == -1) {
            outText += '<tr><td><img src=' + document.images[i].src + '></td><td>' + document.images[i].height + '</td><td>' + document.images[i].width + '</td><td>' + document.images[i].src + '</td></tr>';
        }
    }
    if (outText != '') {
        imgWindow = window.open('', 'imgWin', 'width=800,height=600');
        imgWindow.document.write('<table border=1 cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>' + outText + '</table>');
        imgWindow.document.close();
    } else {
        alert('No images!');
        }
});

addSearchAliasX('i', 'Bilibili', 'https://search.bilibili.com/all?keyword=');
addSearchAliasX('z', 'Zhihu', 'https://www.zhihu.com/search?q=');
addSearchAliasX('v', 'Weibo', 'http://s.weibo.com/weibo/');
addSearchAliasX('k', 'Wikipedia', 'https://zh.wikipedia.org/wiki/');
addSearchAliasX('jd', 'JD', 'http://search.jd.com/Search?enc=utf-8&keyword=');
addSearchAliasX('tb', 'Taobao', 'https://s.taobao.com/search?q=');
addSearchAliasX('a', 'Douban', 'https://www.douban.com/search?q=');
addSearchAliasX('x', 'Xiami', 'http://www.xiami.com/search?key=');

mapkey('cr', '保存至Instapaper',function(){
    function iprl5() {
    var d = document,
    z = d.createElement('scr' + 'ipt'),
    b = d.body,
    l = d.location;
    try {
        if (!b) throw (0);
        d.title = '(Saving...) ' + d.title;
        z.setAttribute('src', l.protocol + '//www.instapaper.com/j/3FeEhGsd7WY5?a=read-later&u=' + encodeURIComponent(l.href) + '&t=' + (new Date().getTime()));
        b.appendChild(z);
    } catch(e) {
        alert('Please wait until the page has loaded.');
    }
}
iprl5();
void(0);
});

mapkey('cyr','Instapaper阅读模式',function(){
    function iptxt() {
    var d = document;
    try {
        if (!d.body) throw (0);
        window.location = 'http://www.instapaper.com/text?u=' + encodeURIComponent(d.location.href);
    } catch(e) {
        alert('Please wait until the page has loaded.');
    }
}
iptxt();
void(0);
});

// From https://gist.github.com/ttttmr/577acf8a7ddf97c8972a6132a15e238a
mapkey('ci', '一键订阅到Inoreader',function () {
 let rsshub_host = 'https://rsshub.app';

  let cnblog = 'https://www.cnblogs.com/';
  let csdn = 'https://blog.csdn.net/';
  let jianshu_user = '/jianshu/user/';
  let zhihu_user = '/zhihu/people/activities/';
  let zhihu_collection = '/zhihu/collection/';
  let bilibili_user = '/bilibili/user/video/';
  let jike_topic = '/jike/topic/';
  let jike_square = '/jike/topic/square/';
  let jike_user = '/jike/user/';
  let twitter_user = '/twitter/user/';
  let weibo_user = '/weibo/user/';
  let instagram_user = '/instagram/user/';
  let youtube_channel = '/youtube/channel/';

  let w = 800;
  let h = 600;
  let feedurl = '';
  let domain = location.host;
  let path = location.pathname.split('/');

  if (domain == 'www.cnblogs.com') {
    feedurl = cnblog + path[1] + '/rss';
  } else if (domain == 'blog.csdn.net') {
    feedurl = csdn + path[1] + '/rss/list';
  }
  if (feedurl != '') {
    console.log('RSS found in Website');
  } else {
    console.log('RSS not found in Website');
    console.log('Trying RSSHub ... ');
    let rsshub_path = '';
    if (domain == 'www.jianshu.com') {
      if (path[1] == 'u') {
        rsshub_path = jianshu_user + path[2];
      } else {
        alert('Use it in Jianshu user page');
        return;
      }
    } else if (domain == 'www.zhihu.com') {
      if (path[1] == 'people' || path[1] == 'org') {
        rsshub_path = zhihu_user + path[2];
      } else if (path[1] == 'collection') {
        rsshub_path = zhihu_collection + path[2];
      } else {
        alert('Use it in Zhihu user page');
        return;
      }
    } else if (domain == 'space.bilibili.com') {
      rsshub_path = bilibili_user + path[1];
    } else if (domain == 'web.okjike.com') {
      if (path[1] == 'topic') {
        if (path[3] == 'official') {
          rsshub_path = jike_topic + path[2];
        } else if (path[3] == 'user') {
          rsshub_path = jike_square + path[2];
        }
      } else if (path[1] == 'user') {
        rsshub_path = jike_user + path[2];
      } else {
        alert('Use it in Jike user or topic page');
        return;
      }
    } else if (domain == 'twitter.com') {
      rsshub_path = twitter_user + path[1];
    } else if (domain == 'm.weibo.cn') {
      if (path[1] == 'profile') {
        rsshub_path = weibo_user + path[2];
      } else {
        alert('Use it in Weibo user home page');
        return;
      }
    } else if (domain == 'weibo.com' || domain == 'www.weibo.com') {
      rsshub_path = weibo_user + $CONFIG.oid;
    } else if (domain == 'www.instagram.com') {
      if (path[1] == 'p') {
        alert('Use it in Instagram user home page');
        return;
      } else {
        rsshub_path = instagram_user + path[1];
      }
    } else if (domain == 'www.youtube.com') {
      if (path[1] == 'channel') {
        rsshub_path = youtube_channel + path[2];
      } else {
        alert('Use it in YouTube channel page');
      }
    }
    if (rsshub_path == '') {
      console.log('RSS not found');
    } else {
      console.log('RSS found in RSSHub');
      feedurl = rsshub_host + rsshub_path;
    }
  }
  if (feedurl) {
    console.log(feedurl);
    feedurl = 'https://www.inoreader.com/?add_feed=' + feedurl;
  } else {
    feedurl = 'https://www.inoreader.com/bookmarklet/subscribe/' + encodeURIComponent(location.href);
  }
  console.log(feedurl);
  let b = window.screenLeft != undefined ? window.screenLeft : screen.left;
  let c = window.screenTop != undefined ? window.screenTop : screen.top;
  let width = window.innerWidth ?
    window.innerWidth :
    document.documentElement.clientWidth ?
    document.documentElement.clientWidth :
    screen.width;
  let height = window.innerHeight ?
    window.innerHeight :
    document.documentElement.clientHeight ?
    document.documentElement.clientHeight :
    screen.height;
  let d = width / 2 - w / 2 + b;
  let e = height / 2 - h / 2 + c;
  let f = window.open(
    feedurl,
    new Date().getTime(),
    'width=' +
    w +
    ', height=' +
    h +
    ', top=' +
    e +
    ', left=' +
    d +
    'location=yes,resizable=yes,status=no,scrollbars=no,personalbar=no,toolbar=no,menubar=no'
  );
  if (window.focus) {
    f.focus();
  } 
});

//翻译
Front.registerInlineQuery({
        url: "https://api.shanbay.com/bdc/search/?word=",
        parseResult: function(res) {
            try {
                res = JSON.parse(res.text);
                var exp = res.msg;
                if (res.data.definition) {
                    var pronunciations = [];
                    for (var reg in res.data.pronunciations) {
                        pronunciations.push(`<div>[${reg}] ${res.data.pronunciations[reg]}</div>`);
                        // pronunciations.push(`<div><audio src="${res.data[reg+'_audio']}" controls></audio></div>`);
                    }
                    var definition = res.data.definition.split("\n").map(function(d) {
                        return `<li>${d}</li>`;
                    }).join("");
                    exp = `${pronunciations.join("")}<ul>${definition}</ul>`;
                }
                if (res.data.en_definitions) {
                    exp += "<hr/>";
                    for (var lex in res.data.en_definitions) {
                        var sense = res.data.en_definitions[lex].map(function(s) {
                            return `<li>${s}</li>`;
                        }).join("");
                        exp += `<div>${lex}</div><ul>${sense}</ul>`;
                    }
                }
                return exp;
            } catch (e) {
                return "";
            }
        }
    });

// an example to create a new mapping `ctrl-y`
//mapkey('<Ctrl-y>', 'Show me the money', function() {
//    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
//});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
//map('gt', 'T');

// an example to remove mapkey `Ctrl-i`
//unmap('<Ctrl-i>');

// set theme
//settings.theme = `
//.sk_theme {
//    background: #000;
//    color: #fff;
//}
//.sk_theme tbody {
//    color: #fff;
//}
//.sk_theme input {
//    color: #d9dce0;
//}
//.sk_theme .url {
//    color: #2173c5;
//}
//.sk_theme .annotation {
//    color: #38f;
//}
//.sk_theme .omnibar_highlight {
//    color: #fbd60a;
//}
//.sk_theme ul>li:nth-child(odd) {
//    background: #1e211d;
//}
//.sk_theme ul>li.focused {
//    background: #4ec10d;
//}`;
// click `Save` button to make above settings to take effect.
