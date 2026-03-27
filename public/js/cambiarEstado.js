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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    // Aplicar estado guardado al cargar la página\n    document.querySelectorAll('.cambiar-estado').forEach(boton => {\n        const productoId = boton.dataset.productoId;\n        const estadoGuardado = localStorage.getItem(`producto-${productoId}-estado`);\n        \n        if (estadoGuardado === 'false') {\n            const productoItem = boton.closest('.opciones');\n            productoItem.querySelector('.entrada')?.classList.add('hidden');\n            productoItem.querySelector('.salida')?.classList.add('hidden');\n        }\n    });\n\n    // Manejador del botón\n    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');\n    cambiarEstadoBotones.forEach(boton => {\n        boton.addEventListener('click', cambiarEstadoPropiedad);\n    });\n\n    async function cambiarEstadoPropiedad(e) {\n        const id = e.target.dataset.productoId;\n        console.log(id);\n        const productoItem = e.target.closest('.opciones');\n        const entradaBtn = productoItem.querySelector('.entrada');\n        const salidaBtn = productoItem.querySelector('.salida');\n\n        // Cambiar estado visual\n        if (e.target.classList.contains('bg-yellow-100')) {\n            e.target.classList.replace('bg-yellow-100', 'bg-green-100');\n            e.target.classList.replace('text-yellow-800', 'text-green-800');\n            e.target.textContent = 'Alta';\n            entradaBtn?.classList.remove('hidden');\n            salidaBtn?.classList.remove('hidden');\n            localStorage.setItem(`producto-${id}-estado`, 'true');\n        } else {\n            e.target.classList.replace('bg-green-100', 'bg-yellow-100');\n            e.target.classList.replace('text-green-800', 'text-yellow-800');\n            e.target.textContent = 'Baja';\n            entradaBtn?.classList.add('hidden');\n            salidaBtn?.classList.add('hidden');\n            localStorage.setItem(`producto-${id}-estado`, 'false');\n        }\n\n        //Actualizar en base de datos\n        try {\n          const respues =  await fetch(`/administrador/estado/${id}`, { method: 'PUT' });\n          if(respues.ok){\n           Swal.fire({\n                    icon: 'success', \n                    title: 'Estado actualizado',\n                    text: `El producto Se actualizo`,\n                    confirmButtonColor: '#16a34a' \n                }).then(() => {\n                        location.reload(); // 👈 se ejecuta DESPUÉS de cerrar la alerta\n                });\n                \n          }\n         } catch (error) {\n             console.error(\"Error al actualizar estado\", error);\n              Swal.fire({\n                icon: 'error',\n                title: 'Error',\n                text: 'No se pudo actualizar el estado del producto',\n                confirmButtonColor: '#e11d48'\n            });\n         }\n    }\n})();\n\n//# sourceURL=webpack://castores/./src/js/cambiarEstado.js?");

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
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;