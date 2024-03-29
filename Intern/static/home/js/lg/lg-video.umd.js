! function(e, o) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).lgVideo = o()
}(this, function() {
    "use strict";

    function g(o) {
        return Object.keys(o).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(o[e])
        }).join("&")
    }
    var o = function() {
            return (o = Object.assign || function(e) {
                for (var o, i = 1, t = arguments.length; i < t; i++)
                    for (var s in o = arguments[i]) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
                return e
            }).apply(this, arguments)
        },
        i = {
            autoplayFirstVideo: !0,
            youTubePlayerParams: !1,
            vimeoPlayerParams: !1,
            wistiaPlayerParams: !1,
            gotoNextSlideOnVideoEnd: !0,
            autoplayVideoOnSlide: !1,
            videojs: !1,
            videojsTheme: "",
            videojsOptions: {}
        },
        e = "lgHasVideo",
        t = "lgSlideItemLoad",
        s = "lgBeforeSlide",
        n = "lgAfterSlide",
        l = "lgPosterClick";

    function d(e) {
        return this.core = e, this.settings = o(o({}, i), this.core.settings), this
    }
    return d.prototype.init = function() {
        var o = this;
        this.core.LGel.on(e + ".video", this.onHasVideo.bind(this)), this.core.LGel.on(l + ".video", function() {
            var e = o.core.getSlideItem(o.core.index);
            o.loadVideoOnPosterClick(e)
        }), this.core.LGel.on(t + ".video", this.onSlideItemLoad.bind(this)), this.core.LGel.on(s + ".video", this.onBeforeSlide.bind(this)), this.core.LGel.on(n + ".video", this.onAfterSlide.bind(this))
    }, d.prototype.onSlideItemLoad = function(e) {
        var o = this,
            e = e.detail,
            i = e.isFirstSlide,
            t = e.index;
        this.settings.autoplayFirstVideo && i && t === this.core.index && setTimeout(function() {
            o.loadAndPlayVideo(t)
        }, 200), !i && this.settings.autoplayVideoOnSlide && t === this.core.index && this.loadAndPlayVideo(t)
    }, d.prototype.onHasVideo = function(e) {
        var e = e.detail,
            o = e.index,
            i = e.src,
            t = e.html5Video;
        e.hasPoster || (this.appendVideos(this.core.getSlideItem(o), {
            src: i,
            addClass: "lg-object",
            index: o,
            html5Video: t
        }), this.gotoNextSlideOnVideoEnd(i, o))
    }, d.prototype.onBeforeSlide = function(e) {
        this.core.lGalleryOn && (e = e.detail.prevIndex, this.pauseVideo(e))
    }, d.prototype.onAfterSlide = function(e) {
        var o = this,
            e = e.detail,
            i = e.index,
            e = e.prevIndex,
            t = this.core.getSlideItem(i);
        this.settings.autoplayVideoOnSlide && i !== e && t.hasClass("lg-complete") && setTimeout(function() {
            o.loadAndPlayVideo(i)
        }, 100)
    }, d.prototype.loadAndPlayVideo = function(e) {
        var o = this.core.getSlideItem(e);
        this.core.galleryItems[e].poster ? this.loadVideoOnPosterClick(o, !0) : this.playVideo(e)
    }, d.prototype.playVideo = function(e) {
        this.controlVideo(e, "play")
    }, d.prototype.pauseVideo = function(e) {
        this.controlVideo(e, "pause")
    }, d.prototype.getVideoHtml = function(e, o, i, t) {
        var s = "",
            n = this.core.galleryItems[i].__slideVideoInfo || {},
            l = this.core.galleryItems[i],
            l = (l = l.title || l.alt) ? 'title="' + l + '"' : "",
            d = 'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
        if (n.youtube) var r = "lg-youtube" + i,
            a = "?" + (n.youtube[2] ? n.youtube[2] + "&" : "") + "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" + (this.settings.youTubePlayerParams ? "&" + g(this.settings.youTubePlayerParams) : ""),
            s = '<iframe allow="autoplay" id=' + r + ' class="lg-video-object lg-youtube ' + o + '" ' + l + ' src="//www.youtube.com/embed/' + (n.youtube[1] + a) + '" ' + d + "></iframe>";
        else if (n.vimeo) {
            r = "lg-vimeo" + i, a = function(e, o) {
                if (!o || !o.vimeo) return "";
                var i = o.vimeo[2] || "",
                    e = e && 0 !== Object.keys(e).length ? "&" + g(e) : "",
                    t = ((o.vimeo[0].split("/").pop() || "").split("?")[0] || "").split("#")[0],
                    o = o.vimeo[1] !== t;
                return "?autoplay=0&muted=1" + (o ? "&h=" + t : "") + e + (i = "?" == (i = o ? i.replace("/" + t, "") : i)[0] ? "&" + i.slice(1) : i || "")
            }(this.settings.vimeoPlayerParams, n);
            s = '<iframe allow="autoplay" id=' + r + ' class="lg-video-object lg-vimeo ' + o + '" ' + l + ' src="//player.vimeo.com/video/' + (n.vimeo[1] + a) + '" ' + d + "></iframe>"
        } else if (n.wistia) {
            r = "lg-wistia" + i, a = g(this.settings.wistiaPlayerParams);
            s = '<iframe allow="autoplay" id="' + r + '" src="//fast.wistia.net/embed/iframe/' + (n.wistia[4] + (a = a ? "?" + a : "")) + '" ' + l + ' class="wistia_embed lg-video-object lg-wistia ' + o + '" name="wistia_embed" ' + d + "></iframe>"
        } else if (n.html5) {
            for (var c = "", u = 0; u < t.source.length; u++) c += '<source src="' + t.source[u].src + '" type="' + t.source[u].type + '">';
            if (t.tracks)
                for (u = 0; u < t.tracks.length; u++) ! function(e) {
                    var o = "",
                        i = t.tracks[e];
                    Object.keys(i || {}).forEach(function(e) {
                        o += e + '="' + i[e] + '" '
                    }), c += "<track " + o + ">"
                }(u);
            var h = "",
                f = t.attributes || {};
            Object.keys(f || {}).forEach(function(e) {
                h += e + '="' + f[e] + '" '
            }), s = '<video class="lg-video-object lg-html5 ' + (this.settings.videojs && this.settings.videojsTheme ? this.settings.videojsTheme + " " : "") + " " + (this.settings.videojs ? " video-js" : "") + '" ' + h + ">\n                " + c + "\n                Your browser does not support HTML5 video.\n            </video>"
        }
        return s
    }, d.prototype.appendVideos = function(e, o) {
        var i = this.getVideoHtml(o.src, o.addClass, o.index, o.html5Video),
            i = (e.find(".lg-video-cont").append(i), e.find(".lg-video-object").first());
        if (o.html5Video && i.on("mousedown.lg.video", function(e) {
                e.stopPropagation()
            }), this.settings.videojs && null != (e = this.core.galleryItems[o.index].__slideVideoInfo) && e.html5) try {
            return videojs(i.get(), this.settings.videojsOptions)
        } catch (e) {
            console.error("lightGallery:- Make sure you have included videojs")
        }
    }, d.prototype.gotoNextSlideOnVideoEnd = function(e, o) {
        var i = this,
            t = this.core.getSlideItem(o).find(".lg-video-object").first(),
            o = this.core.galleryItems[o].__slideVideoInfo || {};
        if (this.settings.gotoNextSlideOnVideoEnd)
            if (o.html5) t.on("ended", function() {
                i.core.goToNextSlide()
            });
            else if (o.vimeo) try {
            new Vimeo.Player(t.get()).on("ended", function() {
                i.core.goToNextSlide()
            })
        } catch (e) {
            console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js")
        } else if (o.wistia) try {
            window._wq = window._wq || [], window._wq.push({
                id: t.attr("id"),
                onReady: function(e) {
                    e.bind("end", function() {
                        i.core.goToNextSlide()
                    })
                }
            })
        } catch (e) {
            console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js")
        }
    }, d.prototype.controlVideo = function(e, o) {
        var i = this.core.getSlideItem(e).find(".lg-video-object").first(),
            e = this.core.galleryItems[e].__slideVideoInfo || {};
        if (i.get())
            if (e.youtube) try {
                i.get().contentWindow.postMessage('{"event":"command","func":"' + o + 'Video","args":""}', "*")
            } catch (e) {
                console.error("lightGallery:- " + e)
            } else if (e.vimeo) try {
                new Vimeo.Player(i.get())[o]()
            } catch (e) {
                console.error("lightGallery:- Make sure you have included //github.com/vimeo/player.js")
            } else if (e.html5)
                if (this.settings.videojs) try {
                    videojs(i.get())[o]()
                } catch (e) {
                    console.error("lightGallery:- Make sure you have included videojs")
                } else i.get()[o]();
                else if (e.wistia) try {
            window._wq = window._wq || [], window._wq.push({
                id: i.attr("id"),
                onReady: function(e) {
                    e[o]()
                }
            })
        } catch (e) {
            console.error("lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js")
        }
    }, d.prototype.loadVideoOnPosterClick = function(e, o) {
        var i, t, s, n = this;
        e.hasClass("lg-video-loaded") ? o && this.playVideo(this.core.index) : e.hasClass("lg-has-video") ? this.playVideo(this.core.index) : (e.addClass("lg-has-video"), o = void 0, i = this.core.galleryItems[this.core.index].src, (s = this.core.galleryItems[this.core.index].video) && (o = "string" == typeof s ? JSON.parse(s) : s), t = this.appendVideos(e, {
            src: i,
            addClass: "",
            index: this.core.index,
            html5Video: o
        }), this.gotoNextSlideOnVideoEnd(i, this.core.index), s = e.find(".lg-object").first().get(), e.find(".lg-video-cont").first().append(s), e.addClass("lg-video-loading"), t && t.ready(function() {
            t.on("loadedmetadata", function() {
                n.onVideoLoadAfterPosterClick(e, n.core.index)
            })
        }), e.find(".lg-video-object").first().on("load.lg error.lg loadedmetadata.lg", function() {
            setTimeout(function() {
                n.onVideoLoadAfterPosterClick(e, n.core.index)
            }, 50)
        }))
    }, d.prototype.onVideoLoadAfterPosterClick = function(e, o) {
        e.addClass("lg-video-loaded"), this.playVideo(o)
    }, d.prototype.destroy = function() {
        this.core.LGel.off(".lg.video"), this.core.LGel.off(".video")
    }, d
});