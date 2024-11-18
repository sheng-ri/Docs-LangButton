// ==UserScript==
// @name         Docs LangButton
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  try to take over the world!
// @author       sheng-ri
// @match        https://learn.microsoft.com/*
// @match        https://*.cppreference.com/*
// @icon         https://www.microsoft.com/favicon.ico?v2
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function tryRun(consumer) {
       let cnt = 0
       const code = setInterval(() => {
          if (consumer() || cnt ++ > 4) clearInterval(code)
        },50)
    }

    function createButton(a,b,c) {
        const cnButton = document.createElement("button")
        cnButton.textContent = c
        cnButton.onclick = () => {
            location.href = location.href.replace(a,b)
        }
       return cnButton
    }

    function createChineseButton() {

        tryRun(() => {
            let menus = document.querySelectorAll(".site-header-brand")
            if (!menus) return false;
            for (let menu of menus) {
                menu.parentNode.append(createButton("en-us","zh-cn","中文"))
            }
            return true;
        })
    }

    function createEnglishButton() {
        tryRun(() => {
            let menus = document.querySelectorAll(".site-header-brand")
            if (!menus) return false;
            for (let menu of menus) {
                menu.parentNode.append(createButton("zh-cn","en-us","英文"))
            }
            return true;
        })
    }
    if (location.href.startsWith("https://learn.microsoft.com")) {
        createChineseButton();
        createEnglishButton();
    }

    if (location.href.startsWith("https://en.cppreference.com")) {
         tryRun(() => {
            let loc = document.querySelector("#cpp-head-first").children[0]
            if (!loc) return false;
            loc.append(createButton("en.cppreference.com","zh.cppreference.com","中文"))
            console.log(1)
            return true;
        })
    }
})();
