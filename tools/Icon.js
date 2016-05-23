const ICON_WIDTH = '50px';
const ICON_HEIGHT = '50px';

function Icon(className) {
  let icon = document.createElement('div');

  icon.style.width = ICON_WIDTH;
  icon.style.height = ICON_HEIGHT;
  icon.style.backgroundColor = '#CCCCCC';
  icon.style.float = 'left';

  try {
    icon.classList.add(className);
  } catch (e) {
    console.warn(e.message);
  }

  return icon;
}

module.exports = Icon;