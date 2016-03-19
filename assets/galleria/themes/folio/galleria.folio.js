! function(i) {
    Galleria.addTheme({
        name: "folio",
        author: "Galleria",
        css: "galleria.folio.css",
        defaults: {
            transition: "pulse",
            thumbCrop: "width",
            imageCrop: false,
            carousel: false,
            show: false,
            easing: "galleriaOut",
            trueFullscreen: false,
            _webkitCursor: false,
            _animate: true,
            _center: false,
            _onClick: null
        },
        init: function(t) {
            Galleria.requires(1.4, "This version of Folio theme requires Galleria version 1.4 or later");
            this.addElement("preloader", "loaded", "close").append({
                container: "preloader",
                preloader: "loaded",
                stage: "close"
            });
            var e = this,
                a = this.$("stage"),
                n = this.$("thumbnails"),
                s = this.$("thumbnails-container"),
                o = this.$("images"),
                l = this.$("info"),
                r = this.$("loader"),
                h = this.$("target"),
                c = 0,
                f = h.width(),
                d = t._center,
                u = 0,
                g = 0,
                p = window.location.hash.substr(2),
                m = function(t) {
                    e.$("info").css({
                        left: e.finger ? 20 : Math.max(20, i(window).width() / 2 - t / 2 + 10)
                    })
                },
                w = function(i) {
                    return Math.min.apply(window, i)
                },
                b = function(i) {
                    return Math.max.apply(window, i)
                },
                y = function(t, e) {
                    e = i.extend({
                        speed: 400,
                        width: 190,
                        onbrick: function() {},
                        onheight: function() {},
                        delay: 0,
                        debug: false
                    }, e);
                    t = i(t);
                    var a = t.children(),
                        o = t.width(),
                        l = Math.floor(o / e.width),
                        r = [],
                        h, c, f, g, p = {
                            "float": "none",
                            position: "absolute",
                            display: Galleria.SAFARI ? "inline-block" : "block"
                        };
                    if (d) {
                        var o = s.width();
                        var m = (o - (l * u - 10)) / 2;
                        n.css("left", l ? m : 0)
                    }
                    if (t.data("colCount") === l) {
                        return
                    }
                    t.data("colCount", l);
                    if (!a.length) {
                        return
                    }
                    for (h = 0; h < l; h++) {
                        r[h] = 0
                    }
                    t.css("position", "relative");
                    a.css(p).each(function(t, a) {
                        a = i(a);
                        for (h = l - 1; h > -1; h--) {
                            if (r[h] === w(r)) {
                                c = h
                            }
                        }
                        f = {
                            top: r[c],
                            left: e.width * c
                        };
                        if (typeof f.top !== "number" || typeof f.left !== "number") {
                            return
                        }
                        if (e.speed) {
                            window.setTimeout(function(i, t, e) {
                                return function(a) {
                                    Galleria.utils.animate(i, e, {
                                        easing: "galleriaOut",
                                        duration: t.speed,
                                        complete: t.onbrick
                                    })
                                }
                            }(a, e, f), t * e.delay)
                        } else {
                            a.css(f);
                            e.onbrick.call(a)
                        }
                        if (!a.data("height")) {
                            a.data("height", a.outerHeight(true))
                        }
                        r[c] += a.data("height")
                    });
                    g = b(r);
                    if (g < 0) {
                        return
                    }
                    if (typeof g !== "number") {
                        return
                    }
                    if (e.speed) {
                        t.animate({
                            height: b(r)
                        }, e.speed, e.onheight)
                    } else {
                        t.height(b(r));
                        e.onheight.call(t)
                    }
                };
            if (d) {
                this.$("container").addClass("center")
            }
            this.bind("fullscreen_enter", function(t) {
                this.$("container").css("height", "100%");
                if (e.finger) {
                    i.each(e._controls.slides, function(t, e) {
                        i(e.container).show()
                    })
                }
            });
            this.bind("fullscreen_exit", function(t) {
                if (this.getData().iframe) {
                    i(this._controls.getActive().container).find("iframe").remove();
                    this.$("container").removeClass("iframe")
                }
                Galleria.TOUCH || i(e._controls.getActive().container).hide();
                if (e.finger) {
                    i.each(e._controls.slides, function(t, e) {
                        i(e.container).hide()
                    })
                }
            });
            this._fullscreen.beforeExit = function(i) {
                l.hide();
                if (Galleria.IE8) {
                    Galleria.utils.animate(e.getActiveImage(), {
                        opacity: 0
                    }, {
                        duration: 200
                    })
                }
                Galleria.utils.animate(a[0], {
                    opacity: 0
                }, {
                    duration: 200,
                    complete: function() {
                        a.css({
                            visibility: "hidden",
                            opacity: 1
                        });
                        n.show();
                        Galleria.utils.animate(n[0], {
                            opacity: 1
                        }, {
                            duration: 200
                        });
                        i()
                    }
                })
            };
            this.bind("thumbnail", function(s) {
                this.addElement("plus");
                var l = s.thumbTarget,
                    r = this.$("plus").css({
                        display: "block"
                    }).insertAfter(l),
                    f = i(l).parent().data("index", s.index);
                if (t.showInfo && this.hasInfo(s.index)) {
                    r.append("<span>" + this.getData(s.index).title + "</span>")
                }
                u = u || i(l).parent().outerWidth(true);
                g = g || u - i(l).width();
                i(l).css("opacity", 0);
                f.off(t.thumbEventType);
                if (Galleria.IE) {
                    r.hide()
                } else {
                    r.css("opacity", 0)
                }
                if (!Galleria.TOUCH) {
                    f.hover(function() {
                        if (Galleria.IE) {
                            r.show()
                        } else {
                            r.stop().css("opacity", 1)
                        }
                    }, function() {
                        if (Galleria.IE) {
                            r.hide()
                        } else {
                            r.stop().animate({
                                opacity: 0
                            }, 300)
                        }
                    })
                } else {
                    f.on("touchstart", function() {
                        r.css("opacity", 1)
                    }).on("touchend", function() {
                        r.hide()
                    })
                }
                c++;
                this.$("loaded").css("width", c / this.getDataLength() * 100 + "%");
                if (c === this.getDataLength()) {
                    this.$("preloader").fadeOut(100);
                    n.data("colCount", null);
                    y(n, {
                        width: u,
                        speed: t._animate ? 400 : 0,
                        onbrick: function() {
                            var s = this,
                                l = i(s).find("img, .img");
                            window.setTimeout(function(s) {
                                return function() {
                                    Galleria.utils.animate(s, {
                                        opacity: 1
                                    }, {
                                        duration: t.transition_speed,
                                        complete: function() {
                                            i(s).parent().css("background", "#000")
                                        }
                                    });
                                    s.parent().off("click:fast click").on("click:fast", function() {
                                        var s = i(this).data("index");
                                        if (Galleria.IE < 9) {
                                            i(this).find(".galleria-plus").hide()
                                        }
                                        if (i.isFunction(t._onClick)) {
                                            t._onClick.call(e, e.getData(s));
                                            return
                                        }
                                        a.css({
                                            visibility: "visible",
                                            opacity: 0
                                        });
                                        e.$("target").height(e.$("target").height());
                                        if (e.finger) {
                                            o.css("opacity", 0)
                                        }
                                        Galleria.utils.animate(n[0], {
                                            opacity: 0
                                        }, {
                                            duration: 100,
                                            complete: function() {
                                                n.hide();
                                                e.enterFullscreen();
                                                Galleria.utils.animate(a[0], {
                                                    opacity: 1
                                                }, {
                                                    duration: 200,
                                                    complete: function() {
                                                        if (e.finger) {
                                                            o.animate({
                                                                opacity: 1
                                                            });
                                                            e.finger.moveTo(s)
                                                        }
                                                        if (e.finger) {
                                                            e.finger.setPosition(-s * e.finger.width)
                                                        }
                                                        e.show(s)
                                                    }
                                                })
                                            }
                                        })
                                    })
                                }
                            }(l), t._animate ? l.parent().data("index") * 100 : 0)
                        },
                        onheight: function() {
                            h.height(n.height())
                        }
                    })
                }
            });
            this.bind("loadstart", function(i) {
                if (!i.cached) {
                    r.show()
                }
            });
            this.bind("data", function() {
                c = 0
            });
            this.bind("loadfinish", function(e) {
                if (!e.galleriaData) {
                    return
                }
                r.hide();
                this.finger || l.hide();
                if (this.hasInfo() && t.showInfo && this.isFullscreen() && !this.finger) {
                    l.fadeIn(t.transition ? t.transitionSpeed : 0)
                }
                m(i(e.imageTarget).width());
                this.finger && l.show()
            });
            if (!Galleria.TOUCH && !t._webkitCursor) {
                this.addIdleState(this.get("image-nav-left"), {
                    left: -100
                });
                this.addIdleState(this.get("image-nav-right"), {
                    right: -100
                });
                this.addIdleState(this.get("info"), {
                    opacity: 0
                })
            }
            this.$("container").css({
                width: t.width,
                height: "auto"
            });
            if (t._webkitCursor && Galleria.WEBKIT && !Galleria.TOUCH) {
                this.$("image-nav-right,image-nav-left").addClass("cur")
            }
            if (Galleria.TOUCH) {
                this.setOptions({
                    transition: "fadeslide",
                    initialTransition: false
                })
            }
            this.$("close").on("click:fast", function() {
                e.exitFullscreen()
            });
            if (Galleria.History && p) {
                a.css("visibility", "visible");
                n.css("opacity", 0);
                this.$("preloader").hide();
                this.enterFullscreen(function() {
                    this.show(parseInt(p, 10))
                })
            }
            var v = null;
            var G = function(i) {
                v = null;
                if (e.isFullscreen()) {
                    if (e.getActiveImage()) {
                        m(e.getActiveImage().width)
                    }
                    return
                }
                var t = s.width();
                if (t !== f) {
                    f = t;
                    y(n, {
                        width: u,
                        delay: 50,
                        debug: true,
                        onheight: function() {
                            h.height(n.height())
                        }
                    })
                }
            };
            i(window).resize(function() {
                if (v) {
                    clearTimeout(v)
                }
                v = setTimeout(G, 200)
            });
            G()
        }
    })
}(jQuery);
