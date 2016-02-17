import { View } from 'backbone';
import { mixin } from 'backbone.cocktail';
import PropsStateMixin from 'app/components/mixins/PropsState';
import { toggleClass } from 'app/util/css';
import template from './template.html';
import './styles.styl';

const VideoPlayer = View.extend({
  className: 'VideoPlayer',

  defaultProps: {
    embedType: 'youtube',
    videoID: null,
    onClose: () => {},
  },

  defaultState: {
    isVisible: false,
  },

  events: {
    'click .VideoPlayer__closeButton': 'onCloseClick',
  },

  propsStateReady(props, state) {
    this.listenTo(state, 'change:isVisible', this.onVisibleChange);
  },

  render() {
    this.el.innerHTML = template({...this.props, ...this.state.toJSON()});
    this.onVisibleChange();
    return this;
  },

  onVisibleChange() {
    toggleClass(this.el, 'VideoPlayer_hidden', !this.state.get('isVisible'));
    return this;
  },

  onCloseClick() {
    this.state.set('isVisible', false);
    setTimeout(() => this.props.onClose(), 500);
  },
});

export default mixin(VideoPlayer, PropsStateMixin);
