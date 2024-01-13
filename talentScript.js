import data from "./data.js";
document.addEventListener("DOMContentLoaded", function (event) {
  const webTable = document.getElementById(`1`);

  function eventListener(element) {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      const result = deepSearch(data, "id", (k, v) => v == `${element.id}`);
      console.log(result)
      const table = document.querySelector(`.${result.name}`)
      if (result.isOpen == true) {
        close(result, table);
      } else {
        open(result, table);
      }
    });
  }

  eventListener(webTable);

  function open(obj, table) {
    obj.isOpen = true;
    let lineParentRow = table.insertRow(table.rows.length);
    let linesChildrenRow = table.insertRow(table.rows.length);
    linesChildrenRow.classList.add("ff");
    let row = table.insertRow(table.rows.length);
    obj.subData.forEach((x, i) => {
      const newChild = `
        <table class="${x.name} ${obj.name}">
          <tr>
            <td class="parent-line">
            </td>
            <td class="parent-line">
            </td>
          </tr>
          <tr>
            <td>
              <div id=${x.id} name=${x.name} class="imgBx">
                <p class="titel texts">${x.name}</p>
                <p class="description texts">${x.description}</p>
              </div>
            </td>
          </tr>
        </table>
        `;

      if (i < 2) {
        lineParentRow.insertCell(i).classList.add("parent-line");
      }
      row.insertCell(i).insertAdjacentHTML("beforeend", newChild)
      document.querySelector(`.${x.name}`).classList.add('fix')
      eventListener(document.getElementById(`${x.id}`));
    });
   

    // linesChildrenRow.insertCell(obj.subData.length);
    const newChilden = document.querySelectorAll(`.${obj.name}`);
    setTimeout(() => {
      newChilden.forEach((y) => {
        y.classList.remove("fix");
      });
    }, 50);
  }

  function close(obj, table) {
    obj.isOpen = false;
    while (table.rows.length > 1) {
      table.deleteRow(2);
    }
  }

  function deepSearch(object, key, predicate) {
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
      return object;

    for (let i = 0; i < Object.keys(object).length; i++) {
      let value = object[Object.keys(object)[i]];
      if (typeof value === "object" && value != null) {
        let o = deepSearch(object[Object.keys(object)[i]], key, predicate);
        if (o != null) return o;
      }
    }
    return null;
  }
});
// window.onload = maxWindow;

// function maxWindow() {
//     window.moveTo(0, 0);

//     if (document.all) {
//         top.window.resizeTo(screen.availWidth, screen.availHeight);
//     }

//     else if (document.layers || document.getElementById) {
//         if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
//             top.window.outerHeight = screen.availHeight;
//             top.window.outerWidth = screen.availWidth;
//         }
//     }
// }
