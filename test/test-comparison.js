var getUrlParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [, ''])[1].replace(/\+/g, '%20')) || null;
};

requirejs.config({
    paths: {
        renode: './helper/renode',
        domini: './helper/domini',
        domock: './helper/domock',
        test_content: './helper/contentGenerator'
    }
});

requirejs(['test_content'], function (TestContent) {
    var test_listLength = parseInt(getUrlParameter('size') || '1000', 10);
    var test_targetDom = document.getElementById('div1');
    var test_method = getUrlParameter('method'),
        test_requestAnimationFrame = getUrlParameter('raf'),
        test_content = getUrlParameter('content'),
        test_hide = getUrlParameter('hide') !== 'false',
        test_heightFixed = getUrlParameter('height');

    TestContent[test_content](test_targetDom, [test_listLength, 4, 2, 2]);

    if (test_method === 'native') {
        document.title = '原生滚动';
    } else if (test_method === 'iscroll') {
        document.title = 'iscroll滚动';

        // function loaded() {
            window.scrollPanel = new IScroll(test_targetDom.parentNode, {
                scrollbars: true,
                bounce: false
            });
            console.log('iscroll');
        // }
        // window.onload = loaded;
    } else {
        document.title = '模拟滚动';

        window.scrollPanel = new Skroll(test_targetDom, {
            acceleration: 2000,
            maxSpeed: 4000,
            itemHeightFixed: !!test_heightFixed,
            filler: 1, // 1: padding, 2: blank
            // raf: !!test_requestAnimationFrame,
            raf: true,
            scrollBarMode: 1,
            autoHide: test_hide,
            plugins: []
        });
    }

    if(test_requestAnimationFrame) {
        document.title += '-raf';
    }
});
