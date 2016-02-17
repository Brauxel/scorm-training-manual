import Activity from '../Activity';
import PanelGrid from 'app/components/PanelGrid';
import think from './think.jpg';
import you from './you.jpg';
import satisfaction from './satisfaction.jpg';
import template from './template.html';
import './style.styl';

export default Activity.extend({
  className: 'CustomerInteractionsActv',

  defaultContentProps: {
    hasAurora: true,
  },

  defaultProps: {
    panels: [
      {
        key: 'think',
        title: 'Think like a customer',
        caption: `
          <p>Think about a time when you called a tradie, went to a store or a football game. How did their customer service affect your experience? How could it have been better? What did they do well?</p>
          <p>The same applies to the customer service you provide when working on the <span class="nbnMention">nbn</span>™ network.</p>
        `,
        figure: think,
      },
      {
        key: 'you',
        title: 'You as an <span class="nbnMention">nbn</span> representative',
        caption: `
          <p>When you arrive at a customer’s premises, be aware of their environment. Recognise what is going on and show empathy for their situation.</p>
          <p>For example:</p>
          <ul>
            <li>Connecting a household with young children and/or pets</li>
            <li>The homeowner may be anxious about you damaging their property</li>
            <li>The homeowner might be preoccupied or having a bad day when you visit</li>
          </ul>
        `,
        figure: you,
      },
      {
        key: 'satisfaction',
        title: 'Customer satisfaction',
        caption: `
          <p>Customers have the opportunity to give feedback on the service you provide through our customer Contact Centre and via <span class="nbnMention">nbn</span>’s website.</p>
          <p>Key drivers in customer satisfaction scores include:</p>
          <ul>
            <li>courtesy and attitude</li>
            <li>showing respect for the customer’s house and garden area</li>
            <li>leaving the customer’s home in a clean and tidy state</li>
          </ul>
        `,
        figure: satisfaction,
      },
    ],
    isMobile: () => {},
  },

  renderActivityContent() {
    return template({...this.props});
  },

  activityDidRender() {
    this.panelGrid = new PanelGrid({
      layoutType: PanelGrid.layoutTypes.THREE_INLINE,
      panels: this.props.panels,
      isMobile: this.props.isMobile,
      onAllPanelsViewed: () => this.complete(),
    });

    this.el.querySelector('.CustomerInteractionsActv__panelGridContainer')
      .appendChild(this.panelGrid.el);

    this.panelGrid.render();
  },

});
