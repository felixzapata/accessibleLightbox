(function() {
	
    "use strict";

    var lightbox_a11y = function() {
        var dialogopen = false,
            dialogbox, pagebg,
            oldfocus, focuselem,
            CLASS_OPEN = 'lightbox_a11y',
            CLASS_CLOSE = 'close_lightbox_a11y',
            ACTION_OPEN = 'show',
            ACTION_CLOSE = 'hide';

        function showDialog(event) {
            // When you use addEventListener, 'this' will be bound automatically.
            oldfocus = (event.target) ? this : document.activeElement;
            toggleDialog(ACTION_OPEN);
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }

        function hideDialog(event) {
            toggleDialog(ACTION_CLOSE);
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }

        function toggleDialog(sh) {
            dialogbox = document.getElementById('aviso');
            pagebg = document.getElementById('container');
            focuselem = document.getElementById('h1-dialog');

            if (sh === ACTION_OPEN) {
                dialogopen = true;
                dialogbox.style.display = 'block';

                var oldTabIdx = focuselem.getAttribute('tabindex');
                focuselem.setAttribute('tabindex', '0');
                focuselem.focus();
                focuselem.setAttribute('tabindex', oldTabIdx);

                pagebg.style.opacity = '0.4';
                pagebg.setAttribute('aria-hidden', 'true');
                setTabindex(pagebg, -1);

            } else {

                dialogopen = false;
                dialogbox.style.display = 'none';
                pagebg.style.opacity = '1.0';
                pagebg.setAttribute('aria-hidden', 'false');
                setTabindex(pagebg, 0);
                oldfocus.focus();
            }
        }


        function setTabindex(divObj, tabIdx) {
            var focusables = divObj.querySelectorAll('a'),
                lenFocusables = focusables.length,
                i;
            // falta añadir resto de "focusables"

            for (i = lenFocusables - 1; i > -1; i--) {
                focusables[i].setAttribute('tabindex', tabIdx);
            }
        } // setTabindex

        if (document.addEventListener) {

            document.addEventListener('keyup', function(event) {
                if (dialogopen && event.keyCode === 27) {
                    toggleDialog(ACTION_CLOSE);
                }
            }, true); // document.keyup
        } else {

            document.attachEvent('onkeyup', function(event) {
                if (dialogopen && event.keyCode === 27) {
                    toggleDialog(ACTION_CLOSE);
                }
            }, true); // document.keyup

        }

        function setOpenEvents() {
            var openElements = document.querySelectorAll('.' + CLASS_OPEN),
                len = openElements.length,
                i;
            for (i = len - 1; i > -1; i--) {
                if (document.addEventListener) {
                    openElements[i].addEventListener('click', showDialog, false);
                } else {
                    openElements[i].attachEvent('onclick', showDialog, false);
                }

            }
        }

        function setCloseEvents() {
            var closeElements = document.querySelectorAll('.' + CLASS_CLOSE),
                len = closeElements.length,
                i;
            for (i = len - 1; i > -1; i--) {
                if (document.addEventListener) {
                    closeElements[i].addEventListener('click', hideDialog, false);
                } else {
                    closeElements[i].attachEvent('onclick', hideDialog, false);
                }

            }
        }

        function init() {
            setOpenEvents();
            setCloseEvents();
        }

        init();

        return {
            init: init
        };




    }();

})();
