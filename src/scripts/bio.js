'use strict';

import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import 'flatpickr/dist/flatpickr.min.css';

function applyPhoneMask(input) {
  input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) {
      v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
    } else if (v.length > 2) {
      v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    } else if (v.length > 0) {
      v = '(' + v;
    }
    e.target.value = v;
  });
}

document.querySelectorAll('input[name="telefone"]').forEach(applyPhoneMask);

document.querySelectorAll('input[name="data"]').forEach((el) => {
  flatpickr(el, {
    dateFormat: 'd/m/Y',
    locale: Portuguese,
    minDate: 'today',
    allowInput: true,
  });
});
