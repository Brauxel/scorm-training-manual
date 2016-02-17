import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import { each } from 'lodash';
import { toggleClass } from 'app/util/css';
import PropsStateMixin from 'app/components/mixins/PropsState';
import template from './template.html';
import './style.styl';

const ANIM_TYPES = {
  PULSE: 'pulse',
  NONE: 'none',
};

const NbnPulseLogo = View.extend({
  className: 'NbnPulseLogo',

  defaultState: {
    anim: ANIM_TYPES.PULSE,
    caption: '',
    onClick: () => {},
  },

  events: {
    'click .NbnPulseLogo__logo': 'handleLogoClick',
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:anim', this.handleAnimChange);
  },

  render() {
    this.el.innerHTML = template(this.state.toJSON());
    this.handleAnimChange(this.state);
    return this;
  },

  handleAnimChange(state) {
    const animState = state.get('anim');
    each(ANIM_TYPES, type => toggleClass(this.el, `NbnPulseLogo_${type}Anim`, animState === type));
  },

  handleLogoClick() {
    this.state.get('onClick')();
  },

  setAnim(anim) {
    this.state.set({anim});
  },

  setCaption(caption) {
    this.state.set({caption});
  },

});

NbnPulseLogo.ANIM_TYPES = {...ANIM_TYPES};

export default mixin(NbnPulseLogo, PropsStateMixin);
