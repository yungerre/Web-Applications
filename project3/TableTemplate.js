'use strict';
class TableTemplate {
    static fillIn(id, dict, columnName) {
        var table = document.getElementById(id);
        table.style.visibility = "visible";
    if (!columnName) {
        var fill = new TemplateProcessor(table.innerHTML);
        table.innerHTML = fill.fillIn(dict);
    } else if (columnName == 'Length') {
        var row = table.firstElementChild.firstElementChild;
        var header = row.firstElementChild;
        var fillHeader = new TemplateProcessor(header.textContent);
        header.textContent = fillHeader.fillIn(dict);
        while (row) {
            var elem = row.lastElementChild;
            var fill = new TemplateProcessor(elem.textContent);
            elem.textContent = fill.fillIn(dict);
            row = row.nextElementSibling;
        }
    } else if (columnName == 'Part Number') {
        var row = table.firstElementChild.firstElementChild;
        var header = row.lastElementChild;
        var fillHeader = new TemplateProcessor(header.textContent);
        header.textContent = fillHeader.fillIn(dict);
        while (row) {
            var elem = row.firstElementChild;
            var fill = new TemplateProcessor(elem.textContent);
            elem.textContent = fill.fillIn(dict);
            row = row.nextElementSibling;
        }
    }
  }
}

