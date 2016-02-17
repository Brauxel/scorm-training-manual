import Activity from '../Activity';
import PanelGrid from 'app/components/PanelGrid';
import template from './template.html';
import projectStatic from './projectStatic.gif';
import projectAnim from './projectAnim.gif';
import rolloutStatic from './rolloutStatic.gif';
import rolloutAnim from './rolloutAnim.gif';
import goalStatic from './goalStatic.gif';
import goalAnim from './goalAnim.gif';
import scaleStatic from './scaleStatic.gif';
import scaleAnim from './scaleAnim.gif';
import './style.styl';

const WhatWeDo = Activity.extend({
  className: 'WhatWeDo',

  defaultProps: {
    panels: [
      {
        key: 'project',
        title: 'The project',
        figure: projectAnim,
        figureThumbnail: projectStatic,
        caption: `
          <p>The <span class="nbnMention">nbn</span>™ network is a multi-billion dollar project that will upgrade the existing landline phone and internet network, designed to give all Australians access to fast, reliable internet.</p>
          <p>We will do this by taking existing infrastructure into consideration and utilising a multi-technology mix (MTM).</p>
        `,
      },
      {
        key: 'rollout',
        title: 'The rollout',
        figure: rolloutAnim,
        figureThumbnail: rolloutStatic,
        caption: `<p>When the rollout is complete, people will be able to connect to the <span class="nbnMention">nbn</span>™ network virtually anywhere in Australia, whether they’re in the city or a remote part of the country.</p>`,
      },
      {
        key: 'goal',
        title: 'The goal',
        figure: goalAnim,
        figureThumbnail: goalStatic,
        caption: `
          <p>The simple goal of <span class="nbnMention">nbn</span> is to pave the way for a better Australia. We will deliver access to fast and reliable broadband to enable all Australians to enjoy the benefits of a future that we haven’t even imagined yet.</p>
        `,
      },
      {
        key: 'scale',
        title: 'The scale',
        figure: scaleAnim,
        figureThumbnail: scaleStatic,
        caption: `
          <p>By 2020, <span class="nbnMention">nbn</span> plans to have connected <span class="statEmphasis">8 million</span> homes, schools and businesses across Australia.</p>
          <p>At its peak, <span class="nbnMention">nbn</span> will require <span class="statEmphasis">thousands of workers</span> to construct the <span class="nbnMention">nbn</span>™ network.</p>
        `,
      },
    ],
    isMobile: () => false,
  },

  renderActivityContent() {
    return template({...this.props});
  },

  activityDidRender() {
    this.panelGrid = new PanelGrid({
      panels: this.props.panels,
      onAllPanelsViewed: () => this.complete(),
      isMobile: this.props.isMobile,
    });

    this.el
      .querySelector('.WhatWeDo__panelGridContainer')
      .appendChild(this.panelGrid.el);

    this.panelGrid.render();
  },

  activityWillRemove() {
    if (this.panelGrid) this.panelGrid.remove();
  },

});

export default WhatWeDo;
