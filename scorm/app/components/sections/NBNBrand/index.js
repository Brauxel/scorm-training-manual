import Section from '../Section';
import template from './template.html';
import './style.styl';

const NBNBrand = Section.extend({

  render() {
    this.el.innerHTML = template();

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <p>Well done! In this section you’ve discovered what a brand is and how this relates to customer experience.</p>
          <p>There is a big difference between positive customer service and negative customer service and how this impacts your feeling towards a brand.</p>
          <p>Next, you will learn the simple things you can do to ensure a positive customer experience.</p>
        `,
      })
      .initShowable();

    return this;
  },

});

export default NBNBrand;
