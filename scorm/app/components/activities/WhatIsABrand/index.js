import { map, each } from 'lodash';
import Activity from '../Activity';
import { scrollToElement } from 'app/util/anim';
import DragDrop from 'app/components/helpers/DragDrop';
import template from './template.html';
import fusoLogo from './fusoLogo.png';
import maseratiLogo from './maseratiLogo.png';
import selleysLogo from './selleysLogo.png';
import upAndGoLogo from './upAndGoLogo.png';
import './style.styl';

const WhatIsABrand = Activity.extend({
  className: 'Activity WhatIsABrand',

  defaultProps: {
    isMobile: () => false,
  },

  defaultState: {
    dragCompleteCount: 0,
  },

  renderActivityContent() {
    return template({
      each,
      drags: [
        {key: 'fuso', figure: fusoLogo},
        {key: 'selleys', figure: selleysLogo},
        {key: 'maserati', figure: maseratiLogo},
        {key: 'upAndGo', figure: upAndGoLogo},
      ],
      drops: [
        {key: 'upAndGo', label: 'Healthy breakfast'},
        {key: 'fuso', label: 'Durable vehicles'},
        {key: 'maserati', label: 'Luxury'},
        {key: 'selleys', label: 'Reliability'},
      ],
    });
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:dragCompleteCount', this.handleDragCompleteCountChange);
  },

  activityDidRender() {
    this.dragables = this.$('.WhatIsABrand__dragable');
    this.modal = this.$('.WhatIsABrand__feedbackModal');
    this.checkButton = this.$('.WhatIsABrand__checkAnswerButton');
    this.dragDrops = map(this.dragables, dragable => {
      return new DragDrop(
        dragable,
        this.el.querySelector(`.WhatIsABrand__dropTarget[data-dragkey=${dragable.getAttribute('data-dragkey')}]`),
        (dragEl, dropTarget) => {
          dropTarget
            .find('.dropTarget__dragableContainer')
            .html(dragEl);

          this.state.set('dragCompleteCount', this.state.get('dragCompleteCount') + 1);
        }
      );
    });
  },

  //

  handleDragCompleteCountChange() {
    if (this.state.get('dragCompleteCount') === this.dragables.length) {
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

    if (this.props.isMobile()) {
      scrollToElement(this.modal.find('.Modal__content'), {
        offset: -100,
        onlyOutsideViewport: true,
      });
    }

    this.complete();
  },

});

export default WhatIsABrand;
