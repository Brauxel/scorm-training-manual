import Section from '../Section';
import template from './template.html';
import './style.styl';

const PositiveBrand = Section.extend({

  render() {
    this.el.innerHTML = template();

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <p>Well done! That’s how you represent <span class="nbnMention">nbn</span> as a positive brand.</p>
          <p>If you don’t have an appropriate uniform, contact your employer to arrange one.</p>
          <p>Let’s continue and learn more simple things you can do to provide positive customer experience.</p>
        `,
      })
      .initShowable();

    return this;
  },

});

export default PositiveBrand;
