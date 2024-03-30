// ==UserScript==
// @name         MsDocs LangButton
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  try to take over the world!
// @author       You
// @match        https://learn.microsoft.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
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
            console.log(1)
            return true;
        })
    }
    createChineseButton();
    createEnglishButton();
    // Your code here...
})();
