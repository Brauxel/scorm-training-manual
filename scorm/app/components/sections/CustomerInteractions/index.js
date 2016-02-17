import Section from '../Section';
import template from './template.html';
import './style.styl';

const CustomerInteractions = Section.extend({

  render() {
    this.el.innerHTML = template();

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <p>Good work! Positive customer experiences mean positive brand experiences.</p>
          <p>We want customers to feel pleased about their interaction with <span class="nbnMention">nbn</span> and the experience it brings to their family.</p>
          <p>Click ‘Continue’ to learn more simple things you can do to provide a positive customer experience.</p>
        `,
      })
      .initShowable();

    return this;
  },

});

export default CustomerInteractions;
