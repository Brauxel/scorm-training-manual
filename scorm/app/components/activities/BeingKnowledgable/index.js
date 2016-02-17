import Activity from '../Activity';
import { each, reduce, find, includes } from 'lodash';
import { mergeIntoArray } from 'app/util/array';
import { toggleClass } from 'app/util/css';
import { scrollToElement } from 'app/util/anim';
import { technologies, descriptions } from './content';
import template from './template.html';
import technologyTemplate from './technologyTemplate.html';
import descriptionTemplate from './descriptionTemplate.html';
import './style.styl';

export default Activity.extend({
  className: 'BeingKnowledgable',

  defaultProps: {
    isMobile: () => false,
  },

  defaultState: {
    currentDescription: null,
    viewedDescriptions: [],
  },

  events: {
    'click .BeingKnowledgable__technology': 'handleTechnologyClick',
    'click .BeingKnowledgable__description': 'handleDescriptionClick',
  },

  renderActivityContent() {
    return template({
      each,
      technologies,
      descriptions,
      technologyTemplate,
      descriptionTemplate,
    });
  },

  activityDidRender() {
    this.technologyEls = reduce(technologies, (els, { key }) => {
      els[key] = this.el.querySelector(
        `.BeingKnowledgable__technology[data-key="${key}"]`);
      return els;
    }, {});

    this.descriptionEls = reduce(descriptions, (els, { key }) => {
      els[key] = this.el.querySelector(
        `.BeingKnowledgable__description[data-key="${key}"]`);
      return els;
    }, {});

    this.onCurrentDescriptionChange();
  },

  activityPropsStateReady(props, state) {
    this.listenTo(state, 'change:currentDescription',
      this.onCurrentDescriptionChange);
    this.listenTo(state, 'change:viewedDescriptions',
      this.onViewedDescriptionsChange);
  },

  handleTechnologyClick(event) {
    const techKey = event.currentTarget.getAttribute('data-key');
    const key = (find(technologies, {key: techKey}) || {}).description;

    this.state.set({
      currentDescription: this.state.get('currentDescription') === key
        ? null
        : key,
      viewedDescriptions: mergeIntoArray(
        this.state.get('viewedDescriptions'), key),
    });
  },

  handleDescriptionClick() {
    this.state.set({currentDescription: null});
  },

  onCurrentDescriptionChange() {
    const current = this.state.get('currentDescription');
    const techKeys = reduce(technologies, (keys, { key, description }) => {
      if (description === current) keys.push(key);
      return keys;
    }, []);

    each(this.descriptionEls, (el, key) => {
      toggleClass(el, 'visible', key === current);
    });

    each(this.technologyEls, (el, key) => {
      toggleClass(el, 'current', includes(techKeys, key));
    });

    if (this.props.isMobile() && this.descriptionEls[current]) {
      scrollToElement(this.descriptionEls[current], {
        offset: -200,
      });
    }
  },

  onViewedDescriptionsChange() {
    if (this.state.get('viewedDescriptions').length === descriptions.length) {
      this.complete();
    }
  },

});
