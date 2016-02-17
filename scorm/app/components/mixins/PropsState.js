import { Model } from 'backbone';
import { extendKeys } from 'app/util/object';

export default {
  initialize(props) {
    if (!this.props) this.props = extendKeys(this.defaultProps || {}, props);
    if (!this.state) this.state = new Model(extendKeys(this.defaultState || {}, props));
    this.propsStateReady(this.props, this.state);
  },

  propsStateReady(props, state) {
    // if (DEVELOPMENT) console.log('PROPS STATE', props, state.toJSON());
  },

};
