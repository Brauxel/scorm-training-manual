import Section from '../Section';
import template from './template.html';
import './style.styl';

const CodeOfConduct = Section.extend({

  render() {
    this.el.innerHTML = template();

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <p>That’s it about code of conduct and social media policy.</p>
          <p>Remember, no matter your role, what you say and do reflects on the <span class="nbnMention">nbn</span>™ brand.</p>
          <p>Click ‘Continue’ to check that you’ve covered everything and are ready to wrap up.</p>
        `,
      })
      .initShowable();

    return this;
  },

});

export default CodeOfConduct;
