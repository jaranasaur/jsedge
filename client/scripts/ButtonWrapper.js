export default class ButtonWrapper {
  constructor({ buttonTitle = 'button', onClick = () => {}, top = 0, left = 0 } = {}) {
    this.buttonTitle = buttonTitle;
    this.htmlButton = null;
    this.onClick = onClick;
    this.top = top;
    this.left = left;
  }

  init() {
    this.htmlButton = document.createElement('button');
    this.htmlButton.innerHTML = this.buttonTitle;
    this.htmlButton.style.position = 'absolute';
    this.htmlButton.onclick = this.onClick;

    this.htmlButton.style.top = this.top;
    this.htmlButton.style.left = this.left;
    this.htmlButton.style.zIndex = 2;
    document.body.appendChild(this.htmlButton);
  }

  setHidden(hidden = true) {
    this.htmlButton.hidden = hidden;
  }

  setOnClick(newOnClick = () => {}) {
    this.onClick = newOnClick;
    this.htmlButton.onclick = newOnClick;
  }
}