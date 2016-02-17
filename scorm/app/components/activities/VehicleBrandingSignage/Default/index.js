import { map, each, find, toArray } from 'lodash';
import DragDrop from 'app/components/helpers/DragDrop';
import { mergeIntoArray } from 'app/util/array';
import { addClass } from 'app/util/css';
import Activity from 'app/components/activities/Activity';
import template from './template.html';
import './style.styl';

const VehicleBrandingSignage = Activity.extend({
  className: 'VehicleBrandingSignage',

  defaultState: {
    completedDrags: [],
  },

  defaultProps: {
    drags: [
      {key: 'aframe'},
      {key: 'stickigrip'},
      {key: 'barrier'},
    ],
    drops: [
      {key: 'aframe'},
      {key: 'stickigrip'},
      {key: 'barrier'},
    ],
  },

  renderActivityContent() {
    return template({
      each,
      ...this.props,
    });
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:completedDrags', this.handleCompletedDragsChange);
  },

  activityDidRender() {
    this.modal = this.$('.VehicleBrandingSignage__feedbackModal');
    this.checkButton = this.$('.VehicleBrandingSignage__checkAnswerButton');

    this.dragables = toArray(this.el.querySelectorAll('.VehicleBrandingSignage__dragable'));
    this.dropTargets = toArray(this.el.querySelectorAll('.VehicleBrandingSignage__dropTarget'));

    this.dragDrops = map(this.dragables, dragable => {
      const key = dragable.getAttribute('data-dragkey');
      return new DragDrop(
        dragable,
        this.el.querySelector(`.VehicleBrandingSignage__dropTarget[data-dragkey=${key}]`),
        () => this.handleDrop(key)
      );
    });
  },

  handleDrop(key) {
    const current = this.state.get('completedDrags');
    this.state.set({completedDrags: mergeIntoArray(current, key)});
  },

  handleCompletedDragsChange() {
    const completedDrags = this.state.get('completedDrags');

    each(completedDrags, key => {
      const dragable = find(this.dragables, dr => dr.getAttribute('data-dragkey') === key);
      const target = find(this.dropTargets, dt => dt.getAttribute('data-dragkey') === key);
      if (dragable && target) {
        addClass(target, 'VehicleBrandingSignage__dropTarget_hasDrop');
        target
          .querySelector('.dropTarget__dragableContainer')
          .appendChild(dragable);
      }
    });

    if (completedDrags.length === this.props.drags.length) {
      this.onDragDropComplete();
    }
  },

  onDragDropComplete() {
    this.checkButton
      .removeClass('disabled')
      .on('click', () => this.onCheckAnswerClicked());
  },

  onCheckAnswerClicked() {
    this.modal
      .addClass('Modal_show')
      .on('click', () => this.modal.removeClass('Modal_show').off('click'));

    this.complete();
  },

});

export default VehicleBrandingSignage;
