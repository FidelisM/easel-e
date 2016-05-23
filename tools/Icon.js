const ICON_WIDTH = '30px';
const ICON_HEIGHT = '30px';

function Icon(faClassName) {
  let icon = document.createElement('div');
  let faIcon = document.createElement('i');

  icon.appendChild(faIcon);

  icon.classList.add('tool-icon');
  icon.style.width = ICON_WIDTH;
  icon.style.height = ICON_HEIGHT;
  icon.style.backgroundColor = '#CCCCCC';
  icon.style.float = 'left';
  icon.style.position = 'relative';
  icon.style.marginBottom = '1px';
  icon.style.borderBottom = '1px solid #AAAAAA';

  faIcon.classList.add('fa');
  faIcon.classList.add(faClassName);

  /**
   * Center the child.
   * For now these are static values but we will
   * need to dynamically center these.
   * The issue is that with using FontAwesome, there is no way
   * to get the elements width and height that I know of. Once
   * we figure out a way were we know the value of the height and
   * width, we will be able to position these better
  **/
  faIcon.style.position = 'absolute';
  faIcon.style.left = '6px';
  faIcon.style.top = '6px';

  return icon;
}

module.exports = Icon;