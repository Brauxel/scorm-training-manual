import { toArray, map, each } from 'lodash';
import { velocityAnim } from 'app/util/anim';
import { addClass } from 'app/util/css';
import { prependTo } from 'app/util/dom';
import Activity from 'app/components/activities/Activity';
import NbnPulseLogo from 'app/components/NbnPulseLogo';
import template from './template.html';
import './style.styl';

export default Activity.extend({
  className: 'NbnBrandYourRole',

  defaultProps: {
    isMobile: () => false,
  },

  renderActivityContent() {
    return template({
      each,
      panels: [
        [
          `
            <p><span class="nbnMention">nbn</span> is delivering one of the largest single infrastructure programs in our nation’s history.</p>
            <p>You are the face of that project – <em>you are the face of the <span class="nbnMention">nbn</span>™ brand.</em></p>
          `,
          `
            <p><em>The <span class="nbnMention">nbn</span>™ brand promise</em> is to deliver the opportunity for access to fast, reliable broadband to every Australian.</p>
          `,
        ],
        [
          `
            <p>Working as part of our team, you represent our brand, and the promise of a <em>future that is full of optimism</em>.</p>
          `,
          `
            <p><em>We want the community to be excited</em> when they see your trucks in the street or when you install equipment on their property.</p>
          `,
        ],
      ],
    });
  },

  activityDidRender() {
    this.backgroundEl = document.createElement('div');
    addClass(this.backgroundEl, 'NbnBrandYourRole__background');
    prependTo(this.el, this.backgroundEl);

    this.pulseLogo = new NbnPulseLogo({
      onClick: () => {
        this.pulseLogo.remove();
        this.reveal().then(() => this.complete());
      },
      caption: this.props.isMobile() ? 'Tap here' : 'Click here',
    });

    prependTo(this.el, this.pulseLogo.el);

    this.pulseLogo.render();
    return this;
  },

  reveal() {
    const content = this.el.querySelector('.NbnBrandYourRole__contentContainer');
    const panels = toArray(this.el
      .querySelectorAll('.NbnBrandYourRole__contentPanel'));

    const duration = 800;
    const delay = 600;

    const animPromises = [
      velocityAnim(this.backgroundEl, {opacity: 1}, {duration}),
      velocityAnim(content, {opacity: 1}, {duration}),
    ].concat(map(panels, (panel, index) => {
      return velocityAnim(panel, {opacity: 1}, {
        duration,
        delay: ((index + 1) * delay),
      });
    }));

    return Promise.all(animPromises);
  },

});
