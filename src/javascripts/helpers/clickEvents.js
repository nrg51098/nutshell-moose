import menu from '../components/menu/menu';
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
import addStaff from '../components/addStaff/addStaff';
import ingredients from '../components/ingredients/ingredients';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '#ingredient-link', ingredients.ingredients);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
  $('body').on('click', '.stopProp', ((e) => {
    e.stopPropagation();
  }));
  $('body').on('click', '#addNewStaff', addStaff.addStaffEvent);
};

export default { clickEvents };
