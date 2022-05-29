export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = { finalPosition: 0, startX: 0, movement: 0, }
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.25;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event) {
    const movetype = (event.type === 'mousedown') ? 'mousemove' : 'touchmove';
    console.log(movetype);
    const pointerPosition = (event.type === 'mousedown') ? event.clientX : event.changedTouches[0].clientX;
    console.log(pointerPosition);
    if (event.type === 'mousedown') {
      event.preventDefault();
    }
    this.distance.startX = pointerPosition;
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvens() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index === 0 ? undefined : index - 1,
      active: index,
      next: index === last ? undefined : index + 1,
    }
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element, };
    });
  }

  changeSlide(index) {
    console.log(index);
    const activeSlide = this.slideArray[index];
    console.log(this.slideArray);
    this.moveSlide(activeSlide.position);
    this.slidesNav(index);
    this.distance.finalPosition = activeSlide.position;
  }

  init() {
    this.bindEvens();
    this.addEvents();
    this.slidesConfig();
    return this;
  }
}