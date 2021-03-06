// import utils from '../../helpers/utils';

import menuIngrediantData from '../../helpers/data/menuIngrediantData';
import ingredData from '../../helpers/data/ingredData';
import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';

// let menuStatus = true;

const buildMenu = () => {
  menuData.getMenuItems()
    .then((responseMenu) => {
      let domString = `
      <select  class="mt-3 float-right" id="menuOrder">
      <option value="mainMenu" id="mainMen" selected disabled> select menu: </option>
      `;
      const menuArr = responseMenu;
      menuArr.forEach((item) => {
        domString += `<div><option value="${item.price}" id="${item.name}" class="${item.id}" data-value=${item.id}>${item.name} - Price $${item.price}.00</option>`;
      });
      domString += '</select>';
      utils.printToDom('#menuOrder', domString);
    })
  // console.warn('this is the array of order length ', orderArr.length);
    .catch((err) => console.warn('can not get the data for order ', err));
};

const menuFilter = () => {
  menuData.getMenuItems()
    .then((responseMenu) => {
      const menuArr = responseMenu;
      menuArr.forEach((item) => {
        menuIngrediantData.getMenuIngByMenuId(item.id)
          .then((res) => {
            const menuIngObjs = res;
            menuIngObjs.forEach((element) => {
              ingredData.getIngredientById(element.ingredientId)
                .then((ingObj) => {
                  const ingObjectData = ingObj.data;
                  // console.warn('access to that ingerdient ', ingObjectData.quantity);
                  if (ingObjectData.quantity === 0) {
                    // menuStatus = false;
                    // eslint-disable-next-line no-use-before-define
                    makeMenuDisable(item.id);
                  }
                  // console.warn('I should update menu status: ', menuStatus);
                });
            });
          });
      });
    })
    .catch((err) => console.warn('cannot update menu ', err));
};

const makeMenuDisable = (itemId) => {
  $(`.${itemId}`).attr('disabled', 'disabled');
  $('#menuOrder').val('mainMenu');
};

const decIng = (menuId) => {
  menuIngrediantData.getMenuIngByMenuId(menuId)
    .then((res) => {
      // console.warn(res);
      // got the array object that hold each ingrediant
      const menuIngObjs = res;
      menuIngObjs.forEach((element) => {
        // console.warn(element.ingredientId);
        ingredData.getIngredientById(element.ingredientId)
          .then((ingObj) => {
            // console.warn(ingObj.data);
            const ingObjectUpdate = ingObj.data;
            ingObjectUpdate.quantity -= 1;
            if (ingObjectUpdate.quantity < 0) {
              ingObjectUpdate.quantity = 0;
            }
            ingredData.updateIngredients(element.ingredientId, ingObjectUpdate)
              .then(() => {
              });
          });
      });
    })
    .catch((err) => console.warn('could not get the list menuIng ', err));
};

export default { menuFilter, decIng, buildMenu };
