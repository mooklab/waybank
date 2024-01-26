window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t450_showMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t450');
    var overlay = rec.querySelector('.t450__overlay');
    var menuElements = rec.querySelectorAll('.t450__overlay, .t450__close, a[href*="#"]');
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupShowed');
    document.body.classList.add('t450__body_menushowed');
    if (menu)
        menu.classList.add('t450__menu_show');
    if (overlay)
        overlay.classList.add('t450__menu_show');
    if (menu) {
        menu.addEventListener('clickedAnchorInTooltipMenu', function() {
            t450_closeMenu(menu, overlay)
        })
    }
    Array.prototype.forEach.call(menuElements, function(element) {
        element.addEventListener('click', function() {
            if (element.closest('.tooltipstered, .t-menusub__target-link, .t794__tm-link, .t966__tm-link, .t978__tm-link'))
                return;
            if (element.href && (element.href.substring(0, 7) === '#price:' || element.href.substring(0, 9) === '#submenu:'))
                return;
            t450_closeMenu(menu, overlay)
        })
    });
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            document.body.classList.remove('t390__body_popupshowed');
            var popups = document.querySelectorAll('.t390');
            Array.prototype.forEach.call(popups, function(popup) {
                popup.classList.remove('t390__popup_show')
            })
        }
    });
    rec.addEventListener('click', function(e) {
        if (e.target.closest('.t966__tm-link, .t978__tm-link')) {
            t450_checkSize(recid);
            if (e.target.closest('.t978__tm-link')) {
                setTimeout(function() {
                    var hookLink = e.target.closest('.t978__tm-link');
                    var menuBlock = hookLink.nextElementSibling;
                    var submenuLinks = menuBlock ? menuBlock.querySelectorAll('.t978__menu-link') : [];
                    Array.prototype.forEach.call(submenuLinks, function(link) {
                        link.addEventListener('click', function() {
                            t450_checkSize(recid)
                        })
                    })
                }, 300)
            }
        }
    });
    menu.addEventListener('menuOverflow', function() {
        t450_checkSize(recid)
    });
    t450_highlight(recid)
}
function t450_closeMenu(menu, overlay) {
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupHidden');
    document.body.classList.remove('t450__body_menushowed');
    if (menu)
        menu.classList.remove('t450__menu_show');
    if (overlay)
        overlay.classList.remove('t450__menu_show')
}
function t450_checkSize(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    if (!menu)
        return;
    var container = menu.querySelector('.t450__container');
    var topContainer = menu.querySelector('.t450__top');
    var rightContainer = menu.querySelector('.t450__rightside');
    setTimeout(function() {
        var topContainerHeight = topContainer ? topContainer.offsetHeight : 0;
        var rightContainerHeight = rightContainer ? rightContainer.offsetHeight : 0;
        var containerPaddingTop = container ? window.getComputedStyle(container).paddingTop : '0';
        var containerPaddingBottom = container ? window.getComputedStyle(container).paddingBottom : '0';
        containerPaddingTop = parseInt(containerPaddingTop, 10);
        containerPaddingBottom = parseInt(containerPaddingBottom, 10);
        if (topContainerHeight + rightContainerHeight + containerPaddingTop + containerPaddingBottom > document.documentElement.clientHeight) {
            menu.classList.add('t450__overflowed')
        } else {
            menu.classList.remove('t450__overflowed')
        }
    })
}
function t450_appearMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var burger = rec ? rec.querySelector('.t450__menu__content') : null;
    if (!burger)
        return;
    var burgerAppearOffset = burger ? burger.getAttribute('data-appearoffset') : '';
    var burgerHideOffset = burger ? burger.getAttribute('data-hideoffset') : '';
    if (burgerAppearOffset) {
        burgerAppearOffset = t450_appearMenuParseNumber(burgerAppearOffset);
        if (window.pageYOffset >= burgerAppearOffset) {
            if (burger.classList.contains('t450__beforeready')) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.add('t450__beforeready')
        }
    }
    if (burgerHideOffset) {
        burgerHideOffset = t450_appearMenuParseNumber(burgerHideOffset);
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        if (window.pageYOffset + window.innerHeight >= scrollHeight - burgerHideOffset) {
            if (!burger.classList.contains('t450__beforeready')) {
                burger.classList.add('t450__beforeready')
            }
        } else if (burgerAppearOffset) {
            if (window.pageYOffset >= burgerAppearOffset) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.remove('t450__beforeready')
        }
    }
}
function t450_appearMenuParseNumber(string) {
    if (string.indexOf('vh') > -1) {
        string = Math.floor((window.innerHeight * (parseInt(string) / 100)))
    }
    return parseInt(string, 10)
}
function t450_initMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    var overlay = rec ? rec.querySelector('.t450__overlay') : null;
    var burger = rec ? rec.querySelector('.t450__burger_container') : null;
    var menuLinks = rec ? rec.querySelectorAll('.t-menu__link-item.t450__link-item_submenu') : [];
    var hook = menu ? menu.getAttribute('data-tooltip-hook') : '';
    if (hook) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href="' + hook + '"]')) {
                e.preventDefault();
                t450_closeMenu(menu, overlay);
                t450_showMenu(recid);
                t450_checkSize(recid)
            }
        })
    }
    if (burger) {
        burger.addEventListener('click', function() {
            t450_closeMenu(menu, overlay);
            t450_showMenu(recid);
            t450_checkSize(recid)
        })
    }
    window.addEventListener('resize', function() {
        t450_checkSize(recid)
    });
    if (!window.isMobile)
        return;
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            t450_checkSize(recid)
        })
    })
}
function t450_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    if (url.substr(url.length - 1) === '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1)
    }
    if (pathname === '') {
        pathname = '/'
    }
    var shouldBeActiveElements = document.querySelectorAll('.t450__menu a[href=\'' + url + '\'], ' + '.t450__menu a[href=\'' + url + '/\'], ' + '.t450__menu a[href=\'' + pathname + '\'], ' + '.t450__menu a[href=\'/' + pathname + '\'], ' + '.t450__menu a[href=\'' + pathname + '/\'], ' + '.t450__menu a[href=\'/' + pathname + '/\']' + (hash ? ', .t450__menu a[href=\'' + hash + '\']' : ''));
    var rec = document.getElementById('rec' + recid);
    var menuLinks = rec ? rec.querySelectorAll('.t450__menu a') : [];
    Array.prototype.forEach.call(menuLinks, function(link) {
        if (link.getAttribute('data-highlighted-by-user') !== 'y')
            link.classList.remove('t-active')
    });
    Array.prototype.forEach.call(shouldBeActiveElements, function(link) {
        link.classList.add('t-active')
    })
}
function t678_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function() {
        t_forms__onSuccess(form)
    })
}
function t390_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t390');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.style.opacity = 1;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var escapeEvent = t390_escClosePopup.bind(this, recId);
    if (popupTooltipHook) {
        t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
            t_popup__addAttributesForAccessibility(popupTooltipHook)
        });
        document.addEventListener('click', function(event) {
            var target = event.target;
            var href = target.closest('a[href="' + popupTooltipHook + '"]') ? target : !1;
            if (!href)
                return;
            event.preventDefault();
            t390_showPopup(recId, escapeEvent);
            t_onFuncLoad('t_popup__resizePopup', function() {
                t_popup__resizePopup(recId)
            });
            t390__lazyLoad();
            if (analitics && window.Tilda) {
                Tilda.sendEventToStatistics(analitics, popupTooltipHook)
            }
        });
        t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
            t_popup__addClassOnTriggerButton(document, popupTooltipHook)
        })
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t390__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        if (event.target === this)
            t390_closePopup(recId, escapeEvent)
    });
    popupCloseBtn.addEventListener('click', function() {
        t390_closePopup(recId, escapeEvent)
    });
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t390_closePopup(recId, escapeEvent);
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        if (typeof t_triggerEvent === 'function')
                            t_triggerEvent(document.body, 'popupShowed');
                        document.body.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
    var curPath = window.location.pathname;
    var curFullPath = window.location.origin + curPath;
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid) {
        var selects = 'a[href^="#"]:not([href="#"]):not([href^="#price"]):not([href^="#popup"]):not([href^="#prodpopup"]):not([href^="#order"]):not([href^="#!"]),' + 'a[href^="' + curPath + '#"]:not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"]),' + 'a[href^="' + curFullPath + '#"]:not([href*="#!/tproduct/"]):not([href*="#!/tab/"]):not([href*="#popup"])';
        var selectors = rec.querySelectorAll(selects);
        for (var i = 0; i < selectors.length; i++) {
            selectors[i].addEventListener('click', function(event) {
                var hash = this.hash.trim();
                if (window.location.hash) {
                    setTimeout(function() {
                        window.location.href = hash
                    }, 50)
                }
            })
        }
    }
    function t390_escClosePopup(recId) {
        if (arguments[1].key === 'Escape')
            t390_closePopup(recId, escapeEvent)
    }
}
function t390_showPopup(recId, escapeEvent) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t390');
    if (!container)
        return;
    var windowWidth = window.innerWidth;
    var screenMin = rec.getAttribute('data-screen-min');
    var screenMax = rec.getAttribute('data-screen-max');
    if (screenMin && windowWidth < parseInt(screenMin, 10))
        return;
    if (screenMax && windowWidth > parseInt(screenMax, 10))
        return;
    var popup = rec.querySelector('.t-popup');
    var documentBody = document.body;
    t_onFuncLoad('t_popup__showPopup', function() {
        t_popup__showPopup(popup)
    });
    if (typeof t_triggerEvent === 'function')
        t_triggerEvent(document.body, 'popupShowed');
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t390__body_popupshowed');
    document.addEventListener('keydown', escapeEvent)
}
function t390_closePopup(recId, escapeEvent) {
    var rec = document.getElementById('rec' + recId);
    var popup = rec.querySelector('.t-popup');
    var popupActive = document.querySelector('.t-popup.t-popup_show');
    if (popup === popupActive) {
        if (typeof t_triggerEvent === 'function')
            t_triggerEvent(document.body, 'popupHidden');
        document.body.classList.remove('t-body_popupshowed');
        document.body.classList.remove('t390__body_popupshowed')
    }
    popup.classList.remove('t-popup_show');
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    document.removeEventListener('keydown', escapeEvent)
}
function t390_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    hitType: 'pageview',
                    page: virtPage,
                    title: virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t390__lazyLoad() {
    var allRecords = document.getElementById('allrecords');
    if (window.lazy === 'y' || (allRecords && allRecords.getAttribute('data-tilda-lazy') === 'yes')) {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t657_init(recid) {
    var rec = document.querySelector('#rec' + recid);
    if (!rec)
        return;
    var wrapperBlock = rec.querySelector('.t657');
    var closeButton = rec.querySelector('.t657__btn');
    var closeIcon = rec.querySelector('.t657__icon-close');
    var closeSvg = rec.querySelector('.t657__icon-close svg');
    var storageItem = wrapperBlock.getAttribute('data-storage-item');
    var lastOpen;
    try {
        lastOpen = localStorage.getItem(storageItem)
    } catch (error) {
        console.log('Your web browser does not support localStorage. Error status: ', error)
    }
    if (!lastOpen) {
        wrapperBlock.classList.remove('t657_closed')
    }
    wrapperBlock.addEventListener('click', function(event) {
        if (event.target === closeButton || event.target === closeIcon || event.target === closeSvg) {
            wrapperBlock.classList.add('t657_closed');
            try {
                localStorage.setItem(storageItem, Math.floor(Date.now() / 1000))
            } catch (error) {
                console.log('Your web browser does not support localStorage. Error status: ', error)
            }
            event.preventDefault()
        }
    })
}
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60)
    }
}
)();
function t270_scroll(hash, offset) {
    if (!hash)
        return;
    t270_checkLoad(hash, offset);
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var wrapperBlock = document.querySelector('.t270');
    var dontChangeHistory = wrapperBlock ? Boolean(wrapperBlock.getAttribute('data-history-disabled')) : !1;
    t270_scrollToEl(hash, offset);
    if (!dontChangeHistory && isHistoryChangeAllowed) {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
        isHistoryChangeAllowed = !1
    }
    return !0
}
function t270_checkLoad(hash, offset) {
    if (window.t270_loadChecked)
        return;
    var sliderWrappers = document.body.querySelectorAll('.t-slds__items-wrapper');
    if (!sliderWrappers.length)
        return;
    var lastWrapper = sliderWrappers[sliderWrappers.length - 1];
    var sliderImgs = lastWrapper ? lastWrapper.querySelectorAll('.t-slds__bgimg') : [];
    var lastImg = sliderImgs[sliderImgs.length - 1];
    var imageUrl = lastImg ? window.getComputedStyle(lastImg).backgroundImage : '';
    imageUrl = imageUrl.substring(5, imageUrl.length - 2);
    var preloaderImg = document.createElement('img');
    preloaderImg.src = imageUrl ? imageUrl : '';
    preloaderImg.addEventListener('load', function() {
        t270_scroll(hash, offset);
        window.t270_loadChecked = !0
    })
}
function t270_scrollToEl(hash, offset) {
    if (document.body.getAttribute('data-scroll'))
        return;
    var scrollTargetY = t270_getTarget(hash, offset);
    if (isNaN(scrollTargetY))
        return;
    var html = document.querySelector('html');
    var body = document.body;
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var speed = 2000;
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
    var currentTime = 0;
    function t270_easeInQuad(pos) {
        return Math.pow(pos, 2)
    }
    function t270_animationScroll() {
        currentTime += 1 / 60;
        var newDocumentHeight = Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight, html.offsetHeight);
        if (documentHeight < newDocumentHeight) {
            documentHeight = newDocumentHeight;
            scrollTargetY = t270_getTarget(hash, offset);
            scrollY = window.scrollY || document.documentElement.scrollTop;
            time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8))
        }
        var difference = currentTime / time;
        var animation = t270_easeInQuad(difference);
        if (difference < 1) {
            requestAnimationFrame(t270_animationScroll);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * animation))
        } else {
            body.removeAttribute('data-scroll');
            body.removeAttribute('data-scrollable');
            window.scrollTo(0, scrollTargetY)
        }
    }
    body.setAttribute('data-scroll', 'true');
    body.setAttribute('data-scrollable', 'true');
    t270_animationScroll()
}
function t270_getTarget(hash, offset) {
    var target;
    try {
        if (hash.substring(0, 1) === '#') {
            target = document.getElementById(hash.substring(1))
        } else {
            target = document.querySelector(hash)
        }
    } catch (event) {
        console.log('Exception t270: ' + event.message);
        return
    }
    if (!target) {
        target = document.querySelector('a[name="' + hash.substr(1) + '"]');
        if (!target)
            return
    }
    target = parseInt((target.getBoundingClientRect().top + window.pageYOffset) - offset, 10);
    target = Math.max(target, 0);
    return target
}
