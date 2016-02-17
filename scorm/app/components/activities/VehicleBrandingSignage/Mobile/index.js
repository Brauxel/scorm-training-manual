import { each, find } from 'lodash';
import { mergeIntoArray } from 'app/util/array';
import { addClass, toggleClass } from 'app/util/css';
import { scrollToElement } from 'app/util/anim';
import Activity from 'app/components/activities/Activity';
import template from './template.html';
import aframe from '../aframe.png';
import barrier from '../barrier.png';
import stickigrip from '../stickigrip.png';
import './style.styl';

const VehicleBrandingSignageMobile = Activity.extend({
  className: 'VehicleBrandingSignageMobile',

  defaultState: {
    currentClick: null,
    completedClicks: [],
  },

  defaultProps: {
    isMobile: () => false,
    clickables: [
      {
        key: 'aframe',
        figure: aframe,
        title: 'A-frame signage',
        description: `
          <p>One of the two types of the construction signage is the A-frame signage. Use this signage depending on the site layout.</p>
        `,
      },
      {
        key: 'stickigrip',
        figure: stickigrip,
        title: 'Vehicle signage',
        description: `
          <p>The vehicle signage is a magnetic stickigrip which can be removed and re-applied to different vehicles. When you are not using your vehicle for work purposes or <span class="nbnMention">nbn</span> related activities, take the stickigrip signage off. The same applies for <span class="nbnMention">nbn</span>™ branded uniform items.</p>
        `,
      },
      {
        key: 'barrier',
        figure: barrier,
        title: 'Pit-barrier signage',
        description: `
          <p>One of the two types of the construction signage is the pit-barrier signage. Use this signage depending on the site layout.</p>
        `,
      },
    ],
  },

  events: {
    'click .VehicleBrandingSignageMobile__clickable': 'onClickableClicked',
    'click .VehicleBrandingSignageMobile__infoPanel__closeContainer': 'onInfoCloseClicked',
  },

  renderActivityContent() {
    return template({
      each,
      ...this.props,
    });
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:currentClick',
      this.handleCurrentClickChange);
    this.listenTo(state, 'change:completedClicks',
      this.handleCompletedClicksChange);
  },

  activityDidRender() {
    this.infoPanel = this.el
      .querySelector('.VehicleBrandingSignageMobile__infoPanel');
  },

  handleCurrentClickChange() {
    const current = this.state.get('currentClick');

    const { title, figure, description } = find(
      this.props.clickables,
      ({ key }) => key === current
    ) || {};

    const titleEl = this.infoPanel
      .querySelector('.VehicleBrandingSignageMobile__infoPanel__title');
    const figureEl = this.infoPanel
      .querySelector('.VehicleBrandingSignageMobile__infoPanel__figure');
    const descriptionEl = this.infoPanel
      .querySelector('.VehicleBrandingSignageMobile__infoPanel__description');

    titleEl.innerHTML = title;
    figureEl.setAttribute('style',
      `background-image: url(${figure})`);
    descriptionEl.innerHTML = description;

    toggleClass(this.infoPanel, 'visible', current);
    if (current && this.props.isMobile()) {
      scrollToElement(this.infoPanel, {offset: -54});
    }
  },

  handleCompletedClicksChange() {
    const completedClicks = this.state.get('completedClicks');

    each(completedClicks, key => {
      const el = this.el.querySelector(
        `.VehicleBrandingSignageMobile__clickable[data-key="${key}"]`
      );
      if (el) {
        addClass(el, 'VehicleBrandingSignageMobile__clickable_hasClick');
      }
    });

    if (completedClicks.length === this.props.clickables.length) {
      this.complete();
    }
  },

  onClickableClicked(event) {
    const key = event.currentTarget.getAttribute('data-key');
    const completedClicks = this.state.get('completedClicks');

    this.state.set({
      currentClick: key,
      completedClicks: mergeIntoArray(completedClicks, key),
    });
  },

  onInfoCloseClicked() {
    this.state.set({
      currentClick: null,
    });
  },

});

export default VehicleBrandingSignageMobile;
