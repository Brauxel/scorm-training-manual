import $ from 'jquery';
import { bind, extend, isArray, map } from 'lodash';
import { getTouchEvent, firstTouchFromEvent } from 'app/util/touch';
import { getCSSTransform } from 'app/util/css';
import { elsDoCollide, triggerRedraw } from 'app/util/dom';

export default function DragDrop(dragable, target, onCollide) {
  this.onCollide = onCollide;
  this.$window = $(window);
  const $targets = isArray(target) ? map(target, t => $(t)) : [$(target)];
  this.initDragEvents($(dragable), $targets);
}

extend(DragDrop.prototype, {

  initDragEvents($dragable, $targets) {
    $dragable.on(getTouchEvent('start'), bind(this.onDragStart, this, $dragable, $targets));
  },

  onDragStart($dragable, $targets, event) {
    const dragProps = {
      init: firstTouchFromEvent(event),
      offset: {x: 0, y: 0},
    };

    $dragable.addClass('isDragging');
    $dragable.off(getTouchEvent('start'));

    this.$window.on(getTouchEvent('move'), bind(this.onDrag, this, $dragable, $targets, dragProps));
    this.$window.on(getTouchEvent('end'), bind(this.onDragEnd, this, $dragable, $targets, dragProps));

    triggerRedraw($dragable.parent());

    this.positionDragable($dragable, dragProps, event);
  },

  onDrag($dragable, $targets, dragProps, event) {
    event.preventDefault();
    // this.modScroll(dragProps, event);
    this.positionDragable($dragable, dragProps, event);
  },

  onDragEnd($dragable, $targets) {
    this.$window.off(getTouchEvent('move'));
    this.$window.off(getTouchEvent('end'));

    const $currentCollision = this.checkCollision($dragable, $targets);
    $dragable.removeClass('isDragging');
    $dragable.css(getCSSTransform(''));
    if ($currentCollision) this.onCollide($dragable, $currentCollision);
    else this.initDragEvents($dragable, $targets);
  },

  modScroll(dragProps, event) {
    const { y } = firstTouchFromEvent(event);
    const winHeight = this.$window.innerHeight();
    const scrollTop = this.$window.scrollTop();
    const fromViewport = y - scrollTop;
    let adjust = 0;

    if (fromViewport < 60) adjust = fromViewport - 60;
    else if (fromViewport > winHeight) adjust = fromViewport - winHeight;
    if (adjust !== 0) this.$window.scrollTop(this.$window.scrollTop() + adjust);
  },

  positionDragable($dragable, dragProps, event) {
    const currentCoords = firstTouchFromEvent(event);
    const deltaX = currentCoords.x - dragProps.init.x;
    const deltaY = currentCoords.y - dragProps.init.y;
    $dragable.css(getCSSTransform(`translate3d(${deltaX}px, ${deltaY}px, 0px)`));
  },

  checkCollision($dragable, $targets) {
    for (let i = 0; i < $targets.length; i++) {
      if (elsDoCollide($dragable, $targets[i])) return $targets[i];
    }

    return null;
  },

});
