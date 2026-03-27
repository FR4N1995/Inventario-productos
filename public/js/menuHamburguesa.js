/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/menuHamburguesa.js":
/*!***********************************!*\
  !*** ./src/js/menuHamburguesa.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n    const menuToggle = document.getElementById(\"menu-toggle\");\n    const mobileMenu = document.getElementById(\"mobile-menu\");\n\n    if (menuToggle && mobileMenu) {\n        menuToggle.addEventListener(\"click\", function(e) {\n            e.stopPropagation();\n            console.log('click')\n            // Alternar visibilidad\n            mobileMenu.classList.toggle(\"hidden\");\n            \n            // Cambiar ícono \n            const icon = menuToggle.querySelector('i'); \n            icon.classList.toggle(\"fa-bars\");\n            icon.classList.toggle(\"fa-times\");\n            \n            // Bloquear scroll del body cuando el menú está abierto\n            document.body.classList.toggle(\"overflow-hidden\");\n        });\n\n        // Cerrar menú al hacer click en cualquier enlace\n        mobileMenu.querySelectorAll('a').forEach(link => {\n            link.addEventListener('click', () => {\n                mobileMenu.classList.add(\"hidden\");\n                menuToggle.querySelector('i').classList.add(\"fa-bars\");\n                menuToggle.querySelector('i').classList.remove(\"fa-times\");\n                document.body.classList.remove(\"overflow-hidden\");\n            });\n        });\n    }\n});\n\n//# sourceURL=webpack://castores/./src/js/menuHamburguesa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/menuHamburguesa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;